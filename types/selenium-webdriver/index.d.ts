/// <reference types='node' />

import type { Agent } from 'node:http';

import BrowsingContext = require('./bidi/browsingContext');
import BrowsingContextInspector = require('./bidi/browsingContextInspector');
import LogInspector = require('./bidi/logInspector');
import NetworkInspector = require('./bidi/networkInspector');
import ScriptManager = require('./bidi/scriptManager');
import type * as chrome from './chrome.js';
import type * as edge from './edge.js';
import type * as firefox from './firefox.js';
import type * as ie from './ie.js';
import type { Browser, Capabilities, UserPromptHandler } from './lib/capabilities.js';
import type * as logging from './lib/logging.js';
import type { Config as ProxyConfig } from './lib/proxy.js';
import type { WebDriver } from './lib/webdriver.js';
import type * as safari from './safari.js';

/**
 * Creates new {@link WebDriver WebDriver} instances. The environment
 * variables listed below may be used to override a builder's configuration,
 * allowing quick runtime changes.
 *
 * - {@code SELENIUM_BROWSER}: defines the target browser in the form
 *   {@code browser[:version][:platform]}.
 *
 * - {@code SELENIUM_REMOTE_URL}: defines the remote URL for all builder
 *   instances. This environment variable should be set to a fully qualified
 *   URL for a WebDriver server (e.g. http://localhost:4444/wd/hub). This
 *   option always takes precedence over {@code SELENIUM_SERVER_JAR}.
 *
 * - {@code SELENIUM_SERVER_JAR}: defines the path to the
 *   <a href='http://selenium-release.storage.googleapis.com/index.html'>
 *   standalone Selenium server</a> jar to use. The server will be started the
 *   first time a WebDriver instance and be killed when the process exits.
 *
 * Suppose you had mytest.js that created WebDriver with
 *
 *     var driver = new Builder()
 *         .forBrowser('chrome')
 *         .build();
 *
 * This test could be made to use Firefox on the local machine by running with
 * `SELENIUM_BROWSER=firefox node mytest.js`. Rather than change the code to
 * target Google Chrome on a remote machine, you can simply set the
 * `SELENIUM_BROWSER` and `SELENIUM_REMOTE_URL` environment variables:
 *
 *     SELENIUM_BROWSER=chrome:36:LINUX \
 *     SELENIUM_REMOTE_URL=http://www.example.com:4444/wd/hub \
 *     node mytest.js
 *
 * You could also use a local copy of the standalone Selenium server:
 *
 *     SELENIUM_BROWSER=chrome:36:LINUX \
 *     SELENIUM_SERVER_JAR=/path/to/selenium-server-standalone.jar \
 *     node mytest.js
 */
export class Builder {
    // region Constructors

    /** */
    constructor();

    // endregion

    // region Methods

    /**
     * Configures this builder to ignore any environment variable overrides and to
     * only use the configuration specified through this instance's API.
     *
     * @return {!Builder} A self reference.
     */
    disableEnvironmentOverrides(): this;

    /**
     * Creates a new WebDriver client based on this builder's current
     * configuration.
     *
     * This method will return a {@linkplain ThenableWebDriver} instance, allowing
     * users to issue commands directly without calling `then()`. The returned
     * thenable wraps a promise that will resolve to a concrete
     * {@linkplain webdriver.WebDriver WebDriver} instance. The promise will be
     * rejected if the remote end fails to create a new session.
     *
     * @return {!ThenableWebDriver} A new WebDriver instance.
     * @throws {Error} If the current configuration is invalid.
     */
    build(): ThenableWebDriver;

    /**
     * Configures the target browser for clients created by this instance.
     * Any calls to {@link #withCapabilities} after this function will
     * overwrite these settings.
     *
     * <p>You may also define the target browser using the {@code
     * SELENIUM_BROWSER} environment variable. If set, this environment variable
     * should be of the form {@code browser[:[version][:platform]]}.
     *
     * @param {(string|Browser)} name The name of the target browser;
     *     common defaults are available on the {@link Browser} enum.
     * @param {string=} opt_version A desired version; may be omitted if any
     *     version should be used.
     * @param {string=} opt_platform The desired platform; may be omitted if any
     *     version may be used.
     * @return {!Builder} A self reference.
     */
    forBrowser(name: Browser, opt_version?: string, opt_platform?: string): this;

