import type { MapOf } from './_internal.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import type { IWebDriver, WebDriver } from './lib/webdriver.js';
import type { DriverService } from './remote/index.js';

// @ts-expect-error Selenium overrides the static constructor per implementation
export class Driver extends WebDriver implements IWebDriver {
    static createSession<T extends Record<Capability, unknown>>(options: Options<T> | Capabilities<T>): Driver;
}

export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends Capabilities<T> {
    readonly options_: T;

    constructor(other?: Options<T> | Capabilities<T> | MapOf<T> | T);

    enableLogging(): this;

    setTechnologyPreview(useTechnologyPreview: boolean): this;
}

export class ServiceBuilder extends DriverService.Builder { }
