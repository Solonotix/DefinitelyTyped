import type { MapOf, SuggestedString } from '../_internal.js';
import * as logging from './logging.js';
import * as proxy from './proxy.js';
import * as Symbols from './symbols.js';

/**
 * Recognized browser names.
 */
export const Browser: Browser.Enum;
export type Browser = SuggestedString<Browser._>;
export namespace Browser {
  export interface Enum {
    readonly CHROME: Chrome;
    readonly EDGE: MicrosoftEdge;
    readonly FIREFOX: Firefox;
    readonly IE: InternetExplorer;
    readonly SAFARI: Safari;
  }

  export type _ = Chrome | Firefox | InternetExplorer | MicrosoftEdge | Safari;
  export type Chrome = 'chrome';
  export type Firefox = 'firefox';
  export type InternetExplorer = 'internet explorer';
  export type MicrosoftEdge = 'MicrosoftEdge';
  export type Safari = 'safari';
}

/**
 * Common webdriver capability keys.
 */
export const Capability: Capability.Enum;
export type Capability = SuggestedString<Capability._>;
export namespace Capability {
  export interface Enum {
    /**
     * Indicates whether a WebDriver session implicitly trusts otherwise untrusted
     * and self-signed TLS certificates during navigation.
     */
    readonly ACCEPT_INSECURE_TLS_CERTS: AcceptInsecureCerts;
    /**
     * The browser name. Common browser names are defined in the
     * {@link ./capabilities.Browser Browser} enum.
     */
    readonly BROWSER_NAME: BrowserName;
    /** Identifies the browser version. */
    readonly BROWSER_VERSION: BrowserVersion;
    readonly ENABLE_DOWNLOADS: EnableDownloads;
    /**
     * Key for the logging driver logging preferences.
     */
    readonly LOGGING_PREFS: LoggingPrefs;
    /**
     * Defines the session's
     * {@linkplain ./capabilities.PageLoadStrategy page loading strategy}.
     */
    readonly PAGE_LOAD_STRATEGY: PageLoadStrategy;
    /**
     * Identifies the operating system of the endpoint node. Common values
     * recognized by the most WebDriver server implementations are predefined in
     * the {@link ./capabilities.Platform Platform} enum.
     */
    readonly PLATFORM_NAME: PlatformName;
    /**
     * Describes the proxy configuration to use for a new WebDriver session.
     */
    readonly PROXY: Proxy;
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
    readonly SET_WINDOW_RECT: SetWindowRect;
    /**
     * Defines the current session’s strict file interactability.
     * Used to upload a file when strict file interactability is on
     */
    readonly STRICT_FILE_INTERACTABILITY: StrictFileInteractability;
    /**
     * Describes the {@linkplain ./capabilities.Timeouts timeouts} imposed on
     * certain session operations.
     */
    readonly TIMEOUTS: Timeouts;
    /**
     * Defines how a WebDriver session should
     * {@linkplain ./capabilities.UserPromptHandler respond} to unhandled user
     * prompts.
     */
    readonly UNHANDLED_PROMPT_BEHAVIOR: UnhandledPromptBehavior;
  }

  export type _ =
    | AcceptInsecureCerts
    | BrowserName
    | BrowserVersion
    | EnableDownloads
    | LoggingPrefs
    | PageLoadStrategy
    | PlatformName
    | Proxy
    | SetWindowRect
    | StrictFileInteractability
    | Timeouts
    | UnhandledPromptBehavior;
  export type AcceptInsecureCerts = 'acceptInsecureCerts';
  export type BrowserName = 'browserName';
  export type BrowserVersion = 'browserVersion';
  export type EnableDownloads = 'se:downloadsEnabled';
  export type LoggingPrefs = 'goog:loggingPrefs';
  export type PageLoadStrategy = 'pageLoadStrategy';
  export type PlatformName = 'platformName';
  export type Proxy = 'proxy';
  export type SetWindowRect = 'setWindowRect';
  export type StrictFileInteractability = 'strictFileInteractability';
  export type Timeouts = 'timeouts';
  export type UnhandledPromptBehavior = 'unhandledPromptBehavior';
}

/**
 * Describes a set of capabilities for a WebDriver session.
 */
