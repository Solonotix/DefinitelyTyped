import type { SuggestedString } from '../_internal.js';
import type * as logging from './logging.js';
import type { Config as ProxyConfig } from './proxy.js';
import * as Symbols from './symbols.js';

export type Browser = SuggestedString<'chrome' | 'firefox' | 'internet explorer' | 'MicrosoftEdge' | 'safari'>;
export type Platform = SuggestedString<'linux' | 'mac' | 'windows'>;
export type PageLoadStrategy = SuggestedString<'eager' | 'none' | 'normal'>;
export type UserPromptHandler = SuggestedString<
    'accept' | 'accept and notify' | 'dismiss' | 'dismiss and notify' | 'ignore'
>;
export type Capability = SuggestedString<
    | 'acceptInsecureCerts'
    | 'browserName'
    | 'browserVersion'
    | 'goog:loggingPrefs'
    | 'pageLoadStrategy'
    | 'platformName'
    | 'proxy'
    | 'se:downloadsEnabled'
    | 'setWindowRect'
    | 'strictFileInteractability'
    | 'timeouts'
    | 'unhandledPromptBehavior'
>;

/**
 * Recognized browser names.
 */
export interface IBrowser {
    CHROME: Extract<Browser, 'chrome'>;
    EDGE: Extract<Browser, 'MicrosoftEdge'>;
    FIREFOX: Extract<Browser, 'firefox'>;
    INTERNET_EXPLORER: Extract<Browser, 'internet explorer'>;
    SAFARI: Extract<Browser, 'safari'>;
}

/**
 * Instace of
 */
export const Browser: IBrowser;

/**
 * Common platform names. These platforms are not explicitly defined by the
 * WebDriver spec, however, their use is encouraged for interoperability.
 *
 * @see <https://w3c.github.io/webdriver/webdriver-spec.html>
 */
export interface IPlatform {
    LINUX: Extract<Platform, 'linux'>;
    MAC: Extract<Platform, 'mac'>;
    WINDOWS: Extract<Platform, 'windows'>;
}

export const Platform: IPlatform;

/**
 * Strategies for waiting for [document readiness] after a navigation event.
 *
 * [document readiness]: https://html.spec.whatwg.org/#current-document-readiness
 */
export interface IPageLoadStrategy {
    /**
     * Indicates WebDriver should not wait on the document readiness state after a
     * navigation event.
     */
    NONE: Extract<PageLoadStrategy, 'none'>;

    /**
     * Indicates WebDriver should wait for the document readiness state to
     * become 'interactive' after navigation.
     */
    EAGER: Extract<PageLoadStrategy, 'eager'>;

    /**
     * Indicates WebDriver should wait for the document readiness state to
     * be 'complete' after navigation. This is the default page loading strategy.
     */
    NORMAL: Extract<PageLoadStrategy, 'normal'>;
}

export const PageLoadStrategy: IPageLoadStrategy;

/**
 * The possible default actions a WebDriver session can take to respond to
 * unhandled user prompts (`window.alert()`, `window.confirm()`, and
 * `window.prompt()`).
 */
export interface IUserPromptHandler {
    /** All prompts should be silently accepted. */
    ACCEPT: Extract<UserPromptHandler, 'accept'>;
    /** All prompts should be silently dismissed. */
    DISMISS: Extract<UserPromptHandler, 'dismiss'>;
    /**
     * All prompts should be automatically accepted, but an error should be
     * returned to the next (or currently executing) WebDriver command.
     */
    ACCEPT_AND_NOTIFY: Extract<UserPromptHandler, 'accept and notify'>;
    /**
     * All prompts should be automatically dismissed, but an error should be
     * returned to the next (or currently executing) WebDriver command.
     */
    DISMISS_AND_NOTIFY: Extract<UserPromptHandler, 'dismiss and notify'>;
    /** All prompts should be left unhandled. */
    IGNORE: Extract<UserPromptHandler, 'ignore'>;
}

export const UserPromptHandler: IUserPromptHandler;

/**
 * Common webdriver capability keys.
 */
export interface ICapability {
    /**
     * Indicates whether a WebDriver session implicitly trusts otherwise untrusted
     * and self-signed TLS certificates during navigation.
     */
    ACCEPT_INSECURE_TLS_CERTS: Extract<Capability, 'acceptInsecureCerts'>;

    /**
     * The browser name. Common browser names are defined in the
     * {@link ./capabilities.Browser Browser} enum.
     */
    BROWSER_NAME: Extract<Capability, 'browserName'>;

    /** Identifies the browser version. */
    BROWSER_VERSION: Extract<Capability, 'browserVersion'>;

