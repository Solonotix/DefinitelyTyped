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
import type { WebElementBuildLegacyId, WebElementBuildObject } from './webelement.js';
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
    /**
     * Defines when, in milliseconds, to interrupt a script that is being
     * {@linkplain ./webdriver.IWebDriver#executeScript evaluated}.
     */
    script?: number;
    /**
     * The timeout, in milliseconds, to apply to navigation events along with the
     * {@link PageLoadStrategy}.
     */
    pageLoad?: number;
    /**
     * The maximum amount of time, in milliseconds, to spend attempting to
     * {@linkplain ./webdriver.IWebDriver#findElement locate} an element on the
     * current page.
     */
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

/** @deprecated Use {@link IDimensions}. */
export type ISize = IDimensions;

/**
 * x,y
 */
export interface ILocation {
    x: number;
    y: number;
}

export type IWebElementId = WebElementBuildObject;

/**
 * Defines an object that can be asynchronously serialized to its WebDriver
 * wire representation.
 *
 * @template T
 */
export interface Serializable<T> {
    [Symbols.serialize](): T | Promise<T>;
}

/**
 * x,y,w,h
 */
export interface IRectangle extends IDimensions {
    x: number;
    y: number;
}

/**
 * Represents a modal dialog such as {@code alert}, {@code confirm}, or
 * {@code prompt}. Provides functions to retrieve the message displayed with
 * the alert, accept or dismiss the alert, and set the response text (in the
 * case of {@code prompt}).
 */
export class Alert {
    readonly driver_: WebDriver;
    readonly text_: Promise<string>;

    /**
     * @param {!WebDriver} driver The driver controlling the browser this alert
     *     is attached to.
     * @param {string} text The message text displayed with this alert.
     */
    constructor(driver: WebDriver, text: string);

    /**
     * Accepts this alert.
     *
     * @return {!Promise<void>} A promise that will be resolved
     *     when this command has completed.
     */
    accept(): Promise<void>;

    /**
     * Dismisses this alert.
     *
     * @return {!Promise<void>} A promise that will be resolved
     *     when this command has completed.
     */
    dismiss(): Promise<void>;

    /**
     * Retrieves the message text displayed with this alert. For instance, if the
     * alert were opened with alert('hello'), then this would return 'hello'.
     *
     * @return {!Promise<string>} A promise that will be
     *     resolved to the text displayed with this alert.
     */
    getText(): Promise<string>;

    /**
     * Sets the response text on this alert. This command will return an error if
     * the underlying alert does not support response text (e.g. window.alert and
     * window.confirm).
     *
     * @param {string} text The text to set.
     * @return {!Promise<void>} A promise that will be resolved
     *     when this command has completed.
     */
    sendKeys(text: string): Promise<void>;
}

/**
 * Implement AlertPromise
 */
export class AlertPromise extends Alert {
    catch(onrejected?: (reason: unknown) => void | PromiseLike<void>): Promise<void>;

    then(
        onfulfilled: (value: Alert) => void | PromiseLike<void>,
        onrejected?: (reason: unknown) => void | PromiseLike<void>,
    ): Promise<void>;

    /**
     * @param {!WebDriver} driver The driver controlling the browser this
     *     alert is attached to.
     * @param {!Promise<!Alert>} alert A thenable
     *     that will be fulfilled with the promised alert.
     */
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

/**
 * Defines a condition for use with WebDriver's {@linkplain WebDriver#wait wait
 * command}.
 */
export class Condition<T> {
    readonly description_: string;

    readonly fn: (driver: WebDriver) => T | null | Promise<T | null>;

    /**
     * @param {string} message A descriptive error message. Should complete the
     *     sentence 'Waiting [...]'
     * @param {function(!WebDriver): OUT} fn The condition function to
     *     evaluate on each iteration of the wait loop.
     */
    constructor(message: string, fn: (driver: WebDriver) => T | null | Promise<T | null>);

    /** @return {string} A description of this condition. */
    description(): string;
}

/**
 * Interface for managing WebDriver log records.
 */
export class Logs {
    readonly driver_: WebDriver;

    /**
     * @param {!WebDriver} driver The parent driver.
     */
    constructor(driver: WebDriver);

    /**
     * Fetches available log entries for the given type.
     *
     * <p/>Note that log buffers are reset after each call, meaning that
     * available log entries correspond to those entries not yet returned for a
     * given log type. In practice, this means that this call will return the
     * available log entries since the last call, or from the start of the
     * session.
     *
     * @param {!logging.Type} type The desired log type.
     * @return {!Promise.<!Array.<!logging.Entry>>} A
     *   promise that will resolve to a list of log entries for the specified
     *   type.
     */
    get(type: logging.Type): Promise<Array<logging.Entry>>;

    /**
     * Retrieves the log types available to this driver.
     * @return {!Promise.<!Array.<!logging.Type>>} A
     *     promise that will resolve to a list of available log types.
     */
    getAvailableLogTypes(): Promise<Array<logging.Type>>;
}

/**
 * Interface for navigating back and forth in the browser history.
 *
 * This class should never be instantiated directly. Instead, obtain an instance
 * with
 *
 *    webdriver.navigate()
 *
 * @see WebDriver#navigate()
 */
export class Navigation {
    readonly driver_: WebDriver;

    /**
     * @param {!WebDriver} driver The parent driver.
     */
    constructor(driver: WebDriver);

    /**
     * Navigates to a new URL.
     *
     * @param {string} url The URL to navigate to.
     * @return {!Promise<void>} A promise that will be resolved when the URL
     *     has been loaded.
     */
    to(url: string): Promise<void>;

    /**
     * Moves backwards in the browser history.
     *
     * @return {!Promise<void>} A promise that will be resolved when the
     *     navigation event has completed.
     */
    back(): Promise<void>;

    /**
     * Moves forwards in the browser history.
     *
     * @return {!Promise<void>} A promise that will be resolved when the
     *     navigation event has completed.
     */
    forward(): Promise<void>;