export class Capabilities<T extends Record<Capability, unknown> = Record<Capability, unknown>> {
  readonly map_: MapOf<T>;

  /**
   * @param other Another set of capabilities to initialize this instance from.
   */
  constructor(other?: Capabilities<T> | MapOf<T> | T);

  /**
   * @return The JSON representation of this instance. Note, the returned object may contain nested promised values.
   * @suppress {checkTypes} Suppress [] access on a struct (state inherited from Map).
   */
  [Symbols.serialize](): Record<Capability, unknown>;

  /**
   * @return A basic set of capabilities for Chrome.
   */
  static chrome<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

  /**
   * Deletes an entry from this set of capabilities.
   *
   * @param key the capability key to delete.
   */
  delete(key: string): void;

  /**
   * @return A basic set of capabilities for Microsoft Edge.
   */
  static edge<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

  enableDownloads(): this;

  /**
   * @return A basic set of capabilities for Firefox.
   */
  static firefox<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

  /**
   * @param key the parameter key to get.
   * @return the stored parameter value.
   */
  get<K extends string>(key: K): T[K];

  /**
   * @return whether the session is configured to accept insecure TLS certificates.
   */
  getAcceptInsecureCerts(): boolean | undefined;

  /**
   * @return the behavior pattern for responding to unhandled user prompts, or undefined if not set.
   */
  getAlertBehavior(): UserPromptHandler | undefined;

  /**
   * @return the configured browser name, or undefined if not set.
   */
  getBrowserName(): Browser | undefined;

  /**
   * @return the configured browser version, or undefined if not set.
   */
  getBrowserVersion(): string | undefined;

  getLoggingPrefs(): Record<string, number | string | logging.Level> | undefined;

  /**
   * Returns the configured page load strategy.
   *
   * @return the page load strategy.
   */
  getPageLoadStrategy(): PageLoadStrategy | undefined;

  /**
   * @return the configured platform or undefined if not set.
   */
  getPlatform(): Platform | undefined;

  /**
   * @return the configured proxy settings, or undefined if not set.
   */
  getProxy(): proxy.Config | undefined;

  getTimeouts(): ITimeouts | undefined;

  /**
   * @param key the key to test.
   * @return whether this capability set has the specified key.
   */
  has(key: string): boolean;

  /**
   * @return A basic set of capabilities for Internet Explorer.
   */
  static ie<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

  /**
   * @return an iterator of the keys set.
   */
  keys(): Iterator<string>;

  /**
   * Merges another set of capabilities into this instance.
   * @param other The other set of capabilities to merge.
   * @return A self reference.
   */
  merge<U extends T>(other: Capabilities<U> | MapOf<U> | U): this;

  /**
   * @return A basic set of capabilities for Safari.
   */
  static safari<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

  /**
   * @param key The capability key.
   * @param value The capability value.
   * @return A self reference.
   * @throws {TypeError} If the `key` is not a string.
   */
  set<K extends Capability>(key: K, value: T[K]): this;
  set<K extends string>(key: K, value: unknown): this;

  /**
   * Sets whether a WebDriver session should implicitly accept self-signed, or
   * other untrusted TLS certificates on navigation.
   *
   * @param accept whether to accept insecure certs.
   * @return a self reference.
   */
  setAcceptInsecureCerts(accept: boolean): this;

  /**
   * Sets the default action to take with an unexpected alert before returning
   * an error. If unspecified, WebDriver will default to
   * {@link UserPromptHandler.DISMISS_AND_NOTIFY}.
   *
   * @param behavior The way WebDriver should respond to unhandled user prompts.
   * @return A self reference.
   */
  setAlertBehavior(behavior: UserPromptHandler): this;

  /**
   * Sets the name of the target browser.
   *
   * @param name the browser name.
   * @return a self reference.
   */
  setBrowserName(name: Browser): this;

  /**
   * Sets the desired version of the target browser.
   *
   * @param version the desired version.
   * @return a self reference.
   */
  setBrowserVersion(version: string): this;

  /**
   * Sets the logging preferences. Preferences may be specified as a
   * {@link ./logging.Preferences} instance, or as a map of log-type to
   * log-level.
   * @param prefs The logging preferences.
   * @return A self reference.
   */
  setLoggingPrefs(prefs: logging.Preferences | Record<string, number | string | logging.Level>): this;

