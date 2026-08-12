import browser = require("selenium-webdriver/bidi/browser");
import browsingContext = require("selenium-webdriver/bidi/browsingContext");
import browsingContextInspector = require("selenium-webdriver/bidi/browsingContextInspector");
import type { AddInterceptParameters } from "selenium-webdriver/bidi/addInterceptParameters";
import { ArgumentValue } from "selenium-webdriver/bidi/argumentValue";
import {
    CaptureScreenshotParameters,
    Origin as ScreenshotOrigin,
} from "selenium-webdriver/bidi/captureScreenshotParameters";
import { ContinueRequestParameters } from "selenium-webdriver/bidi/continueRequestParameters";
import { ContinueResponseParameters } from "selenium-webdriver/bidi/continueResponseParameters";
import { CookieFilter } from "selenium-webdriver/bidi/cookieFilter";
import { CreateContextParameters } from "selenium-webdriver/bidi/createContextParameters";
import input = require("selenium-webdriver/bidi/input");
import { InterceptPhase } from "selenium-webdriver/bidi/interceptPhase";
import { CacheBehavior, Network } from "selenium-webdriver/bidi/network";
import type { BytesValue, Header } from "selenium-webdriver/bidi/networkTypes";
import type { IActionsSequence } from "selenium-webdriver/lib/input";
import networkInspector = require("selenium-webdriver/bidi/networkInspector");
import { getPermissionInstance, PermissionState } from "selenium-webdriver/bidi/external/permissions";
import { PartialCookie } from "selenium-webdriver/bidi/partialCookie";
import {
    BrowsingContextPartitionDescriptor,
    type IBrowsingContextPartitionDescriptor,
    type IStorageKeyPartitionDescriptor,
    type PartitionDescriptorType,
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

const createContextParameters = new CreateContextParameters()
    .background(true)
    .referenceContext("context")
    .userContext("user-context");
const contextParametersMap: Map<string, string | boolean> = createContextParameters.asMap();
declare const interceptParameters: AddInterceptParameters;

const argument = new ArgumentValue(LocalValue.createStringValue("value"));
const argumentMap: Record<string, unknown> = argument.asMap();

const browserInstance: Promise<browser.Browser> = browser(driver);
const legacyBrowserInstance: Promise<browser.Instance> = browserInstance;
const maximized: "maximized" = browser.WindowState.MAXIMIZED;

const locator = browsingContext.Locator.innerText("WebDriver", true, "partial", 2);
const locatorType: "innerText" = browsingContext.Locator.Type.INNER_TEXT;
const locatorTypeName: browsingContext.Locator.Type.InnerText = "innerText";
const locatorMatch: browsingContext.Locator.Match.Partial = "partial";
const contextType: browsingContext.Type.Window = "window";
const readiness: browsingContext.Readiness.Complete = "complete";
const locatorMap: Map<string, string | boolean | number | undefined> = locator.toMap();
const browsingContextInstance: Promise<browsingContext.BrowsingContext> = browsingContext(driver, {
    browsingContextId: "context",
});
browsingContextInstance.then(async context => {
    const node = await context.locateNode(locator);
    const navigationId: string | null = (await context.navigate("https://example.com", "complete")).navigationId;
});

const screenshotParameters = new CaptureScreenshotParameters().origin(ScreenshotOrigin.DOCUMENT).imageFormat("png");
const screenshotParametersMap: Map<string, string | number | Map<string, unknown> | undefined> = screenshotParameters
    .asMap();

const contextInspector: Promise<browsingContextInspector.BrowsingContextInspector> = browsingContextInspector(
    driver,
    ["context"],
);
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

const inputInstance: Promise<input.Input> = input(driver);
inputInstance.then(instance => instance.setFiles("context", "shared-element-id", ["/tmp/file.txt"]));
declare const actionSequences: IActionsSequence[];
inputInstance.then(instance => instance.perform("context", actionSequences));

const beforeRequestSent: "beforeRequestSent" = InterceptPhase.BEFORE_REQUEST_SENT;
const ownership: "root" = ResultOwnership.ROOT;

const inspector: Promise<networkInspector.NetworkInspector> = networkInspector(driver);
inspector.then(instance => instance.authRequired(event => event.response));
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
const contextPartitionMap: Map<keyof IBrowsingContextPartitionDescriptor, string> = contextPartition.asMap();
const storageKeyPartitionMap: Map<keyof IStorageKeyPartitionDescriptor, string | undefined> = storageKeyPartition
    .asMap();
const partitionType: PartitionDescriptorType = "context";

// @ts-expect-error WebDriver BiDi browsing context identifiers are strings.
new BrowsingContextPartitionDescriptor(1);

// @ts-expect-error WebDriver BiDi user context identifiers are strings.
storageKeyPartition.userContext(1);

// @ts-expect-error Partition descriptor types are a closed protocol discriminant.
const invalidPartitionType: PartitionDescriptorType = "custom";

const storageInstance: Promise<storage.Storage> = storage(driver);
storageInstance.then(instance => instance.getCookies(cookieFilter, contextPartition));
storageInstance.then(instance => instance.setCookie(partialCookie, storageKeyPartition));

getPermissionInstance(driver).then(permission =>
    permission.setPermission({ name: "geolocation" }, PermissionState.GRANTED, "https://example.com")
);