    /**
     * Refreshes the current page.
     *
     * @return {!Promise<void>} A promise that will be resolved when the
     *     navigation event has completed.
     */
    refresh(): Promise<void>;
}

/**
 * Provides methods for managing browser and driver state.
 *
 * This class should never be instantiated directly. Instead, obtain an instance
 * with {@linkplain WebDriver#manage() webdriver.manage()}.
 */
export class Options {
    static Cookie: CookieConstructor;

    readonly driver_: WebDriver;

    /**
     * @param {!WebDriver} driver The parent driver.
     */
    constructor(driver: WebDriver);

    /**
     * Adds a cookie.
     *
     * __Sample Usage:__
     *
     *     // Set a basic cookie.
     *     driver.manage().addCookie({name: 'foo', value: 'bar'});
     *
     *     // Set a cookie that expires in 10 minutes.
     *     let expiry = new Date(Date.now() + (10 * 60 * 1000));
     *     driver.manage().addCookie({name: 'foo', value: 'bar', expiry});
     *
     *     // The cookie expiration may also be specified in seconds since epoch.
     *     driver.manage().addCookie({
     *       name: 'foo',
     *       value: 'bar',
     *       expiry: Math.floor(Date.now() / 1000)
     *     });
     *
     * @param {!Options.Cookie} spec Defines the cookie to add.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the cookie has been added to the page.
     * @throws {error.InvalidArgumentError} if any of the cookie parameters are
     *     invalid.
     * @throws {TypeError} if `spec` is not a cookie object.
     */
    addCookie(cookie: ICookie): Promise<void>;

    /**
     * Deletes all cookies visible to the current page.
     *
     * @return {!Promise<void>} A promise that will be resolved
     *     when all cookies have been deleted.
     */
    deleteAllCookies(): Promise<void>;

    /**
     * Deletes the cookie with the given name. This command is a no-op if there is
     * no cookie with the given name visible to the current page.
     *
     * @param {string} name The name of the cookie to delete.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the cookie has been deleted.
     */
    deleteCookie(name: string): Promise<void>;

    /**
     * Retrieves all cookies visible to the current page. Each cookie will be
     * returned as a JSON object as described by the WebDriver wire protocol.
     *
     * @return {!Promise<!Array<!Options.Cookie>>} A promise that will be
     *     resolved with the cookies visible to the current browsing context.
     */
    getCookies(): Promise<Array<ICookie>>;

    /**
     * Retrieves the cookie with the given name. Returns null if there is no such
     * cookie. The cookie will be returned as a JSON object as described by the
     * WebDriver wire protocol.
     *
     * @param {string} name The name of the cookie to retrieve.
     * @return {!Promise<?Options.Cookie>} A promise that will be resolved
     *     with the named cookie
     * @throws {error.NoSuchCookieError} if there is no such cookie.
     */
    getCookie(name: string): Promise<Cookie | null>;

    /**
     * Fetches the timeouts currently configured for the current session.
     *
     * @return {!Promise<{script: number,
     *                             pageLoad: number,
     *                             implicit: number}>} A promise that will be
     *     resolved with the timeouts currently configured for the current
     *     session.
     * @see #setTimeouts()
     */
    getTimeouts(): Promise<ITimeouts>;

    /**
     * Sets the timeout durations associated with the current session.
     *
     * The following timeouts are supported (all timeouts are specified in
     * milliseconds):
     *
     * -  `implicit` specifies the maximum amount of time to wait for an element
     *    locator to succeed when {@linkplain WebDriver#findElement locating}
     *    {@linkplain WebDriver#findElements elements} on the page.
     *    Defaults to 0 milliseconds.
     *
     * -  `pageLoad` specifies the maximum amount of time to wait for a page to
     *    finishing loading. Defaults to 300000 milliseconds.
     *
     * -  `script` specifies the maximum amount of time to wait for an
     *    {@linkplain WebDriver#executeScript evaluated script} to run. If set to
     *    `null`, the script timeout will be indefinite.
     *    Defaults to 30000 milliseconds.
     *
     * @param {{script: (number|null|undefined),
     *          pageLoad: (number|null|undefined),
     *          implicit: (number|null|undefined)}} conf
     *     The desired timeout configuration.
     * @return {!Promise<void>} A promise that will be resolved when the timeouts
     *     have been set.
     * @throws {!TypeError} if an invalid options object is provided.
     * @see #getTimeouts()
     * @see <https://w3c.github.io/webdriver/webdriver-spec.html#dfn-set-timeouts>
     */
    setTimeouts(conf?: ITimeouts): Promise<void>;

    /**
     * @return {!Logs} The interface for managing driver logs.
     */
    logs(): Logs;

    /**
     * @return {!Window} The interface for managing the current window.
     */
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

/**
 * Represents a ShadowRoot of a {@link WebElement}. Provides functions to
 * retrieve elements that live in the DOM below the ShadowRoot.
 */
export class ShadowRoot extends ShadowRootBase {
    getId(): string;
}

export type ShadowRootPromise = Omit<ShadowRoot, 'getId'> & Promise<ShadowRoot> & {
    getId(): Promise<string>;
};

/**
 * An interface for changing the focus of the driver to another frame or window.
 *
 * This class should never be instantiated directly. Instead, obtain an
 * instance with
 *
 *     webdriver.switchTo()
 *
 * @see WebDriver#switchTo()
 */
export class TargetLocator {
    readonly driver_: WebDriver;

    /**
     * @param {!WebDriver} driver The parent driver.
     */
    constructor(driver: WebDriver);

    /**
     * Locates the DOM element on the current page that corresponds to
     * `document.activeElement` or `document.body` if the active element is not
     * available.
     *
     * @return {!WebElementPromise} The active element.
     */
    activeElement(): WebElementPromise;

