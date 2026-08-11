import browser = require("selenium-webdriver/bidi/browser");
import browsingContextInspector = require("selenium-webdriver/bidi/browsingContextInspector");
import type { AddInterceptParameters } from "selenium-webdriver/bidi/addInterceptParameters";
import { ArgumentValue } from "selenium-webdriver/bidi/argumentValue";
import { ContinueRequestParameters } from "selenium-webdriver/bidi/continueRequestParameters";
import { ContinueResponseParameters } from "selenium-webdriver/bidi/continueResponseParameters";
import { CookieFilter } from "selenium-webdriver/bidi/cookieFilter";
import input = require("selenium-webdriver/bidi/input");
import { InterceptPhase } from "selenium-webdriver/bidi/interceptPhase";
import { CacheBehavior, Network } from "selenium-webdriver/bidi/network";
import type { BytesValue, Header } from "selenium-webdriver/bidi/networkTypes";
import networkInspector = require("selenium-webdriver/bidi/networkInspector");
import { getPermissionInstance, PermissionState } from "selenium-webdriver/bidi/external/permissions";
import { PartialCookie } from "selenium-webdriver/bidi/partialCookie";
import {
    BrowsingContextPartitionDescriptor,
    StorageKeyPartitionDescriptor,
} from "selenium-webdriver/bidi/partitionDescriptor";
import { PartitionKey } from "selenium-webdriver/bidi/partitionKey";
import { LocalValue } from "selenium-webdriver/bidi/protocolValue";
import { ProvideResponseParameters } from "selenium-webdriver/bidi/provideResponseParameters";
import { ResultOwnership } from "selenium-webdriver/bidi/resultOwnership";
import storage = require("selenium-webdriver/bidi/storage");

declare const driver: import("selenium-webdriver").WebDriver;
declare const bytes: BytesValue;
declare const header: Header;
declare const interceptParameters: AddInterceptParameters;

const argument = new ArgumentValue(LocalValue.createStringValue("value"));
const argumentMap: Record<string, unknown> = argument.asMap();

const browserInstance: Promise<browser.Instance> = browser(driver);
const maximized: "maximized" = browser.WindowState.MAXIMIZED;

const contextInspector: Promise<browsingContextInspector.Instance> = browsingContextInspector(driver, ["context"]);
contextInspector.then(inspector => {
    inspector.onNavigationStarted(event => {
        const url: string = event.url;
    });
});

const continueRequest = new ContinueRequestParameters("request-id")
    .body(bytes)
    .cookies([header])
    .headers([header])
    .method("POST")
    .url("https://example.com");
const requestParameters: Map<string, unknown> = continueRequest.asMap();

const continueResponse = new ContinueResponseParameters("request-id")
    .cookies([header])
    .credentials("user", "password")
    .headers([header])
    .reasonPhrase("OK")
    .statusCode(200);
const responseParameters: Map<string, unknown> = continueResponse.asMap();

const cookieFilter = new CookieFilter().name("session").sameSite("strict").value(bytes);
const partialCookie = new PartialCookie("session", bytes, "example.com").path("/").secure(true);

const inputInstance: Promise<input.Instance> = input(driver);
inputInstance.then(instance => instance.setFiles("context", "shared-element-id", ["/tmp/file.txt"]));

const beforeRequestSent: "beforeRequestSent" = InterceptPhase.BEFORE_REQUEST_SENT;
const ownership: "root" = ResultOwnership.ROOT;

const inspector: Promise<networkInspector.Instance> = networkInspector(driver);
const partitionKey = new PartitionKey("user-context", "https://example.com");
const sourceOrigin: string = partitionKey.sourceOrigin;

Network(driver).then(async network => {
    const interceptId: string = await network.addIntercept(interceptParameters);
    await network.setCacheBehavior(CacheBehavior.BYPASS, ["context"]);
    await network.continueRequest(continueRequest);
    await network.continueResponse(continueResponse);
    await network.provideResponse(new ProvideResponseParameters("request-id").statusCode(204));
    await network.removeIntercept(interceptId);
});

const contextPartition = new BrowsingContextPartitionDescriptor("context");
const storageKeyPartition = new StorageKeyPartitionDescriptor()
    .userContext("user-context")
    .sourceOrigin("https://example.com");
const storageInstance: Promise<storage.Instance> = storage(driver);
storageInstance.then(instance => instance.getCookies(cookieFilter, contextPartition));
storageInstance.then(instance => instance.setCookie(partialCookie, storageKeyPartition));

getPermissionInstance(driver).then(permission =>
    permission.setPermission({ name: "geolocation" }, PermissionState.GRANTED, "https://example.com")
);