    /**
     * Returns the base set of capabilities this instance is currently configured
     * to use.
     * @return {!Capabilities} The current capabilities for this builder.
     */
    getCapabilities(): Capabilities;

    /** Sets one desired capability for the requested session. */
    setCapability(key: string, value: unknown): this;

    /**
     * @return {string} The URL of the WebDriver server this instance is
     *     configured to use.
     */
    getServerUrl(): string;

    /**
     * @return {?string} The URL of the proxy server to use for the WebDriver's
     *    HTTP connections, or `null` if not set.
     */
    getWebDriverProxy(): string | null;

    /**
     * Sets the default action to take with an unexpected alert before returning
     * an error.
     * @param {string} beahvior The desired behavior; should be 'accept',
     *     'dismiss', or 'ignore'. Defaults to 'dismiss'.
     * @return {!Builder} A self reference.
     */
    setAlertBehavior(behavior?: UserPromptHandler | null): this;

    /**
     * Sets Chrome-specific options for drivers created by this builder. Any
     * logging or proxy settings defined on the given options will take precedence
     * over those set through {@link #setLoggingPrefs} and {@link #setProxy},
     * respectively.
     *
     * @param {!chrome.Options} options The ChromeDriver options to use.
     * @return {!Builder} A self reference.
     */
    setChromeOptions(options: chrome.Options): this;

    /**
     * @return {chrome.Options} the Chrome specific options currently configured
     *     for this builder.
     */
    getChromeOptions(): chrome.Options | null;

    /**
     * Sets the service builder to use for managing the chromedriver child process
     * when creating new Chrome sessions.
     *
     * @param {chrome.ServiceBuilder} service the service to use.
     * @return {!Builder} A self reference.
     */
    setChromeService(service: chrome.ServiceBuilder): this;

    /**
     * Set {@linkplain edge.Options options} specific to Microsoft's Edge browser
     * for drivers created by this builder. Any proxy settings defined on the
     * given options will take precedence over those set through
     * {@link #setProxy}.
     *
     * @param {!edge.Options} options The MicrosoftEdgeDriver options to use.
     * @return {!Builder} A self reference.
     */
    setEdgeOptions(options: edge.Options): this;

    /**
     * Sets the {@link edge.ServiceBuilder} to use to manage the
     * MicrosoftEdgeDriver child process when creating sessions locally.
     *
     * @param {edge.ServiceBuilder} service the service to use.
     * @return {!Builder} a self reference.
     */
    setEdgeService(service: edge.ServiceBuilder): this;

    /**
     * Sets Firefox-specific options for drivers created by this builder. Any
     * logging or proxy settings defined on the given options will take precedence
     * over those set through {@link #setLoggingPrefs} and {@link #setProxy},
     * respectively.
     *
     * @param {!firefox.Options} options The FirefoxDriver options to use.
     * @return {!Builder} A self reference.
     */
    setFirefoxOptions(options: firefox.Options): this;

    /**
     * @return {firefox.Options} the Firefox specific options currently configured
     *     for this instance.
     */
    getFirefoxOptions(): firefox.Options | null;

    /**
     * Sets the {@link firefox.ServiceBuilder} to use to manage the geckodriver
     * child process when creating Firefox sessions locally.
     *
     * @param {firefox.ServiceBuilder} service the service to use.
     * @return {!Builder} a self reference.
     */
    setFirefoxService(service: firefox.ServiceBuilder): this;

    /**
     * Set Internet Explorer specific {@linkplain ie.Options options} for drivers
     * created by this builder. Any proxy settings defined on the given options
     * will take precedence over those set through {@link #setProxy}.
     *
     * @param {!ie.Options} options The IEDriver options to use.
     * @return {!Builder} A self reference.
     */
    setIeOptions(options: ie.Options): this;

    /**
     * Sets the {@link ie.ServiceBuilder} to use to manage the geckodriver
     * child process when creating IE sessions locally.
     *
     * @param {ie.ServiceBuilder} service the service to use.
     * @return {!Builder} a self reference.
     */
    setIeService(service: ie.ServiceBuilder): this;

    /**
     * Sets the logging preferences for the created session. Preferences may be
     * changed by repeated calls, or by calling {@link #withCapabilities}.
     * @param {!(logging.Preferences|Object.<string, string>)} prefs The
     *     desired logging preferences.
     * @return {!Builder} A self reference.
     */
    setLoggingPrefs(prefs: logging.Preferences | Record<string, string>): this;