  /**
   * Sets the desired page loading strategy for a new WebDriver session.
   *
   * @param strategy the desired strategy.
   * @return a self reference.
   */
  setPageLoadStrategy(strategy: PageLoadStrategy): this;

  /**
   * Sets the target platform.
   *
   * @param platform the target platform.
   * @return a self reference.
   */
  setPlatform(platform: Platform): this;

  /**
   * Sets the proxy configuration for this instance.
   * @param proxy The desired proxy configuration.
   * @return A self reference.
   */
  setProxy(proxy: proxy.Config): this;

  /**
   * Sets the boolean flag configuration for this instance.
   */
  setStrictFileInteractability(strictFileInteractability: boolean): this;

  /** @return {number} The number of capabilities set. */
  get size(): number;
}

/**
 * Strategies for waiting for [document readiness] after a navigation event.
 *
 * [document readiness]: https://html.spec.whatwg.org/#current-document-readiness
 */
export const PageLoadStrategy: PageLoadStrategy.Enum;
export type PageLoadStrategy = SuggestedString<PageLoadStrategy._>;
export namespace PageLoadStrategy {
  export interface Enum {
    EAGER: Eager;
    NONE: None;
    NORMAL: Normal;
  }

  export type _ = Eager | None | Normal;
  export type Eager = 'eager';
  export type None = 'none';
  export type Normal = 'normal';
}

/**
 * Common platform names. These platforms are not explicitly defined by the
 * WebDriver spec, however, their use is encouraged for interoperability.
 *
 * @see <https://w3c.github.io/webdriver/webdriver-spec.html>
 */
export const Platform: Platform.Enum;
export type Platform = SuggestedString<Platform._>;
export namespace Platform {
  export interface Enum {
    LINUX: Linux;
    MAC: Mac;
    WINDOWS: Windows;
  }

  export type _ = Linux | Mac | Windows;
  export type Linux = 'linux';
  export type Mac = 'mac';
  export type Windows = 'windows';
}

export interface ITimeouts {
  /**
   * The maximum amount of time, in milliseconds, to spend attempting to
   * {@linkplain ./webdriver.IWebDriver#findElement locate} an element on the
   * current page.
   */
  implicit?: number;
  /**
   * The timeout, in milliseconds, to apply to navigation events along with the
   * {@link PageLoadStrategy}.
   */
  pageLoad?: number;
  /**
   * Defines when, in milliseconds, to interrupt a script that is being
   * {@linkplain ./webdriver.IWebDriver#executeScript evaluated}.
   */
  script?: number;
}

export class Timeouts implements ITimeouts {
  implicit?: number;
  pageLoad?: number;
  script?: number;

  constructor();
}

/**
 * The possible default actions a WebDriver session can take to respond to
 * unhandled user prompts (`window.alert()`, `window.confirm()`, and
 * `window.prompt()`).
 */
export const UserPromptHandler: UserPromptHandler.Enum;
export type UserPromptHandler = SuggestedString<UserPromptHandler._>;
export namespace UserPromptHandler {
  export interface Enum {
    /** All prompts should be silently accepted. */
    ACCEPT: Accept;
    /**
     * All prompts should be automatically accepted, but an error should be
     * returned to the next (or currently executing) WebDriver command.
     */
    ACCEPT_AND_NOTIFY: AcceptAndNotify;
    /** All prompts should be silently dismissed. */
    DISMISS: Dismiss;
    /**
     * All prompts should be automatically dismissed, but an error should be
     * returned to the next (or currently executing) WebDriver command.
     */
    DISMISS_AND_NOTIFY: DismissAndNotify;
    /** All prompts should be left unhandled. */
    IGNORE: Ignore;
  }

  export type _ = Accept | AcceptAndNotify | Dismiss | DismissAndNotify | Ignore;
  export type Accept = 'accept';
  export type AcceptAndNotify = 'accept and notify';
  export type Dismiss = 'dismiss';
  export type DismissAndNotify = 'dismiss and notify';
  export type Ignore = 'ignore';
}