    /**
     * Switches focus of all future commands to the topmost frame in the current
     * window.
     *
     * @return {!Promise<void>} A promise that will be resolved
     *     when the driver has changed focus to the default content.
     */
    defaultContent(): Promise<void>;

    /**
     * Changes the focus of all future commands to another frame on the page. The
     * target frame may be specified as one of the following:
     *
     * - A number that specifies a (zero-based) index into [window.frames](
     *   https://developer.mozilla.org/en-US/docs/Web/API/Window.frames).
     * - A {@link WebElement} reference, which correspond to a `frame` or `iframe`
     *   DOM element.
     * - The `null` value, to select the topmost frame on the page. Passing `null`
     *   is the same as calling {@link #defaultContent defaultContent()}.
     *
     * If the specified frame can not be found, the returned promise will be
     * rejected with a {@linkplain error.NoSuchFrameError}.
     *
     * @param {(number|string|WebElement|null)} id The frame locator.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the driver has changed focus to the specified frame.
     */
    frame(id: number | string | WebElement | null): Promise<void>;

    /**
     * Changes the focus of all future commands to the parent frame of the
     * currently selected frame. This command has no effect if the driver is
     * already focused on the top-level browsing context.
     *
     * @return {!Promise<void>} A promise that will be resolved when the command
     *     has completed.
     */
    parentFrame(): Promise<void>;

    /**
     * Changes the focus of all future commands to another window. Windows may be
     * specified by their {@code window.name} attribute or by its handle
     * (as returned by {@link WebDriver#getWindowHandles}).
     *
     * If the specified window cannot be found, the returned promise will be
     * rejected with a {@linkplain error.NoSuchWindowError}.
     *
     * @param {string} nameOrHandle The name or window handle of the window to
     *     switch focus to.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the driver has changed focus to the specified window.
     */
    window(nameOrHandle: string): Promise<void>;

    /**
     * Creates a new browser window and switches the focus for future
     * commands of this driver to the new window.
     *
     * @param {string} typeHint 'window' or 'tab'. The created window is not
     *     guaranteed to be of the requested type; if the driver does not support
     *     the requested type, a new browser window will be created of whatever type
     *     the driver does support.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the driver has changed focus to the new window.
     */
    newWindow(typeHint: NewWindowTypeHint): Promise<void>;

    /**
     * Changes focus to the active modal dialog, such as those opened by
     * `window.alert()`, `window.confirm()`, and `window.prompt()`. The returned
     * promise will be rejected with a
     * {@linkplain error.NoSuchAlertError} if there are no open alerts.
     *
     * @return {!AlertPromise} The open alert.
     */
    alert(): AlertPromise;
}

type WaitCondition<T> = Condition<T> | Promise<T> | ((driver: WebDriver) => T | null | Promise<T | null>);

export interface IWebDriver {
    actions(options: IActionsOptions): Actions;

    close(): Promise<void>;

    execute<T, C extends Command = Command>(command: C): Promise<T>;

    executeAsyncScript<T, A extends Array<unknown>>(script: ScriptFunction<T, A>, ...var_args: A): Promise<T>;

    executeScript<T, A extends Array<unknown>>(script: ScriptFunction<T, A>, ...var_args: A): Promise<T>;

    findElement(locator: LocatorArgument): WebElementPromise;

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

    wait(
        condition: WebElementCondition,
        timeout?: number,
        message?: string,
        pollTimeout?: number,
    ): WebElementPromise;

    wait<T>(condition: WaitCondition<T>, timeout?: number, message?: string, pollTimeout?: number): Promise<T>;
}

export const IWebDriver: { new(): IWebDriver };

/**
 * Each WebDriver instance provides automated control over a browser session.
 */
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

    /**
     * @param {!(./session.Session|IThenable<!./session.Session>)} session Either
     *     a known session or a promise that will be resolved to a session.
     * @param {!Executor} executor The executor to use when sending
     *     commands to the browser.
     * @param {(function(this: void): ?)=} onQuit A function to call, if any,
     *     when the session is terminated.
     */
    constructor(session: Session | Promise<Session>, executor: Executor, onQuit?: CallableFunction);

    /**
     * Creates a new WebDriver session.
     *
     * This function will always return a WebDriver instance. If there is an error
     * creating the session, such as the aforementioned SessionNotCreatedError,
     * the driver will have a rejected {@linkplain #getSession session} promise.
     * This rejection will propagate through any subsequent commands scheduled
     * on the returned WebDriver instance.
     *
     *     let required = Capabilities.firefox();
     *     let driver = WebDriver.createSession(executor, {required});
     *
     *     // If the createSession operation failed, then this command will also
     *     // also fail, propagating the creation failure.
     *     driver.get('http://www.google.com').catch(e => console.log(e));
     *
     * @param {!Executor} executor The executor to create the new session
     *     with.
     * @param {!Capabilities} capabilities The desired capabilities for the new
     *     session.
     * @param {(function(this: void): ?)=} onQuit A callback to invoke when
     *    the newly created session is terminated. This should be used to clean
     *    up any resources associated with the session.
     * @return {!WebDriver} The driver for the newly created session.
     */
    static createSession(...args: any[]): WebDriver;

    /** @override */
    execute<T, C extends Command>(command: C): Promise<T>;

    /** @override */
    setFileDetector<T extends FileDetector>(detector: T): void;

    /** @override */
    getExecutor(): Executor;

    /** @override */
    getSession(): Promise<Session>;

    /** @override */
    getCapabilities(): Promise<Capabilities>;

    fireSessionEvent(eventType: string, payload?: Record<string, unknown> | null): Promise<ISessionEventResponse>;

    /** @override */
    quit(): Promise<void>;

    /** @override */
    actions(options?: IActionsOptions): Actions;

