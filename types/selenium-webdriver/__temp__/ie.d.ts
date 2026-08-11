import type { MapOf, SuggestedNumber, SuggestedString } from './_internal.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import type { IWebDriver, WebDriver } from './lib/webdriver.js';
import type { DriverService } from './remote/index.js';

type ScrollBehaviorBottom = 1;
type ScrollBehaviorTop = 0;
export type Behavior = SuggestedNumber<ScrollBehaviorBottom | ScrollBehaviorTop>;
export const Behavior: IScrollBehavior;
export const VENDOR_COMMAND_PREFIX: 'se:ieOptions';
interface IScrollBehavior {
    BOTTOM: ScrollBehaviorBottom;
    TOP: ScrollBehaviorTop;
}

// @ts-expect-error Selenium overrides the static constructor per implementation
export class Driver extends WebDriver implements IWebDriver {
    static createSession<T extends Record<Capability | Key, unknown>>(
        options?: Options<T> | Capabilities<T>,
        service?: DriverService,
    ): Driver;

    setFileDetector(): void;
}

export class Options<
    T extends Record<Capability | Key, unknown> = Record<Capability | Key, unknown>,
> extends Capabilities<T> {
    readonly options_: T;

    constructor(other?: Options<T> | Capabilities<T> | MapOf<T> | T);

    introduceFlakinessByIgnoringProtectedModeSettings(ignoreSettings: boolean): this;

    ignoreZoomSetting(ignore: boolean): this;

    initialBrowserUrl(url: string): this;

    enablePersistentHover(enable: boolean): this;

    enableElementCacheCleanup(enable: boolean): this;

    requireWindowFocus(require: boolean): this;

    browserAttachTimeout(timeout: number): this;

    forceCreateProcessApi(force: boolean): this;

    addBrowserCommandSwitches(...args: Array<string>): this;

    addArguments(...args: Array<string>): this;

    usePerProcessProxy(enable: boolean): this;

    ensureCleanSession(cleanSession: boolean): this;

    setLogFile(file: string): this;

    setLogLevel(level: Level): this;

    setHost(host: string): this;

    setExtractPath(path: string): this;

    silent(silent: boolean): this;

    fileUploadDialogTimeout(timeout: number): this;

    setEdgePath(path: string): this;

    setEdgeChromium(attachEdgeChromium: boolean): this;

    setScrollBehavior(behavior: Behavior): this;
}

type LoggingLevelDebug = 'DEBUG';
type LoggingLevelError = 'ERROR';
type LoggingLevelInfo = 'INFO';
type LoggingLevelFatal = 'FATAL';
type LoggingLevelTrace = 'TRACE';
type LoggingLevelWarn = 'WARN';
export type Level = SuggestedString<
    | LoggingLevelDebug
    | LoggingLevelError
    | LoggingLevelInfo
    | LoggingLevelFatal
    | LoggingLevelTrace
    | LoggingLevelWarn
>;
export const Level: ILevel;
interface ILevel {
    DEBUG: LoggingLevelDebug;
    ERROR: LoggingLevelError;
    INFO: LoggingLevelInfo;
    FATAL: LoggingLevelFatal;
    TRACE: LoggingLevelTrace;
    WARN: LoggingLevelWarn;
}

