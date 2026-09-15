import type { MapOf } from './_internal.js';
import * as chromium from './chromium.js';
import type * as http from './http/index.js';
import type { Capabilities, Capability } from './lib/capabilities.js';
import type { IWebDriver } from './lib/webdriver.js';
import type * as remote from './remote/index.js';

export import IOptionsValues = chromium.Options.Options;
export import IPerfLoggingPrefs = chromium.Options.PerformanceLoggingPreferences;

export namespace Chrome {
  export class Driver extends chromium.Driver implements IWebDriver {
    /**
     * Creates a new session with the ChromeDriver.
     *
     * @param config The configuration options.
     * @param serviceExecutor Either a DriverService to use for the remote end, or a preconfigured executor
     *     for an externally managed endpoint. If neither is provided, the {@linkplain ##getDefaultService default service}
     *     will be used by default.
     * @return A new driver instance.
     */
    static createSession<T extends Record<Capability, unknown> = Record<Capability, unknown>>(
      config?: Options<T> | Capabilities<T> | MapOf<T> | T,
      executor?: http.Executor | remote.DriverService
    ): Driver;

    /**
     * returns new instance chrome driver service
     * @returns {remote.DriverService}
     */
    static getDefaultService(): remote.DriverService;
  }

  export namespace Options {
    export import Extensions = chromium.Options.Extensions;
    export import LocalState = chromium.Options.LocalState;
    export import Options = chromium.Options.Options;
    export import PerformanceLoggingPreferences = chromium.Options.PerformanceLoggingPreferences;
    export import Preferences = chromium.Options.Preferences;
  }

  export class Options<T extends Record<Capability, unknown> = Record<Capability, unknown>> extends chromium.Options<T> {
    /**
     * Sets the path to the Chrome binary to use. On Mac OS X, this path should
     * reference the actual Chrome executable, not just the application binary
     * (e.g. '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome').
     *
     * The binary path be absolute or relative to the chromedriver server
     * executable, but it must exist on the machine that will launch Chrome.
     *
     * @param path The path to the Chrome binary to use.
     */
    setChromeBinaryPath(path: string): this;

    /**
     * Configures the ChromeDriver to launch Chrome on Android via adb. This
     * function is shorthand for
     * {@link #androidPackage options.androidPackage('com.android.chrome')}.
     */
    androidChrome(): this;

    /**
     * Sets the path to Chrome's log file. This path should exist on the machine
     * that will launch Chrome.
     * @param path Path to the log file to use.
     */
    setChromeLogFile(path: string): this;

    /**
     * Sets the directory to store Chrome minidumps in. This option is only
     * supported when ChromeDriver is running on Linux.
     * @param path The directory path.
     */
    setChromeMinidumpPath(path: string): this;
  }

  export class ServiceBuilder extends chromium.ServiceBuilder {}
}

export import Driver = Chrome.Driver;
export import Options = Chrome.Options;
export import ServiceBuilder = Chrome.ServiceBuilder;