    /**
     * Executes a snippet of JavaScript in the context of the currently selected
     * frame or window. The script fragment will be executed as the body of an
     * anonymous function. If the script is provided as a function object, that
     * function will be converted to a string for injection into the target
     * window.
     *
     * Any arguments provided in addition to the script will be included as script
     * arguments and may be referenced using the `arguments` object. Arguments may
     * be a boolean, number, string, or {@linkplain WebElement}. Arrays and
     * objects may also be used as script arguments as long as each item adheres
     * to the types previously mentioned.
     *
     * The script may refer to any variables accessible from the current window.
     * Furthermore, the script will execute in the window's context, thus
     * `document` may be used to refer to the current document. Any local
     * variables will not be available once the script has finished executing,
     * though global variables will persist.
     *
     * If the script has a return value (i.e. if the script contains a return
     * statement), then the following steps will be taken for resolving this
     * functions return value:
     *
     * - For a HTML element, the value will resolve to a {@linkplain WebElement}
     * - Null and undefined return values will resolve to null</li>
     * - Booleans, numbers, and strings will resolve as is</li>
     * - Functions will resolve to their string representation</li>
     * - For arrays and objects, each member item will be converted according to
     *     the rules above
     *
     * @param {!(string|Function)} script The script to execute.
     * @param {...*} args The arguments to pass to the script.
     * @return {!IThenable<T>} A promise that will resolve to the
     *    scripts return value.
     * @template T
     */
    /** @override */
    executeScript<T>(script: CallableFunction | string | PinnedScript, ...args: Array<unknown>): Promise<T>;

    /**
     * Executes a snippet of asynchronous JavaScript in the context of the
     * currently selected frame or window. The script fragment will be executed as
     * the body of an anonymous function. If the script is provided as a function
     * object, that function will be converted to a string for injection into the
     * target window.
     *
     * Any arguments provided in addition to the script will be included as script
     * arguments and may be referenced using the `arguments` object. Arguments may
     * be a boolean, number, string, or {@linkplain WebElement}. Arrays and
     * objects may also be used as script arguments as long as each item adheres
     * to the types previously mentioned.
     *
     * Unlike executing synchronous JavaScript with {@link #executeScript},
     * scripts executed with this function must explicitly signal they are
     * finished by invoking the provided callback. This callback will always be
     * injected into the executed function as the last argument, and thus may be
     * referenced with  `arguments[arguments.length - 1]`. The following steps
     * will be taken for resolving this functions return value against the first
     * argument to the script's callback function:
     *
     * - For a HTML element, the value will resolve to a {@link WebElement}
     * - Null and undefined return values will resolve to null
     * - Booleans, numbers, and strings will resolve as is
     * - Functions will resolve to their string representation
     * - For arrays and objects, each member item will be converted according to
     *     the rules above
     *
     * __Example #1:__ Performing a sleep that is synchronized with the currently
     * selected window:
     *
     *     var start = new Date().getTime();
     *     driver.executeAsyncScript(
     *         'window.setTimeout(arguments[arguments.length - 1], 500);').
     *         then(function() {
     *           console.log(
     *               'Elapsed time: ' + (new Date().getTime() - start) + ' ms');
     *         });
     *
     * __Example #2:__ Synchronizing a test with an AJAX application:
     *
     *     var button = driver.findElement(By.id('compose-button'));
     *     button.click();
     *     driver.executeAsyncScript(
     *         'var callback = arguments[arguments.length - 1];' +
     *         'mailClient.getComposeWindowWidget().onload(callback);');
     *     driver.switchTo().frame('composeWidget');
     *     driver.findElement(By.id('to')).sendKeys('dog@example.com');
     *
     * __Example #3:__ Injecting a XMLHttpRequest and waiting for the result. In
     * this example, the inject script is specified with a function literal. When
     * using this format, the function is converted to a string for injection, so
     * it should not reference any symbols not defined in the scope of the page
     * under test.
     *
     *     driver.executeAsyncScript(function() {
     *       var callback = arguments[arguments.length - 1];
     *       var xhr = new XMLHttpRequest();
     *       xhr.open('GET', '/resource/data.json', true);
     *       xhr.onreadystatechange = function() {
     *         if (xhr.readyState == 4) {
     *           callback(xhr.responseText);
     *         }
     *       };
     *       xhr.send('');
     *     }).then(function(str) {
     *       console.log(JSON.parse(str)['food']);
     *     });
     *
     * @param {!(string|Function)} script The script to execute.
     * @param {...*} args The arguments to pass to the script.
     * @return {!IThenable<T>} A promise that will resolve to the scripts return
     *     value.
     * @template T
     */
    executeAsyncScript<T>(script: CallableFunction | string | PinnedScript, ...args: Array<unknown>): Promise<T>;

    wait(
        condition: WebElementCondition,
        timeout?: number,
        message?: string,
        pollTimeout?: number,
    ): WebElementPromise;

    /**
     * Waits for a condition to evaluate to a 'truthy' value. The condition may be
     * specified by a {@link Condition}, as a custom function, or as any
     * promise-like thenable.
     *
     * For a {@link Condition} or function, the wait will repeatedly
     * evaluate the condition until it returns a truthy value. If any errors occur
     * while evaluating the condition, they will be allowed to propagate. In the
     * event a condition returns a {@linkplain Promise}, the polling loop will
     * wait for it to be resolved and use the resolved value for whether the
     * condition has been satisfied. The resolution time for a promise is always
     * factored into whether a wait has timed out.
     *
     * If the provided condition is a {@link WebElementCondition}, then
     * the wait will return a {@link WebElementPromise} that will resolve to the
     * element that satisfied the condition.
     *
     * _Example:_ waiting up to 10 seconds for an element to be present on the
     * page.
     *
     *     async function example() {
     *       let button =
     *           await driver.wait(until.elementLocated(By.id('foo')), 10000);
     *       await button.click();
     *     }
     *
     * @param {!(IThenable<T>|
     *           Condition<T>|
     *           function(!WebDriver): T)} condition The condition to
     *     wait on, defined as a promise, condition object, or  a function to
     *     evaluate as a condition.
     * @param {number=} timeout The duration in milliseconds, how long to wait
     *     for the condition to be true.
     * @param {(string|Function)=} message An optional message to use if the wait times out.
     * @param {number=} pollTimeout The duration in milliseconds, how long to
     *     wait between polling the condition.
     * @return {!(IThenable<T>|WebElementPromise)} A promise that will be
     *     resolved with the first truthy value returned by the condition
     *     function, or rejected if the condition times out. If the input
     *     condition is an instance of a {@link WebElementCondition},
     *     the returned value will be a {@link WebElementPromise}.
     * @throws {TypeError} if the provided `condition` is not a valid type.
     * @template T
     */
    wait<T>(condition: WaitCondition<T>, timeout?: number, message?: string, pollTimeout?: number): Promise<T>;