    /**
     * Sets the proxy configuration to use for WebDriver clients created by this
     * builder. Any calls to {@link #withCapabilities} after this function will
     * overwrite these settings.
     * @param {!capabilities.ProxyConfig} config The configuration to use.
     * @return {!Builder} A self reference.
     */
    setProxy(config: ProxyConfig): this;

    /**
     * Sets Safari specific {@linkplain safari.Options options} for drivers
     * created by this builder. Any logging settings defined on the given options
     * will take precedence over those set through {@link #setLoggingPrefs}.
     *
     * @param {!safari.Options} options The Safari options to use.
     * @return {!Builder} A self reference.
     */
    setSafariOptions(options: safari.Options): this;

    /**
     * @return {safari.Options} the Safari specific options currently configured
     *     for this instance.
     */
    getSafariOptions(): safari.Options | null;

    /**
     * Sets the http agent to use for each request.
     * If this method is not called, the Builder will use http.globalAgent by
     * default.
     *
     * @param {http.Agent} agent The agent to use for each request.
     * @return {!Builder} A self reference.
     */
    usingHttpAgent(agent: Agent): this;

    /**
     * @return {http.Agent} The http agent used for each request
     */
    getHttpAgent(): Agent | null;

    /**
     * Sets the URL of a remote WebDriver server to use. Once a remote URL has
     * been specified, the builder direct all new clients to that server. If this
     * method is never called, the Builder will attempt to create all clients
     * locally.
     *
     * <p>As an alternative to this method, you may also set the
     * {@code SELENIUM_REMOTE_URL} environment variable.
     *
     * @param {string} url The URL of a remote server to use.
     * @return {!Builder} A self reference.
     */
    usingServer(url: string): this;

    /**
     * Sets the URL of the proxy to use for the WebDriver's HTTP connections.
     * If this method is never called, the Builder will create a connection
     * without a proxy.
     *
     * @param {string} proxy The URL of a proxy to use.
     * @return {!Builder} A self reference.
     */
    usingWebDriverProxy(proxy: string): this;

    /**
     * Sets the desired capabilities when requesting a new session. This will
     * overwrite any previously set capabilities.
     * @param {!(Object|Capabilities)} capabilities The desired
     *     capabilities for a new session.
     * @return {!Builder} A self reference.
     */
    withCapabilities(
        capabilities: Capabilities | Map<string, unknown> | Record<string, unknown>,
    ): this;

    // endregion
}

/**
 * A thenable wrapper around a {@linkplain webdriver.IWebDriver IWebDriver}
 * instance that allows commands to be issued directly instead of having to
 * repeatedly call `then`:
 *
 *     let driver = new Builder().build();
 *     driver.then(d => d.get(url));  // You can do this...
 *     driver.get(url);               // ...or this
 *
 * If the driver instance fails to resolve (e.g. the session cannot be created),
 * every issued command will fail.
 *
 * @interface
 */
export interface ThenableWebDriver extends WebDriver, Promise<WebDriver> { }

export const ThenableWebDriver: {
    readonly prototype: ThenableWebDriver;
    createSession(...args: unknown[]): void;
};

/** The selenium-webdriver package version. */
export const version: string;

export { BrowsingContext, BrowsingContextInspector, LogInspector, NetworkInspector, ScriptManager };
export { By, locateWith, RelativeBy, withTagName } from './lib/by.js';
export type { ByHash, Locator } from './lib/by.js';
export { Browser, Capabilities, Capability } from './lib/capabilities.js';
export type { ITimeouts, UserPromptHandler } from './lib/capabilities.js';
export { Color, Colors } from './lib/color.js';
export * as error from './lib/error.js';
export { Button, FileDetector, Key, Origin } from './lib/input.js';
export * as logging from './lib/logging.js';
export * as promise from './lib/promise.js';
export { Select } from './lib/select.js';
export { Session } from './lib/session.js';
export * as until from './lib/until.js';
export { Condition, WebDriver, WebElement, WebElementCondition, WebElementPromise } from './lib/webdriver.js';
export type {
    Alert,
    AlertPromise,
    ICookie,
    IDimensions,
    ILocation,
    IPrintPageOptions,
    IRectangle,
    ISize,
    IWebDriver,
    IWebDriverOptionsCookie,
    IWebElementId,
    Logs,
    Navigation,
    Options,
    Serializable,
    ShadowRoot,
    ShadowRootPromise,
    TargetLocator,
    Window,
} from './lib/webdriver.js';