type InternetExplorerCapabilityKeyAttachToEdgeChromium = 'ie.edgechromium';
type InternetExplorerCapabilityKeyBrowserAttachTimeout = 'browserAttachTimeout';
type InternetExplorerCapabilityKeyBrowserCommandLineSwitches = 'ie.browserCommandLineSwitches';
type InternetExplorerCapabilityKeyEnsureCleanSession = 'ie.ensureCleanSession';
type InternetExplorerCapabilityKeyEdgeExecutablePath = 'ie.edgepath';
type InternetExplorerCapabilityKeyElementScrollBehavior = 'elementScrollBehavior';
type InternetExplorerCapabilityKeyEnableElementCacheCleanup = 'enableElementCacheCleanup';
type InternetExplorerCapabilityKeyEnablePersistentHover = 'enablePersistentHover';
type InternetExplorerCapabilityKeyExtractPath = 'extractPath';
type InternetExplorerCapabilityKeyFileUploadDialogTimeout = 'ie.fileUploadDialogTimeout';
type InternetExplorerCapabilityKeyForceCreateProcess = 'ie.forceCreateProcessApi';
type InternetExplorerCapabilityKeyHost = 'host';
type InternetExplorerCapabilityKeyIgnoreProcessMatch = 'ie.ignoreprocessmatch';
type InternetExplorerCapabilityKeyIgnoreProtectedModeSettings = 'ignoreProtectedModeSettings';
type InternetExplorerCapabilityKeyIgnoreZoomSetting = 'ignoreZoomSetting';
type InternetExplorerCapabilityKeyInitialBrowserUrl = 'initialBrowserUrl';
type InternetExplorerCapabilityKeyLogFile = 'logFile';
type InternetExplorerCapabilityKeyLogLevel = 'logLevel';
type InternetExplorerCapabilityKeyRequireWindowFocus = 'requireWindowFocus';
type InternetExplorerCapabilityKeySilent = 'silent';
type InternetExplorerCapabilityKeyUsePerProcessProxy = 'ie.usePerProcessProxy';
export type Key = SuggestedString<
    | InternetExplorerCapabilityKeyAttachToEdgeChromium
    | InternetExplorerCapabilityKeyBrowserAttachTimeout
    | InternetExplorerCapabilityKeyBrowserCommandLineSwitches
    | InternetExplorerCapabilityKeyEnsureCleanSession
    | InternetExplorerCapabilityKeyEdgeExecutablePath
    | InternetExplorerCapabilityKeyElementScrollBehavior
    | InternetExplorerCapabilityKeyEnableElementCacheCleanup
    | InternetExplorerCapabilityKeyEnablePersistentHover
    | InternetExplorerCapabilityKeyExtractPath
    | InternetExplorerCapabilityKeyFileUploadDialogTimeout
    | InternetExplorerCapabilityKeyForceCreateProcess
    | InternetExplorerCapabilityKeyHost
    | InternetExplorerCapabilityKeyIgnoreProcessMatch
    | InternetExplorerCapabilityKeyIgnoreProtectedModeSettings
    | InternetExplorerCapabilityKeyIgnoreZoomSetting
    | InternetExplorerCapabilityKeyInitialBrowserUrl
    | InternetExplorerCapabilityKeyLogFile
    | InternetExplorerCapabilityKeyLogLevel
    | InternetExplorerCapabilityKeyRequireWindowFocus
    | InternetExplorerCapabilityKeySilent
    | InternetExplorerCapabilityKeyUsePerProcessProxy
>;
export const Key: IInternetExplorerCapabilityKey;
interface IInternetExplorerCapabilityKey {
    ATTACH_TO_EDGE_CHROMIUM: InternetExplorerCapabilityKeyAttachToEdgeChromium;
    BROWSER_ATTACH_TIMEOUT: InternetExplorerCapabilityKeyBrowserAttachTimeout;
    BROWSER_COMMAND_LINE_SWITCHES: InternetExplorerCapabilityKeyBrowserCommandLineSwitches;
    ENSURE_CLEAN_SESSION: InternetExplorerCapabilityKeyEnsureCleanSession;
    EDGE_EXECUTABLE_PATH: InternetExplorerCapabilityKeyEdgeExecutablePath;
    ELEMENT_SCROLL_BEHAVIOR: InternetExplorerCapabilityKeyElementScrollBehavior;
    ENABLE_ELEMENT_CACHE_CLEANUP: InternetExplorerCapabilityKeyEnableElementCacheCleanup;
    ENABLE_PERSISTENT_HOVER: InternetExplorerCapabilityKeyEnablePersistentHover;
    EXTRACT_PATH: InternetExplorerCapabilityKeyExtractPath;
    FILE_UPLOAD_DIALOG_TIMEOUT: InternetExplorerCapabilityKeyFileUploadDialogTimeout;
    FORCE_CREATE_PROCESS: InternetExplorerCapabilityKeyForceCreateProcess;
    HOST: InternetExplorerCapabilityKeyHost;
    IGNORE_PROCESS_MATCH: InternetExplorerCapabilityKeyIgnoreProcessMatch;
    IGNORE_PROTECTED_MODE_SETTINGS: InternetExplorerCapabilityKeyIgnoreProtectedModeSettings;
    IGNORE_ZOOM_SETTING: InternetExplorerCapabilityKeyIgnoreZoomSetting;
    INITIAL_BROWSER_URL: InternetExplorerCapabilityKeyInitialBrowserUrl;
    LOG_FILE: InternetExplorerCapabilityKeyLogFile;
    LOG_LEVEL: InternetExplorerCapabilityKeyLogLevel;
    REQUIRE_WINDOW_FOCUS: InternetExplorerCapabilityKeyRequireWindowFocus;
    SILENT: InternetExplorerCapabilityKeySilent;
    USE_PER_PROCESS_PROXY: InternetExplorerCapabilityKeyUsePerProcessProxy;
}

export class ServiceBuilder extends DriverService.Builder { }