    /**
     * Makes the driver sleep for the given amount of time.
     *
     * @param {number} ms The amount of time, in milliseconds, to sleep.
     * @return {!Promise<void>} A promise that will be resolved when the sleep has
     *     finished.
     */
    sleep(ms: number): Promise<void>;

    /**
     * Retrieves the current window handle.
     *
     * @return {!Promise<string>} A promise that will be resolved with the current
     *     window handle.
     */
    getWindowHandle(): Promise<string>;

    /**
     * Retrieves a list of all available window handles.
     *
     * @return {!Promise<!Array<string>>} A promise that will be resolved with an
     *     array of window handles.
     */
    getAllWindowHandles(): Promise<Array<string>>;

    /**
     * Retrieves the current page's source. The returned source is a representation
     * of the underlying DOM: do not expect it to be formatted or escaped in the
     * same way as the raw response sent from the web server.
     *
     * @return {!Promise<string>} A promise that will be resolved with the current
     *     page source.
     */
    getPageSource(): Promise<string>;

    /**
     * Closes the current window.
     *
     * @return {!Promise<void>} A promise that will be resolved when this command
     *     has completed.
     */
    close(): Promise<void>;

    /**
     * Navigates to the given URL.
     *
     * @param {string} url The fully qualified URL to open.
     * @return {!Promise<void>} A promise that will be resolved when the document
     *     has finished loading.
     */
    get(url: string): Promise<void>;

    /**
     * Retrieves the URL for the current page.
     *
     * @return {!Promise<string>} A promise that will be resolved with the
     *     current URL.
     */
    getCurrentUrl(): Promise<string>;

    /**
     * Retrieves the current page title.
     *
     * @return {!Promise<string>} A promise that will be resolved with the current
     *     page's title.
     */
    getTitle(): Promise<string>;

    /**
     * Locates an element on the page. If the element cannot be found, a
     * {@link error.NoSuchElementError} will be returned by the driver.
     *
     * This function should not be used to test whether an element is present on
     * the page. Rather, you should use {@link #findElements}:
     *
     *     driver.findElements(By.id('foo'))
     *         .then(found => console.log('Element found? %s', !!found.length));
     *
     * The search criteria for an element may be defined using one of the
     * factories in the {@link webdriver.By} namespace, or as a short-hand
     * {@link webdriver.By.Hash} object. For example, the following two statements
     * are equivalent:
     *
     *     var e1 = driver.findElement(By.id('foo'));
     *     var e2 = driver.findElement({id:'foo'});
     *
     * You may also provide a custom locator function, which takes as input this
     * instance and returns a {@link WebElement}, or a promise that will resolve
     * to a WebElement. If the returned promise resolves to an array of
     * WebElements, WebDriver will use the first element. For example, to find the
     * first visible link on a page, you could write:
     *
     *     var link = driver.findElement(firstVisibleLink);
     *
     *     function firstVisibleLink(driver) {
     *       var links = driver.findElements(By.tagName('a'));
     *       return promise.filter(links, function(link) {
     *         return link.isDisplayed();
     *       });
     *     }
     *
     * @param {!(by.By|Function)} locator The locator to use.
     * @return {!WebElementPromise} A WebElement that can be used to issue
     *     commands against the located element. If the element is not found, the
     *     element will be invalidated and all scheduled commands aborted.
     */
    findElement(locator: LocatorArgument): WebElementPromise;

    /**
     * @param {!Function} webElementPromise The webElement in unresolved state
     * @return {!Promise<!WebElement>} First single WebElement from array of resolved promises
     */
    normalize_(webElementPromise: WebElementPromise): Promise<WebElement>;

    /**
     * @param {!Function} locatorFn The locator function to use.
     * @param {!(WebDriver|WebElement)} context The search context.
     * @return {!Promise<!WebElement>} A promise that will resolve to a list of
     *     WebElements.
     */
    findElementInternal_(locatorFn: LocatorFunction, context: WebDriver | WebElement): Promise<WebElement>;

    /**
     * Search for multiple elements on the page. Refer to the documentation on
     * {@link #findElement(by)} for information on element locator strategies.
     *
     * @param {!(by.By|Function)} locator The locator to use.
     * @return {!Promise<!Array<!WebElement>>} A promise that will resolve to an
     *     array of WebElements.
     */
    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;

    /**
     * @param {!Function} locatorFn The locator function to use.
     * @param {!(WebDriver|WebElement)} context The search context.
     * @return {!Promise<!Array<!WebElement>>} A promise that will resolve to an
     *     array of WebElements.
     */
    findElementsInternal_(locatorFn: LocatorFunction, context: WebDriver | WebElement): Promise<Array<WebElement>>;

    /**
     * Takes a screenshot of the current page. The driver makes the best effort to
     * return a screenshot of the following, in order of preference:
     *
     * 1. Entire page
     * 2. Current window
     * 3. Visible portion of the current frame
     * 4. The entire display containing the browser
     *
     * @return {!Promise<string>} A promise that will be resolved to the
     *     screenshot as a base-64 encod    ed PNG.
     */
    takeScreenshot(): Promise<string>;

