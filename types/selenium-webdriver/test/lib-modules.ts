import {
    Browser,
    Capabilities,
    Capability,
    PageLoadStrategy,
    Platform,
    Timeouts,
    UserPromptHandler,
} from "selenium-webdriver/lib/capabilities";
import { Command, Name } from "selenium-webdriver/lib/command";
import { buildPath, Client, Executor, Request, Response } from "selenium-webdriver/lib/http";
import { Action, Actions, Button, Device, Keyboard, Origin, Pointer } from "selenium-webdriver/lib/input";
import { Entry, getLogger, Level, Type } from "selenium-webdriver/lib/logging";
import Network = require("selenium-webdriver/lib/network");
import { PinnedScript } from "selenium-webdriver/lib/pinnedScript";
import * as promise from "selenium-webdriver/lib/promise";
import * as proxy from "selenium-webdriver/lib/proxy";
import { escapeQuotes } from "selenium-webdriver/lib/select";
import { Session } from "selenium-webdriver/lib/session";
import Script = require("selenium-webdriver/lib/script");
import { serialize } from "selenium-webdriver/lib/symbols";
import type { ICredentialDictionary, IVirtualAuthenticatorOptions } from "selenium-webdriver/lib/virtual_authenticator";
import * as webElement from "selenium-webdriver/lib/webelement";

const request = new Request("POST", "/session", { capabilities: {} });
const requestText: string = request.toString();
const response = new Response(200, { "content-type": "application/json" }, "{}");
const responseText: string = response.toString();

const action = new Action();
action.type = Action.Type.POINTER_DOWN;
action.button = Button.BACK;
const backButton: 3 = Button.BACK;
const auxiliaryButton: Button = 5;
const pointerOrigin: "pointer" = Origin.POINTER;
const noneDevice = new Device(Device.Type.NONE, "none");
const noneDeviceType: "none" = noneDevice.toJSON().type;
const keyboard = new Keyboard("keyboard");
const keyDown = keyboard.keyDown("a");
const pointer = new Pointer("pointer", Pointer.Type.PEN);
const pointerDown = pointer.press(Button.LEFT);
const pointerMove = pointer.move({ origin: Origin.VIEWPORT, pressure: 0.5 });
const pointerUp = pointer.release(Button.LEFT);

const logger = getLogger("test");
const handler = (entry: Entry) => entry.toJSON();
logger.addHandler(handler);
const removed: boolean = logger.removeHandler(handler);
logger.log(Level.INFO, () => "message");
const browserLogType: "browser" = Type.BROWSER;

declare const client: Client;
const sent: Promise<Response> = client.send(request);
const executor = new Executor(client);
executor.defineCommand("custom", "POST", "/session/:sessionId/custom");
const executed: Promise<unknown> = executor.execute(new Command("custom"));
declare const commandExecutor: import("selenium-webdriver/lib/command").Executor;
const actions = new Actions(commandExecutor);
const wheel = actions.wheel();
actions.insert(keyboard, keyDown).synchronize(keyboard, pointer);
actions.scroll(0, 0, 0, 100, Origin.VIEWPORT, 100);
const wheelAction = wheel.scroll(0, 0, 0, 100, Origin.VIEWPORT, 100);
const actionSequences = actions.getSequences();
const typedExecuted: Promise<{ value: string }> = commandExecutor.execute<{ value: string }>(new Command("custom"));
const getCurrentUrl: "getCurrentUrl" = Name.GET_CURRENT_URL;
const fedCmDialogType: "getFedCmDialogType" = Name.GET_FEDCM_DIALOG_TYPE;
const command = new Command<{ sessionId: string }>(Name.GET_CURRENT_URL).setParameter("sessionId", "abc");
const commandParameters: { sessionId: string } = command.getParameters();

const delayed: Promise<void> = promise.delayed(10);
const mapped: Promise<string[]> = promise.map([1, 2], async value => String(value));
const filtered: Promise<number[]> = promise.filter([1, 2], value => value > 1);
const resolved: Promise<{ value: string }> = promise.fullyResolved({ value: Promise.resolve("done") });
const finalized: Promise<string> = promise.finally(Promise.resolve("done"), () => undefined);

const serializationSymbol: symbol = serialize;
const capabilities = new Capabilities();
const capabilityCount: number = capabilities.size;
const mergedCapabilities: Capabilities = capabilities.merge({ browserName: Browser.CHROME });
// $ExpectType void
capabilities.delete(Capability.BROWSER_VERSION);
const acceptInsecureCerts: boolean | undefined = capabilities.getAcceptInsecureCerts();
capabilities.setStrictFileInteractability(true).enableDownloads();
const escaped: string = escapeQuotes(`text with "quotes"`);
const session = new Session("session-id", new Map([["browserName", "chrome"]]));

const chrome: "chrome" = Browser.CHROME;
const browserName: "browserName" = Capability.BROWSER_NAME;
const eager: "eager" = PageLoadStrategy.EAGER;
const linux: "linux" = Platform.LINUX;
const prompt: "dismiss and notify" = UserPromptHandler.DISMISS_AND_NOTIFY;
const timeouts = new Timeouts();
timeouts.implicit = 500;

declare const authenticatorOptions: IVirtualAuthenticatorOptions;
const authenticatorProtocol: string = authenticatorOptions.protocol;
declare const credentialDictionary: ICredentialDictionary;
const credentialId: string = credentialDictionary.credentialId;

const parameters: Record<string, unknown> = { sessionId: "abc" };
const path: string = buildPath("/session/:sessionId", parameters);

const direct: proxy.Config<"direct"> = proxy.direct();
const manual: proxy.ManualConfig = proxy.manual({ http: "localhost:8080", bypass: ["localhost"] });
const socks: proxy.SocksConfig = proxy.socks("localhost:1080", 5);
const pac: proxy.PacConfig = proxy.pac("https://example.com/proxy.pac");
const system: proxy.Config<"system"> = proxy.system();

const pinned = new PinnedScript(() => "title");
const handle: string = pinned.handle;
pinned.scriptId = "script-id";

declare const driver: import("selenium-webdriver").WebDriver;
const network = new Network(driver);
const handlerId: Promise<number> = network.addAuthenticationHandler("user", "password");
const cleared: Promise<void> = network.clearAuthenticationHandlers();

const script = new Script(driver);
const result: Promise<import("selenium-webdriver/bidi/protocolValue").RemoteValue | undefined> = script.execute(
    "function () { return 'ok'; }",
);

const encoded: unknown = { "element-6066-11e4-a52e-4f735466cecf": "element-id" };
if (webElement.isId(encoded)) {
    const id: string = webElement.extractId(encoded);
}
