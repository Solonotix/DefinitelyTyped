import type { MapOf, SuggestedString } from './_internal.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import type { Executor as HttpExecutor } from './lib/http.js';
import * as Symbols from './lib/symbols.js';
import { IDimensions, IWebDriver, WebDriver } from './lib/webdriver.js';
import { DriverService } from './remote/index.js';

export class Channel {
    readonly darwin_: string;
    private found_: Promise<string>;
    readonly win32_: string;

    static readonly BETA: Channel;
    static readonly DEV: Channel;
    static readonly NIGHTLY: Channel;
    static readonly RELEASE: Channel;

    constructor(darwin: string, win32: string);

    locate(): Promise<string>;

    [Symbols.serialize](): Promise<string>;
}

type ContextChrome = 'chrome';
type ContextContent = 'content';
export type Context = SuggestedString<ContextChrome | ContextContent>;
export const Context: IContext;
interface IContext {
    CHROME: ContextChrome;
    CONTENT: ContextContent;
}

// @ts-expect-error Selenium overrides the static constructor per implementation
export class Driver extends WebDriver implements IWebDriver {
    static createSession<T extends Record<Capability, unknown> = Record<Capability, unknown>>(
        config?: Options<T> | Capabilities<T> | MapOf<T> | T,
        executor?: HttpExecutor | DriverService,
    ): Driver;

    getContext(): Promise<Context>;

    installAddon(path: string, temporary?: boolean): Promise<string>;

    setContext(context: Context): Promise<void>;

    setFileDetector(): void;

    takeFullPageScreenshot(): Promise<string>;

    uninstallAddon(id: string | Promise<string>): Promise<void>;
}

export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends Capabilities<T> {
    constructor(other?: Options<T> | Capabilities<T> | MapOf<T> | T);

    firefoxOptions_(): T;

    profile_(): Profile;

    addArguments(...args: Array<string>): this;

    windowSize(size: IDimensions): this;

    addExtensions(...paths: Array<string>): this;

    setPreference(key: string, value: string | number | boolean): this;

    setProfile(profile: string): this;

    setBinary(binary: string): this;

    enableMobile(androidPackage?: string, androidActivity?: string, deviceSerial?: string): this;

    enableDebugger(): this;

    enableBidi(): this;
}

declare class Profile {
    readonly extensions_: Array<string>;
    private template_: string | null;

    constructor();

    [Symbols.serialize](): Promise<string> | undefined;
}

export class ServiceBuilder extends DriverService.Builder {
    constructor(opt_exe: string);

    enableVerboseLogging(opt_trace?: boolean): this;

    build(): DriverService;
}
