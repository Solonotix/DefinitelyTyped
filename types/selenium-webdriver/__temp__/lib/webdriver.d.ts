import type { SuggestedString, TypedFunction } from '../_internal.js';
import type { Bidi } from '../bidi/_internal.js';
import type { CdpConnection } from '../devtools/CDPConnection.js';
import type { HttpResponse } from '../devtools/networkinterceptor.js';
import type { LocatorArgument, LocatorFunction, ScriptFunction } from './by.js';
import type { Capabilities } from './capabilities.js';
import type { Command, Executor } from './command.js';
import type { Actions, FileDetector, IActionsOptions } from './input.js';
import type * as logging from './logging.js';
import Network = require('./network.js');
import type { PinnedScript } from './pinnedScript.js';
import Script = require('./script.js');
import type { Session } from './session.js';
import * as Symbols from './symbols.js';
import type { WebElementBooleanAttribute, WebElementBuildId, WebElementBuildObject } from './webelement.js';
import Dialog = require('./fedcm/dialog.js');
import { Credential, VirtualAuthenticatorOptions } from './virtual_authenticator.js';

export { };

export type IWebDriverOptionsCookie = ICookie;
export interface ICookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    expiry?: number;
    sameSite?: string;
}

export interface ITimeouts {
    script?: number;
    pageLoad?: number;
    implicit?: number;
}

export type NewWindowTypeHint = SuggestedString<'window' | 'tab'>;

export interface IPrintPageOptions {
    background?: boolean;
    bottom?: number;
    height?: number;
    left?: number;
    orientation?: string;
    pageRanges?: Array<string>;
    right?: number;
    scale?: number;
    shrinkToFit?: boolean;
    top?: number;
    width?: number;
}

export interface IPrintPageParamsMargin {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
}

export interface IPrintPageParamsPage {
    height?: number;
    width?: number;
}

export interface IPrintPageParams {
    background?: boolean;
    margin?: IPrintPageParamsMargin;
    orientation?: string;
    page?: IPrintPageParamsPage;
    pageRanges?: Array<string>;
    scale?: number;
    shrinkToFit?: boolean;
}

type LogEventConsoleCalled = 'Runtime.consoleAPICalled';
type LogEventEntryAdded = 'Log.entryAdded';
type LogEventMutation = 'Runtime.bindingCalled';
type LogEvenRuntimeException = 'Runtime.exceptionThrown';
export type LogEventMethod = SuggestedString<
    LogEventConsoleCalled | LogEventEntryAdded | LogEventMutation | LogEvenRuntimeException
>;

export interface ILogEventParams {
    args: unknown;
    level?: string;
    message?: string;
    timestamp: Date;
    type?: string;
}

export interface ILogExceptionParams {
    exceptionDetails?: unknown;
    timestamp: Date;
}

export interface ILogMutationParams {
    attribute_name?: string;
    current_value?: unknown;
    element?: WebElement;
    old_value?: unknown;
}

export interface ISessionEventResponse {
    eventType: string;
    success: boolean;
    timestamp: number;
}

export interface IDimensions {
    height: number;
    width: number;
}

export interface IRectangle extends IDimensions {
    x: number;
    y: number;
}

export class Alert {
    readonly driver_: WebDriver;
    readonly text_: Promise<string>;

    constructor(driver: WebDriver, text: string);

    accept(): Promise<void>;

    dismiss(): Promise<void>;

    getText(): Promise<string>;

    sendKeys(text: string): Promise<void>;
}

export class AlertPromise extends Alert {
    catch(onrejected?: (reason: unknown) => void | PromiseLike<void>): Promise<void>;

    then(
        onfulfilled: (value: Alert) => void | PromiseLike<void>,
        onrejected?: (reason: unknown) => void | PromiseLike<void>,
    ): Promise<void>;

    constructor(driver: WebDriver, alert: Promise<Alert>);
}

declare class Cookie implements ICookie {
    domain?: string;
    expiry?: number;
    httpOnly?: boolean;
    name: string;
    path?: string;
    sameSite?: string;
    secure?: boolean;
    value: string;
}