    setDelayEnabled(enabled: boolean): Promise<void>;

    resetCooldown(): Promise<void>;

    getFederalCredentialManagementDialog(): Dialog;

    /**
     * @return {!Options} The options interface for this instance.
     */
    manage(): Options;

    /**
     * @return {!Navigation} The navigation interface for this instance.
     */
    navigate(): Navigation;

    /**
     * @return {!TargetLocator} The target locator interface for this
     *     instance.
     */
    switchTo(): TargetLocator;

    script(): Script;

    network(): Network;

    validatePrintPageParams(keys: IPrintPageOptions, object: IPrintPageParams): IPrintPageParams;

    /**
     * Takes a PDF of the current page. The driver makes a best effort to
     * return a PDF based on the provided parameters.
     *
     * @param {{orientation:(string|undefined),
     *         scale:(number|undefined),
     *         background:(boolean|undefined),
     *         width:(number|undefined),
     *         height:(number|undefined),
     *         top:(number|undefined),
     *         bottom:(number|undefined),
     *         left:(number|undefined),
     *         right:(number|undefined),
     *         shrinkToFit:(boolean|undefined),
     *         pageRanges:(Array|undefined)}} options
     */
    printPage(options?: IPrintPageOptions): Promise<string>;

    /**
     * Creates a new WebSocket connection.
     * @return {!Promise<resolved>} A new CDP instance.
     */
    createCDPConnection(target?: string): Promise<CdpConnection>;

    getCdpTargets(): Promise<void>;

    /**
     * Initiates bidi connection using 'webSocketUrl'
     * @returns {BIDI}
     */
    getBidi(): Promise<Bidi>;

    /**
     * Retrieves 'webSocketDebuggerUrl' by sending a http request using debugger address
     * @param {string} debuggerAddress
     * @param target
     * @param caps
     * @return {string} Returns parsed webSocketDebuggerUrl obtained from the http request
     */
    getWsUrl(debuggerAddress: string, target: string, caps: Capabilities): Promise<string>;

    /**
     * Sets a listener for Fetch.authRequired event from CDP
     * If event is triggered, it enter username and password
     * and allows the test to move forward
     * @param {string} username
     * @param {string} password
     * @param connection CDP Connection
     */
    register(username: string, password: string, connection: CdpConnection): Promise<void>;

    /**
     * Handle Network interception requests
     * @param connection WebSocket connection to the browser
     * @param httpResponse Object representing what we are intercepting
     *                     as well as what should be returned.
     * @param callback callback called when we intercept requests.
     */
    onIntercept(connection: CdpConnection, httpResponse: HttpResponse, callback: CallableFunction): Promise<void>;

    /**
     * @param connection
     * @param callback
     * @returns {Promise<void>}
     */
    onLogEvent(connection: CdpConnection, callback: (params: ILogEventParams) => void): Promise<void>;

    /**
     * @param connection
     * @param callback
     * @returns {Promise<void>}
     */
    onLogException(connection: CdpConnection, callback: (params: ILogExceptionParams) => void): Promise<void>;

    /**
     * @param connection
     * @param callback
     * @returns {Promise<void>}
     */
    logMutationEvents(connection: CdpConnection, callback: (params: ILogMutationParams) => void): Promise<void>;

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

/**
 * Represents a DOM element. WebElements can be found by searching from the
 * document root using a {@link WebDriver} instance, or by searching
 * under another WebElement:
 *
 *     driver.get('http://www.google.com');
 *     var searchForm = driver.findElement(By.tagName('form'));
 *     var searchBox = searchForm.findElement(By.name('q'));
 *     searchBox.sendKeys('webdriver');
 *
 * The WebElement is implemented as a promise for compatibility with the promise
 * API. It will always resolve itself when its internal state has been fully
 * resolved and commands may be issued against the element. This can be used to
 * catch errors when an element cannot be located on the page:
 *
 *     driver.findElement(By.id('not-there')).then(function(element) {
 *       alert('Found an element that was not expected to be there!');
 *     }, function(error) {
 *       alert('The element was not found, as expected');
 *     });
 */
export class WebElement implements Serializable<WebElementBuildLegacyId> {
    readonly driver_: WebDriver;
    readonly id_: Promise<string>;
    readonly log_: logging.Logger;

    /**
     * @param {!WebDriver} driver the parent WebDriver instance for this element.
     * @param {(!IThenable<string>|string)} id The server-assigned opaque ID for
     *     the underlying DOM element.
     */
    constructor(driver: WebDriver, id: string | Promise<string>);

    /**
     * @param {string} id The raw ID.
     * @param {boolean=} opt_noLegacy Whether to exclude the legacy element key.
     * @return {!Object} The element ID for use with WebDriver's wire protocol.
     */
    static buildId(id: string, noLegacy?: boolean): WebElementBuildObject;

    /**
     * Extracts the encoded WebElement ID from the object.
     *
     * @param {?} obj The object to extract the ID from.
     * @return {string} the extracted ID.
     * @throws {TypeError} if the object is not a valid encoded ID.
     */
    static extractId(obj: unknown): string;

    /**
     * @param {?} obj the object to test.
     * @return {boolean} whether the object is a valid encoded WebElement ID.
     */
    static isId(obj: unknown): obj is WebElementBuildObject;

    /**
     * Compares two WebElements for equality.
     *
     * @param {!WebElement} a A WebElement.
     * @param {!WebElement} b A WebElement.
     * @return {!Promise<boolean>} A promise that will be
     *     resolved to whether the two WebElements are equal.
     */
    static equals(a: WebElement, b: WebElement): Promise<boolean>;

    /**
     * @return {!WebDriver} The parent driver for this instance.
     */
    getDriver(): WebDriver;

    /**
     * @return {!Promise<string>} A promise that resolves to
     *     the server-assigned opaque ID assigned to this element.
     */
    getId(): Promise<string>;

    [Symbols.serialize](): Promise<WebElementBuildLegacyId>;

