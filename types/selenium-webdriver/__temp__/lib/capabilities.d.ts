import type { MapOf, SuggestedString } from '../_internal.js';
import * as logging from './logging.js';
import * as proxy from './proxy.js';
import * as Symbols from './symbols.js';

export { };

type BrowserChrome = 'chrome';
type BrowserFirefox = 'firefox';
type BrowserInternetExplorer = 'internet explorer';
type BrowserMicrosoftEdge = 'MicrosoftEdge';
type BrowserSafari = 'safari';
export type Browser = SuggestedString<
    | BrowserChrome
    | BrowserFirefox
    | BrowserInternetExplorer
    | BrowserMicrosoftEdge
    | BrowserSafari
>;

interface IBrowser {
    CHROME: BrowserChrome;
    EDGE: BrowserMicrosoftEdge;
    FIREFOX: BrowserFirefox;
    INTERNET_EXPLORER: BrowserInternetExplorer;
    SAFARI: BrowserSafari;
}

export const Browser: IBrowser;

type CapabilityAcceptInsecureCerts = 'acceptInsecureCerts';
type CapabilityBrowserName = 'browserName';
type CapabilityBrowserVersion = 'browserVersion';
type CapabilityGoogleLoggingPreferences = 'goog:loggingPrefs';
type CapabilityPageLoadStrategy = 'pageLoadStrategy';
type CapabilityPlatformName = 'platformName';
type CapabilityProxy = 'proxy';
type CapabilitySeleniumDownloadsEnabled = 'se:downloadsEnabled';
type CapabilitySetWindowRect = 'setWindowRect';
type CapabilityStrictFileInteractability = 'strictFileInteractability';
type CapabilityTimeouts = 'timeouts';
type CapabilityUnhandledPromptBehavior = 'unhandledPromptBehavior';
export type Capability = SuggestedString<
    | CapabilityAcceptInsecureCerts
    | CapabilityBrowserName
    | CapabilityBrowserVersion
    | CapabilityGoogleLoggingPreferences
    | CapabilityPageLoadStrategy
    | CapabilityPlatformName
    | CapabilityProxy
    | CapabilitySeleniumDownloadsEnabled
    | CapabilitySetWindowRect
    | CapabilityStrictFileInteractability
    | CapabilityTimeouts
    | CapabilityUnhandledPromptBehavior
>;

interface ICapability {
    ACCEPT_INSECURE_TLS_CERTS: CapabilityAcceptInsecureCerts;
    BROWSER_NAME: CapabilityBrowserName;
    BROWSER_VERSION: CapabilityBrowserVersion;
    ENABLE_DOWNLOADS: CapabilitySeleniumDownloadsEnabled;
    LOGGING_PREFS: CapabilityGoogleLoggingPreferences;
    PAGE_LOAD_STRATEGY: CapabilityPageLoadStrategy;
    PLATFORM_NAME: CapabilityPlatformName;
    PROXY: CapabilityProxy;
    SET_WINDOW_RECT: CapabilitySetWindowRect;
    STRICT_FILE_INTERACTABILITY: CapabilityStrictFileInteractability;
    TIMEOUTS: CapabilityTimeouts;
    UNHANDLED_PROMPT_BEHAVIOR: CapabilityUnhandledPromptBehavior;
}
export const Capability: ICapability;

export class Capabilities<T extends Record<Capability, unknown> = Record<Capability, unknown>> {
    readonly map_: MapOf<T>;

    constructor(other?: Capabilities<T> | MapOf<T> | T);

    [Symbols.serialize](): Record<Capability, unknown>;

    static chrome<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

    delete<K extends Capability>(key: K): void;

    static edge<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

    enableDownloads(): this;

    static firefox<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

    get<K extends Capability>(key: K): T[K];

    getAcceptInsecureCerts(): boolean | undefined;

    getAlertBehavior(): UserPromptHandler | undefined;

    getBrowserName(): Browser | undefined;

    getBrowserVersion(): string | undefined;

    getPageLoadStrategy(): PageLoadStrategy;

    getPlatform(): Platform | undefined;

    getProxy(): proxy.Config | undefined;

    has<K extends Capability & keyof T>(key: Capability): key is K;

    keys(): IterableIterator<keyof T & string>;

    static ie<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

    merge<U extends T>(other: Capabilities<U> | MapOf<U> | U): this;

    static safari<T extends Record<Capability, unknown> = Record<Capability, unknown>>(): Capabilities<T>;

    set<K extends Capability>(key: K, value: T[K]): this;

    setAcceptInsecureCerts(enabled: boolean): this;

    setAlertBehavior(behavior: UserPromptHandler): this;

    setBrowserName(name: Browser): this;

    setBrowserVersion(version: string): this;

    setLoggingPrefs(prefs: logging.Preferences | Record<string, number | string | logging.Level>): this;

    setPageLoadStrategy(strategy: PageLoadStrategy): this;

    setPlatform(platform: Platform): this;

    setProxy(proxy: proxy.Config): this;

    setStrictFileInteractability(strictFileInteractability: boolean): this;

    get size(): number;
}

type PageLoadStrategyEager = 'eager';
type PageLoadStrategyNone = 'none';
type PageLoadStrategyNormal = 'normal';
export type PageLoadStrategy = SuggestedString<PageLoadStrategyEager | PageLoadStrategyNone | PageLoadStrategyNormal>;
export const PageLoadStrategy: IPageLoadStrategy;
interface IPageLoadStrategy {
    EAGER: PageLoadStrategyEager;
    NONE: PageLoadStrategyNone;
    NORMAL: PageLoadStrategyNormal;
}

type PlatformLinux = 'linux';
type PlatformMac = 'mac';
type PlatformWindows = 'windows';
export type Platform = SuggestedString<PlatformLinux | PlatformMac | PlatformWindows>;
interface IPlatform {
    LINUX: PlatformLinux;
    MAC: PlatformMac;
    WINDOWS: PlatformWindows;
}
export const Platform: IPlatform;

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

type UserPromptAccept = 'accept';
type UserPromptAcceptAndNotify = 'accept and notify';
type UserPromptDismiss = 'dismiss';
type UserPromptDismissAndNotify = 'dismiss and notify';
type UserPromptIgnore = 'ignore';
export type UserPromptHandler = SuggestedString<
    | UserPromptAccept
    | UserPromptAcceptAndNotify
    | UserPromptDismiss
    | UserPromptDismissAndNotify
    | UserPromptIgnore
>;

interface IUserPromptHandler {
    ACCEPT: UserPromptAccept;
    ACCEPT_AND_NOTIFY: UserPromptAcceptAndNotify;
    DISMISS: UserPromptDismiss;
    DISMISS_AND_NOTIFY: UserPromptDismissAndNotify;
    IGNORE: UserPromptIgnore;
}

export const UserPromptHandler: IUserPromptHandler;