interface CookieConstructor {
    new(): Cookie;
}

export class Condition<T> {
    readonly description_: string;

    readonly fn: (driver: WebDriver) => Promise<T>;

    constructor(message: string, fn: (driver: WebDriver) => T | Promise<T>);

    description(): string;
}

export class Logs {
    readonly driver_: WebDriver;

    constructor(driver: WebDriver);

    get(type: logging.Type): Promise<Array<logging.Entry>>;

    getAvailableLogTypes(): Promise<Array<logging.Type>>;
}

export class Navigation {
    readonly driver_: WebDriver;

    constructor(driver: WebDriver);

    to(url: string): Promise<void>;

    back(): Promise<void>;

    forward(): Promise<void>;

    refresh(): Promise<void>;
}

export class Options {
    static Cookie: CookieConstructor;

    readonly driver_: WebDriver;

    constructor(driver: WebDriver);

    addCookie(cookie: ICookie): Promise<void>;

    deleteAllCookies(): Promise<void>;

    deleteCookie(name: string): Promise<void>;

    getCookies(): Promise<Array<ICookie>>;

    getCookie(name: string): Promise<Cookie | null>;

    getTimeouts(): ITimeouts;

    setTimeouts(conf?: ITimeouts): Promise<void>;

    logs(): Logs;

    window(): Window;
}

declare class ShadowRootBase {
    readonly driver_: WebDriver;
    readonly id_: string;

    constructor(driver: WebDriver, id: string);

    static extractId(obj: unknown): string;

    static isId(obj: unknown): boolean;

    [Symbols.serialize](): string;

    private execute_<T>(command: Command): Promise<T>;

    findElement(locator: LocatorArgument): WebElementPromise;

    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;
}

export class ShadowRoot extends ShadowRootBase {
    getId(): string;
}

declare class ShadowRootPromise extends ShadowRootBase {
    constructor(driver: WebDriver, shadow: Promise<ShadowRoot>);

    catch(onrejected?: (reason: unknown) => unknown): Promise<unknown>;

    getId(): Promise<string>;

    then(onfulfilled: (shadow: ShadowRoot) => unknown, onrejected?: (reason: unknown) => unknown): Promise<unknown>;
}

export class TargetLocator {
    readonly driver_: WebDriver;

    constructor(driver: WebDriver);

    activeElement(): WebElementPromise;

    defaultContent(): Promise<void>;

    frame(id: number | string | WebElement | null): Promise<void>;

    parentFrame(): Promise<void>;

    window(nameOrHandle: string): Promise<void>;

    newWindow(typeHint: NewWindowTypeHint): Promise<void>;

    alert(): AlertPromise;
}

type WaitCondition<T> = Condition<T> | Promise<T> | ((driver: WebDriver) => T | Promise<T>);

export interface IWebDriver {
    actions(options: IActionsOptions): Actions;

    close(): Promise<void>;

    execute<T, C extends Command = Command>(command: C): Promise<T>;

    executeAsyncScript<T, A extends Array<unknown>>(script: ScriptFunction<T, A>, ...var_args: A): Promise<T>;

    executeScript<T, A extends Array<unknown>>(script: ScriptFunction<T, A>, ...var_args: A): Promise<T>;

    findElement(locator: LocatorArgument): Promise<WebElement> | WebElementPromise;

    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;

    get(url: string): Promise<void>;

    getAllWindowHandles(): Promise<Array<string>>;

    getCapabilities(): Promise<Capabilities>;

    fireSessionEvent(eventType: string, payload?: Record<string, unknown> | null): Promise<ISessionEventResponse>;

    getCurrentUrl(): Promise<string>;

    getExecutor(): Executor;

    getPageSource(): Promise<string>;

    getSession(): Promise<Session>;

    getTitle(): Promise<string>;

    getWindowHandle(): Promise<string>;

    sleep(ms: number): Promise<void>;

    takeScreenshot(): Promise<string>;

    manage(): Options;