    /** Enables managed downloads for the session. */
    ENABLE_DOWNLOADS: Extract<Capability, 'se:downloadsEnabled'>;

    /**
     * Key for the logging driver logging preferences.
     */
    LOGGING_PREFS: Extract<Capability, 'goog:loggingPrefs'>;

    /**
     * Defines the session's
     * {@linkplain ./capabilities.PageLoadStrategy page loading strategy}.
     */
    PAGE_LOAD_STRATEGY: Extract<Capability, 'pageLoadStrategy'>;

    /**
     * Identifies the operating system of the endpoint node. Common values
     * recognized by the most WebDriver server implementations are predefined in
     * the {@link ./capabilities.Platform Platform} enum.
     */
    PLATFORM_NAME: Extract<Capability, 'platformName'>;

    /**
     * Describes the proxy configuration to use for a new WebDriver session.
     */
    PROXY: Extract<Capability, 'proxy'>;

    /**
     * Indicates whether the remote end supports all of the window resizing and
     * positioning commands:
     *
     * -  {@linkplain ./webdriver.Window#getRect Window.getRect()}
     * -  {@linkplain ./webdriver.Window#setRect Window.setRect()}
     * -  {@linkplain ./webdriver.Window#maximize Window.maximize()}
     * -  {@linkplain ./webdriver.Window#minimize Window.minimize()}
     * -  {@linkplain ./webdriver.Window#fullscreen Window.fullscreen()}
     */
    SET_WINDOW_RECT: Extract<Capability, 'setWindowRect'>;

    /** Controls strict file interactability checks. */
    STRICT_FILE_INTERACTABILITY: Extract<Capability, 'strictFileInteractability'>;

    /**
     * Describes the {@linkplain ./capabilities.Timeouts timeouts} imposed on
     * certain session operations.
     */
    TIMEOUTS: Extract<Capability, 'timeouts'>;

    /**
     * Defines how a WebDriver session should
     * {@linkplain ./capabilities.UserPromptHandler respond} to unhandled user
     * prompts.
     */
    UNHANDLED_PROMPT_BEHAVIOR: Extract<Capability, 'unhandledPromptBehavior'>;
}

/**
 * The standard WebDriver capability keys.
 */
export const Capability: ICapability;

/**
 * Describes a set of capabilities for a WebDriver session.
 */
export class Capabilities {
    // region Constructors

    /**
     * @param {(Capabilities|Map<string, ?>|Object)=} other Another set of
     *     capabilities to initialize this instance from.
     */
    constructor(other?: Capabilities | Map<string, unknown> | Record<string, unknown>);

    /** The number of capabilities set. */
    get size(): number;

    // endregion

    // region Static Methods

    /**
     * @return {!Capabilities} A basic set of capabilities for Chrome.
     */
    static chrome(): Capabilities;

    /**
     * @return {!Capabilities} A basic set of capabilities for Microsoft Edge.
     */
    static edge(): Capabilities;

    /**
     * @return {!Capabilities} A basic set of capabilities for Firefox.
     */
    static firefox(): Capabilities;

    /**
     * @return {!Capabilities} A basic set of capabilities for
     *     Internet Explorer.
     */
    static ie(): Capabilities;

    /**
     * @return {!Capabilities} A basic set of capabilities for Safari.
     */
    static safari(): Capabilities;

    // endregion

    // region Methods

    /**
     * @return {!Object<string, ?>} The JSON representation of this instance.
     *     Note, the returned object may contain nested promised values.
     * @suppress {checkTypes} Suppress [] access on a struct (state inherited from
     *     Map).
     */
    [Symbols.serialize](): Record<string, unknown>;

    /**
     * @param {string} key The capability to return.
     * @return {*} The capability with the given key, or {@code null} if it has
     *     not been set.
     */
    get<T = unknown>(key: string): T | undefined;

    /**
     * @param {string} key The capability to check.
     * @return {boolean} Whether the specified capability is set.
     */
    has(key: string): boolean;

    /**
     * @return {!Iterator<string>} an iterator of the keys set.
     */
    keys(): IterableIterator<string>;

    /**
     * Merges another set of capabilities into this instance.
     * @param {!(Capabilities|Map<String, ?>|Object<string, ?>)} other The other
     *     set of capabilities to merge.
     * @return {!Capabilities} A self reference.
     */
    merge(other: Capabilities | Map<string, unknown> | Record<string, unknown>): this;

    /**
     * Deletes an entry from this set of capabilities.
     *
     * @param {string} key the capability key to delete.
     */
    delete(key: string): void;

