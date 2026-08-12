import { Capabilities } from './lib/capabilities.js';
import { WebDriver } from './lib/webdriver.js';
import * as remote from './remote/index.js';

/**
 * Creates {@link selenium-webdriver/remote.DriverService} instances that manage
 * a [safaridriver] server in a child process.
 *
 * [safaridriver]: https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28
 */
export class ServiceBuilder extends remote.DriverService.Builder {
    /**
     * @param {string=} opt_exe Path to the server executable to use. If omitted,
     *     the builder will attempt to locate the safaridriver on the system PATH.
     */
    constructor(opt_exe: string);
}

/**
 * Configuration options specific to the {@link Driver SafariDriver}.
 */
export class Options extends Capabilities {
    /**
     * @param {(Capabilities|Map<string, ?>|Object)=} other Another set of
     *     capabilities to initialize this instance from.
     */
    constructor(other?: Capabilities | Map<string, unknown> | Record<string, unknown>);

    /**
     * Instruct the SafariDriver to use the Safari Technology Preview if true.
     * Otherwise, use the release version of Safari. Defaults to using the release version of Safari.
     *
     * @param {boolean} useTechnologyPreview
     * @return {!Options} A self reference.
     */
    setTechnologyPreview(useTechnologyPreview: boolean): this;

    /** Enables Safari diagnostic logging. */
    enableLogging(): this;
}

/**
 * A WebDriver client for Safari. This class should never be instantiated
 * directly; instead, use the {@linkplain ./builder.Builder Builder}:
 *
 *     var driver = new Builder()
 *         .forBrowser('safari')
 *         .build();
 */
export class Driver extends WebDriver {
    /**
     * Creates a new Safari session.
     *
     * @param {(Options|Capabilities)=} options The configuration options.
     * @return {!Driver} A new driver instance.
     */
    static createSession(options?: Options | Capabilities): Driver;
}