    navigate(): Navigation;

    printPage(options: IPrintPageOptions): Promise<string>;

    quit(): Promise<void>;

    setFileDetector(detector: FileDetector): void;

    switchTo(): TargetLocator;

    wait<T>(condition: WaitCondition<T>, timeout?: number, message?: string, pollTimeout?: number): Promise<T>;
}

export const IWebDriver: { new(): IWebDriver };

export class WebDriver implements IWebDriver {
    private _bidiConnection: Bidi;
    private _cdpConnect?: CdpConnection;
    private _wsUrl?: string;

    private authenticatorId_: string | null;
    readonly executor_: Executor;
    private fileDetector_: FileDetector | null;
    readonly onQuit_: CallableFunction | undefined;
    readonly pinnedScripts_: Record<string, PinnedScript>;
    readonly session_: Promise<Session>;

    sessionId: string;

    constructor(session: Session | Promise<Session>, executor: Executor, onQuit?: CallableFunction);

    static createSession(executor: Executor, capabilities: Capabilities, onQuit?: CallableFunction): WebDriver;

    execute<T, C extends Command>(command: C): Promise<T>;

    setFileDetector<T extends FileDetector>(detector: T): void;

    getExecutor(): Executor;

    getSession(): Promise<Session>;

    getCapabilities(): Promise<Capabilities>;

    fireSessionEvent(eventType: string, payload?: Record<string, unknown> | null): Promise<ISessionEventResponse>;

    quit(): Promise<void>;

    actions(options?: IActionsOptions): Actions;

    executeScript<T>(script: CallableFunction | string | PinnedScript, ...args: Array<unknown>): Promise<T>;

    executeAsyncScript<T>(script: CallableFunction | string | PinnedScript, ...args: Array<unknown>): Promise<T>;

    wait<T>(condition: WaitCondition<T>, timeout?: number, message?: string, pollTimeout?: number): Promise<T>;

    sleep(ms: number): Promise<void>;

    getWindowHandle(): Promise<string>;

    getAllWindowHandles(): Promise<Array<string>>;

    getPageSource(): Promise<string>;

    close(): Promise<void>;

    get(url: string): Promise<void>;

    getCurrentUrl(): Promise<string>;

    getTitle(): Promise<string>;

    findElement(locator: LocatorArgument): Promise<WebElement> | WebElementPromise;

    normalize_(webElementPromise: WebElementPromise): Promise<WebElement>;

    findElementInternal_(locatorFn: LocatorFunction, context: WebDriver | WebElement): Promise<WebElement>;

    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;

    findElementsInternal_(locatorFn: LocatorFunction, context: WebDriver | WebElement): Promise<Array<WebElement>>;

    takeScreenshot(): Promise<string>;

    setDelayEnabled(enabled: boolean): Promise<void>;

    resetCooldown(): Promise<void>;

    getFederalCredentialManagementDialog(): Dialog;

    manage(): Options;

    navigate(): Navigation;

    switchTo(): TargetLocator;

    script(): Script;

    network(): Network;

    validatePrintPageParams(keys: IPrintPageOptions, object: IPrintPageParams): IPrintPageParams;

    printPage(options?: IPrintPageOptions): Promise<string>;

    /**
     * Creates a new WebSocket connection.
     * @return {!Promise<resolved>} A new CDP instance.
     */
    createCDPConnection(target?: never): Promise<void>;

    getCdpTargets(): Promise<void>;

    getBidi(): Bidi;

    getWsUrl(debuggerAddress: string, target: string, caps: Capabilities): Promise<string>;

    register(username: string, password: string, connection: CdpConnection): Promise<void>;

    onIntercept(connection: WebSocket, httpResponse: HttpResponse, callback: CallableFunction): Promise<void>;

    // eslint-disable-next-line @definitelytyped/no-single-element-tuple-type
    onLogEvent(connection: CdpConnection, callback: TypedFunction<void, [ILogEventParams]>): Promise<void>;