    private execute_<T>(command: Command): Promise<T>;

    /**
     * Schedule a command to find a descendant of this element. If the element
     * cannot be found, a {@link bot.ErrorCode.NO_SUCH_ELEMENT} result will
     * be returned by the driver. Unlike other commands, this error cannot be
     * suppressed. In other words, scheduling a command to find an element doubles
     * as an assert that the element is present on the page. To test whether an
     * element is present on the page, use {@link #findElements}.
     *
     * The search criteria for an element may be defined using one of the
     * factories in the {@link By} namespace, or as a short-hand
     * {@link By.Hash} object. For example, the following two statements
     * are equivalent:
     *
     *     var e1 = element.findElement(By.id('foo'));
     *     var e2 = element.findElement({id:'foo'});
     *
     * You may also provide a custom locator function, which takes as input
     * this WebDriver instance and returns a {@link WebElement}, or a
     * promise that will resolve to a WebElement. For example, to find the first
     * visible link on a page, you could write:
     *
     *     var link = element.findElement(firstVisibleLink);
     *
     *     function firstVisibleLink(element) {
     *       var links = element.findElements(By.tagName('a'));
     *       return promise.filter(links, function(link) {
     *         return links.isDisplayed();
     *       }).then(function(visibleLinks) {
     *         return visibleLinks[0];
     *       });
     *     }
     *
     * @param {!(by.By|Function)} locator The locator strategy to use when
     *     searching for the element.
     * @return {!WebElementPromise} A WebElement that can be used to issue
     *     commands against the located element. If the element is not found, the
     *     element will be invalidated and all scheduled commands aborted.
     */
    findElement(locator: LocatorArgument): WebElementPromise;

    /**
     * Schedules a command to find all of the descendants of this element that
     * match the given search criteria.
     *
     * @param {!(by.By|Function)} locator The locator strategy to use when
     *     searching for the element.
     * @return {!Promise<!Array<!WebElement>>} A
     *     promise that will resolve to an array of WebElements.
     */
    findElements(locator: LocatorArgument): Promise<Array<WebElement>>;

    /**
     * Schedules a command to click on this element.
     * @return {!Promise.<void>} A promise that will be resolved
     *     when the click command has completed.
     */
    click(): Promise<void>;

    /**
     * Schedules a command to type a sequence on the DOM element represented by
     * this promsieinstance.
     *
     * Modifier keys (SHIFT, CONTROL, ALT, META) are stateful; once a modifier is
     * processed in the keysequence, that key state is toggled until one of the
     * following occurs:
     *
     * - The modifier key is encountered again in the sequence. At this point the
     *   state of the key is toggled (along with the appropriate keyup/down
     * events).
     * - The {@link Key.NULL} key is encountered in the sequence. When
     *   this key is encountered, all modifier keys current in the down state are
     *   released (with accompanying keyup events). The NULL key can be used to
     *   simulate common keyboard shortcuts:
     *
     *         element.sendKeys('text was',
     *                          Key.CONTROL, 'a', Key.NULL,
     *                          'now text is');
     *         // Alternatively:
     *         element.sendKeys('text was',
     *                          Key.chord(Key.CONTROL, 'a'),
     *                          'now text is');
     *
     * - The end of the keysequence is encountered. When there are no more keys
     *   to type, all depressed modifier keys are released (with accompanying
     * keyup events).
     *
     * If this element is a file input ({@code <input type='file'>}), the
     * specified key sequence should specify the path to the file to attach to
     * the element. This is analgous to the user clicking 'Browse...' and entering
     * the path into the file select dialog.
     *
     *     var form = driver.findElement(By.css('form'));
     *     var element = form.findElement(By.css('input[type=file]'));
     *     element.sendKeys('/path/to/file.txt');
     *     form.submit();
     *
     * For uploads to function correctly, the entered path must reference a file
     * on the _browser's_ machine, not the local machine running this script. When
     * running against a remote Selenium server, a {@link FileDetector}
     * may be used to transparently copy files to the remote machine before
     * attempting to upload them in the browser.
     *
     * __Note:__ On browsers where native keyboard events are not supported
     * (e.g. Firefox on OS X), key events will be synthesized. Special
     * punctionation keys will be synthesized according to a standard QWERTY en-us
     * keyboard layout.
     *
     * @param {...(string|!Promise<string>)} var_args The sequence
     *     of keys to type. All arguments will be joined into a single sequence.
     * @return {!Promise.<void>} A promise that will be resolved
     *     when all keys have been typed.
     */
    sendKeys(...args: Array<string | number | Promise<string | number>>): Promise<void>;

    /**
     * Schedules a command to query for the tag/node name of this element.
     * @return {!Promise.<string>} A promise that will be
     *     resolved with the element's tag name.
     */
    getTagName(): Promise<string>;

    /**
     * Schedules a command to query for the computed style of the element
     * represented by this instance. If the element inherits the named style from
     * its parent, the parent will be queried for its value.  Where possible,
     * color values will be converted to their hex representation (e.g. #00ff00
     * instead of rgb(0, 255, 0)).
     *
     * _Warning:_ the value returned will be as the browser interprets it, so
     * it may be tricky to form a proper assertion.
     *
     * @param {string} cssStyleProperty The name of the CSS style property to look
     *     up.
     * @return {!Promise<string>} A promise that will be
     *     resolved with the requested CSS value.
     */
    getCssValue(cssStyleProperty: string): Promise<string>;