    /**
     * @param {string} key The capability key.
     * @param {*} value The capability value.
     * @return {!Capabilities} A self reference.
     * @throws {TypeError} If the `key` is not a string.
     */
    set(key: string, value: unknown): this;

    /**
     * Sets whether a WebDriver session should implicitly accept self-signed, or
     * other untrusted TLS certificates on navigation.
     *
     * @param {boolean} accept whether to accept insecure certs.
     * @return {!Capabilities} a self reference.
     */
    setAcceptInsecureCerts(accept: boolean): this;

    /**
     * @return {boolean} whether the session is configured to accept insecure
     *     TLS certificates.
     */
    getAcceptInsecureCerts(): boolean | undefined;

    /**
     * Sets the name of the target browser.
     *
     * @param {(Browser|string)} name the browser name.
     * @return {!Capabilities} a self reference.
     */
    setBrowserName(name: Browser): this;

    /**
     * @return {(string|undefined)} the configured browser name, or undefined if
     *     not set.
     */
    getBrowserName(): Browser | undefined;

    /**
     * Sets the desired version of the target browser.
     *
     * @param {string} version the desired version.
     * @return {!Capabilities} a self reference.
     */
    setBrowserVersion(version: string): this;

    /**
     * @return {(string|undefined)} the configured browser version, or undefined
     *     if not set.
     */
    getBrowserVersion(): string | undefined;

    /**
     * Sets the desired page loading strategy for a new WebDriver session.
     *
     * @param {PageLoadStrategy} strategy the desired strategy.
     * @return {!Capabilities} a self reference.
     */
    setPageLoadStrategy(strategy: PageLoadStrategy): this;

    /**
     * Returns the configured page load strategy.
     *
     * @return {(string|undefined)} the page load strategy.
     */
    getPageLoadStrategy(): PageLoadStrategy | undefined;

    /**
     * Sets the target platform.
     *
     * @param {(Platform|string)} platform the target platform.
     * @return {!Capabilities} a self reference.
     */
    setPlatform(platform: Platform): this;

    /**
     * @return {(string|undefined)} the configured platform or undefined if not
     *     set.
     */
    getPlatform(): Platform | undefined;

    /**
     * Sets the logging preferences. Preferences may be specified as a
     * {@link ./logging.Preferences} instance, or as a map of log-type to
     * log-level.
     * @param {!(./logging.Preferences|Object<string>)} prefs The logging
     *     preferences.
     * @return {!Capabilities} A self reference.
     */
    setLoggingPrefs(prefs: logging.Preferences | Record<string, logging.Level | number | string>): this;

    /**
     * Sets the proxy configuration for this instance.
     * @param {proxy.Config} proxy The desired proxy configuration.
     * @return {!Capabilities} A self reference.
     */
    setProxy(proxy: ProxyConfig): this;

    /**
     * @return {(proxy.Config|undefined)} the configured proxy settings, or
     *     undefined if not set.
     */
    getProxy(): ProxyConfig | undefined;

    /**
     * Sets the default action to take with an unexpected alert before returning
     * an error. If unspecified, WebDriver will default to
     * {@link UserPromptHandler.DISMISS_AND_NOTIFY}.
     *
     * @param {?UserPromptHandler} behavior The way WebDriver should respond to
     *     unhandled user prompts.
     * @return {!Capabilities} A self reference.
     */
    setAlertBehavior(behavior: UserPromptHandler | null): this;

    /**
     * @return {(UserPromptHandler|undefined)} the behavior pattern for responding
     *     to unhandled user prompts, or undefined if not set.
     */
    getAlertBehavior(): UserPromptHandler | undefined;

    /** Sets whether strict file interactability checks are enabled. */
    setStrictFileInteractability(strictFileInteractability: boolean): this;

    /** Enables managed downloads for the session. */
    enableDownloads(): this;

    // endregion
}

export interface ITimeouts {
    /**
     * Defines when, in milliseconds, to interrupt a script that is being
     * {@linkplain ./webdriver.IWebDriver#executeScript evaluated}.
     */
    script?: number | undefined;

    /**
     * The timeout, in milliseconds, to apply to navigation events along with the
     * {@link PageLoadStrategy}.
     */
    pageLoad?: number | undefined;

    /**
     * The maximum amount of time, in milliseconds, to spend attempting to
     * {@linkplain ./webdriver.IWebDriver#findElement locate} an element on the
     * current page.
     */
    implicit?: number | undefined;
}

/** Runtime-exported timeout record constructor. */
export class Timeouts implements ITimeouts {
    script?: number | undefined;
    pageLoad?: number | undefined;
    implicit?: number | undefined;
}
