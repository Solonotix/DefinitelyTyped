import type { MapOf } from './_internal.js';
import {
    Driver as ChromiumDriver,
    Options as ChromiumOptions,
    ServiceBuilder as ChromiumServiceBuilder,
} from './chromium.js';
import type { Executor as HttpExecutor } from './http/index.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import type { IWebDriver } from './lib/webdriver.js';
import type { DriverService } from './remote/index.js';

export class Driver extends ChromiumDriver implements IWebDriver {
    static createSession<T extends Record<Capability, unknown> = Record<Capability, unknown>>(
        config?: Options<T> | Capabilities<T> | MapOf<T> | T,
        executor?: HttpExecutor | DriverService,
    ): Driver;

    static getDefaultService(): DriverService;
}

export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends ChromiumOptions<T> {
    setChromeBinaryPath(path: string): this;

    androidChrome(): this;

    setChromeLogFile(path: string): this;

    setChromeMinidumpPath(path: string): this;
}

export class ServiceBuilder extends ChromiumServiceBuilder { }