    /**
     * Schedules a command to query for the value of the given attribute of the
     * element. Will return the current value, even if it has been modified after
     * the page has been loaded. More exactly, this method will return the value
     * of the given attribute, unless that attribute is not present, in which case
     * the value of the property with the same name is returned. If neither value
     * is set, null is returned (for example, the 'value' property of a textarea
     * element). The 'style' attribute is converted as best can be to a
     * text representation with a trailing semi-colon. The following are deemed to
     * be 'boolean' attributes and will return either 'true' or null:
     *
     * async, autofocus, autoplay, checked, compact, complete, controls, declare,
     * defaultchecked, defaultselected, defer, disabled, draggable, ended,
     * formnovalidate, hidden, indeterminate, iscontenteditable, ismap, itemscope,
     * loop, multiple, muted, nohref, noresize, noshade, novalidate, nowrap, open,
     * paused, pubdate, readonly, required, reversed, scoped, seamless, seeking,
     * selected, spellcheck, truespeed, willvalidate
     *
     * Finally, the following commonly mis-capitalized attribute/property names
     * are evaluated as expected:
     *
     * - 'class'
     * - 'readonly'
     *
     * @param {string} attributeName The name of the attribute to query.
     * @return {!Promise.<?string>} A promise that will be
     *     resolved with the attribute's value. The returned value will always be
     *     either a string or null.
     */
    getAttribute(attributeName: string): Promise<string | null>;

    getDomAttribute(attributeName: string): Promise<string | null>;

    getProperty<T = unknown>(propertyName: string): Promise<T>;

    /**
     * Get the shadow root of the current web element.
     * @returns {!Promise<ShadowRoot>} A promise that will be
     *      resolved with the elements shadow root or rejected
     *      with {@link NoSuchShadowRootError}
     */
    getShadowRoot(): ShadowRootPromise;

    /**
     * Get the visible (i.e. not hidden by CSS) innerText of this element,
     * including sub-elements, without any leading or trailing whitespace.
     * @return {!Promise.<string>} A promise that will be
     *     resolved with the element's visible text.
     */
    getText(): Promise<string>;

    getAriaRole(): Promise<string>;

    getAccessibleName(): Promise<string>;

    /**
     * Returns an object describing an element's location, in pixels relative to
     * the document element, and the element's size in pixels.
     */
    getRect(): Promise<IRectangle>;

    /**
     * Schedules a command to query whether the DOM element represented by this
     * instance is enabled, as dicted by the {@code disabled} attribute.
     * @return {!Promise.<boolean>} A promise that will be
     *     resolved with whether this element is currently enabled.
     */
    isEnabled(): Promise<boolean>;

    /**
     * Schedules a command to query whether this element is selected.
     * @return {!Promise.<boolean>} A promise that will be
     *     resolved with whether this element is currently selected.
     */
    isSelected(): Promise<boolean>;

    /**
     * Schedules a command to submit the form containing this element (or this
     * element if it is a FORM element). This command is a no-op if the element is
     * not contained in a form.
     * @return {!Promise.<void>} A promise that will be resolved
     *     when the form has been submitted.
     */
    submit(): Promise<void>;

    /**
     * Schedules a command to clear the `value` of this element. This command has
     * no effect if the underlying DOM element is neither a text INPUT element
     * nor a TEXTAREA element.
     * @return {!Promise<void>} A promise that will be resolved
     *     when the element has been cleared.
     */
    clear(): Promise<void>;

    /**
     * Schedules a command to test whether this element is currently displayed.
     * @return {!Promise.<boolean>} A promise that will be
     *     resolved with whether this element is currently visible on the page.
     */
    isDisplayed(): Promise<boolean>;

    /**
     * Take a screenshot of the visible region encompassed by this element's
     * bounding rectangle.
     *
     * @param {boolean=} opt_scroll Optional argument that indicates whether the
     *     element should be scrolled into view before taking a screenshot.
     *     Defaults to false.
     * @return {!Promise<string>} A promise that will be
     *     resolved to the screenshot as a base-64 encoded PNG.
     */
    takeScreenshot(): Promise<string>;
}

/**
 * Defines a condition that will result in a {@link WebElement}.
 */
export class WebElementCondition extends Condition<WebElement> { }

/**
 * Implement WebElementPromise
 */
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

/**
 * An interface for managing the current window.
 */
export class Window {
    readonly driver_: WebDriver;
    readonly log_: logging.Logger;

    /**
     * @param {!WebDriver} driver The parent driver.
     */
    constructor(driver: WebDriver);

    /**
     * Returns the current top-level window's size and position.
     */
    getRect(): Promise<IRectangle>;

    /**
     * Sets the current top-level window's size and position. You may update
     * just the size by omitting `x` & `y`, or just the position by omitting
     * `width` & `height` options.
     */
    setRect(options: Partial<IRectangle>): Promise<IRectangle>;

    /**
     * Maximizes the current window. The exact behavior of this command is
     * specific to individual window managers, but typically involves increasing
     * the window to the maximum available size without going full-screen.
     * @return {!Promise} A promise that will be resolved when the
     *     command has completed.
     */
    maximize(): Promise<void>;

    /**
     * Minimizes the current window. The exact behavior of this command is
     * specific to individual window managers, but typically involves hiding
     * the window in the system tray.
     * @return {!Promise} A promise that will be resolved when the
     *     command has completed.
     */
    minimize(): Promise<void>;

    /**
     * Invokes the 'full screen' operation on the current window. The exact
     * behavior of this command is specific to individual window managers, but
     * this will typically increase the window size to the size of the physical
     * display and hide the browser chrome.
     *
     * @return {!Promise<void>} A promise that will be resolved when the command
     *     has completed.
     * @see <https://fullscreen.spec.whatwg.org/#fullscreen-an-element>
     */
    fullscreen(): Promise<void>;

    /**
     * Retrieves the window's current size.
     * @return {!Promise} A promise that will be resolved with the
     *     window's size in the form of a {width:number, height:number} object
     *     literal.
     */
    getSize(windowHandle?: string): Promise<IDimensions>;

    /**
     * Resizes the current window.
     * @param {number} width The desired window width.
     * @param {number} height The desired window height.
     * @return {!Promise} A promise that will be resolved when the
     *     command has completed.
     */
    setSize(options: Partial<IRectangle>, windowHandle?: string): Promise<void>;
}