    // eslint-disable-next-line @definitelytyped/no-single-element-tuple-type
    onLogException(connection: CdpConnection, callback: TypedFunction<void, [ILogExceptionParams]>): Promise<void>;

    // eslint-disable-next-line @definitelytyped/no-single-element-tuple-type
    logMutationEvents(connection: CdpConnection, callback: TypedFunction<void, [ILogMutationParams]>): Promise<void>;

    pinScript(script: string | CallableFunction): Promise<PinnedScript>;

    unpinScript(script: PinnedScript): Promise<void>;

    virtualAuthenticatorId(): string | null;

    addVirtualAuthenticator(options: VirtualAuthenticatorOptions): Promise<void>;

    removeVirtualAuthenticator(): Promise<void>;

    addCredential(credential: Credential): Promise<void>;

    getCredentials(): Promise<Array<Credential>>;

    removeCredential(credential_id: string | ArrayLike<number> | Uint8Array | ArrayBuffer): Promise<void>;

    removeAllCredentials(): Promise<void>;

    setUserVerified(verified: boolean): Promise<void>;

    getDownloadableFiles(): Promise<Array<string>>;

    downloadFile(fileName: string, targetDirectory: string): Promise<void>;

    deleteDownloadableFiles(): Promise<void>;
}

export class WebElement {
    readonly driver_: WebDriver;
    readonly id_: Promise<string>;
    readonly log_: logging.Logger;

    constructor(driver: WebDriver, id: string | Promise<string>);

    static buildId(id: string, noLegacy?: boolean): WebElementBuildObject;

    static extractId(obj: unknown): string;

    static isId(obj: unknown): obj is WebElementBuildObject;

    static equals(a: WebElement, b: WebElement): Promise<boolean>;

    getDriver(): WebDriver;

    getId(): Promise<string>;

    [Symbols.serialize](): Promise<WebElementBuildId>;

    private execute_<T>(command: Command): Promise<T>;

    findElement(locator: LocatorArgument): WebElementPromise;

    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;

    click(): Promise<void>;

    sendKeys(...args: Array<string | number | Promise<string | number>>): Promise<void>;

    getTagName(): Promise<string>;

    getCssValue(cssStyleProperty: string): Promise<string>;

    getAttribute(attributeName: WebElementBooleanAttribute): Promise<boolean>;
    getAttribute(attributeName: string): Promise<string | null>;

    getDomAttribute(attributeName: WebElementBooleanAttribute): Promise<boolean>;
    getDomAttribute(attributeName: string): Promise<string | null>;

    getProperty(propertyName: string): Promise<string>;

    getShadowRoot(): Promise<ShadowRoot>;

    getText(): Promise<string>;

    getAriaRole(): Promise<string>;

    getAccessibleName(): Promise<string>;

    getRect(): Promise<IRectangle>;

    isEnabled(): Promise<boolean>;

    isSelected(): Promise<boolean>;

    submit(): Promise<void>;

    clear(): Promise<void>;

    isDisplayed(): Promise<boolean>;

    takeScreenshot(): Promise<string>;
}

export class WebElementCondition extends Condition<WebElement> { }

export class WebElementPromise extends WebElement {
    readonly catch: Promise<WebElement>['catch'];
    readonly then: Promise<WebElement>['then'];

    /**
     * @param {!WebDriver} driver The parent WebDriver instance for this
     *     element.
     * @param {!Promise<!WebElement>} el A promise
     *     that will resolve to the promised element.
     */
    constructor(driver: WebDriver, el: Promise<WebElement>);

    getId(): Promise<string>;
}

export class Window {
    readonly driver_: WebDriver;
    readonly log_: logging.Logger;

    constructor(driver: WebDriver);

    getRect(): Promise<IRectangle>;

    setRect(options: Partial<IRectangle>): Promise<IRectangle>;

    maximize(): Promise<void>;

    minimize(): Promise<void>;

    fullscreen(): Promise<void>;

    getSize(windowHandle?: string): Promise<IDimensions>;

    setSize(options: Partial<IRectangle>, windowHandle?: string): Promise<void>;
}
