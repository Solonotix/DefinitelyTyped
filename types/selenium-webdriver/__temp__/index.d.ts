import type * as http from 'node:http';

import type * as ws from 'ws';

import type * as _internal from './_internal.js';
import type * as chrome from './chrome.js';
import type * as edge from './edge.js';
import type * as firefox from './firefox.js';
import type * as ie from './ie.js';
import type * as by from './lib/by.js';
import type * as capabilities from './lib/capabilities.js';
import type { Executor } from './lib/command.js';
import type * as logging from './lib/logging.js';
import type { IWebDriver, WebDriver } from './lib/webdriver.js';
import type * as proxy from './proxy.js';
import type * as safari from './safari.js';
import BrowsingContext = require('./bidi/browsingContext.js');
import BrowsingContextInspector = require('./bidi/browsingContextInspector.js');
import LogInspector = require('./bidi/logInspector.js');
import NetworkInspector = require('./bidi/networkInspector.js');
import ScriptManager = require('./bidi/scriptManager.js');

declare namespace WebSocket {
    // Events
    export type WebSocketCloseHandler = (this: ws.WebSocket, code: number, reason: Buffer) => void;
    export type WebSocketErrorHandler = (this: ws.WebSocket, error: Error) => void;
    export type WebSocketMessageHandler = (this: ws.WebSocket, data: ws.RawData, isBinary: boolean) => void;
    export type WebSocketOpenHandler = (this: ws.WebSocket) => void;
    export type WebSocketPingPongHandler = (this: ws.WebSocket, data: Buffer) => void;
    export type WebSocketRedirectHandler = (this: ws.WebSocket, url: string, request: http.ClientRequest) => void;
    export type WebSocketUnexpectedResponseHandler = (
        this: ws.WebSocket,
        request: http.ClientRequest,
        response: http.IncomingMessage,
    ) => void;
    export type WebSocketUpgradeHandler = (this: ws.WebSocket, request: http.IncomingMessage) => void;

    export interface WebSocket extends ws.WebSocket {
        on(event: 'close', listener: WebSocketCloseHandler): this;
        on(event: 'error', listener: WebSocketErrorHandler): this;
        on(event: 'upgrade', listener: WebSocketUpgradeHandler): this;
        on(event: 'message', listener: WebSocketMessageHandler): this;
        on(event: 'open', listener: WebSocketOpenHandler): this;
        on(event: 'ping' | 'pong', listener: WebSocketPingPongHandler): this;
        on(event: 'redirect', listener: WebSocketRedirectHandler): this;
        on(event: 'unexpected-response', listener: WebSocketUnexpectedResponseHandler): this;
        on(event: string | symbol, listener: (this: WebSocket, ...args: Array<any>) => void): this;
    }
}

export class Builder {
    private agent_: http.Agent | null;
    private capabilities_: capabilities.Capabilities;
    private chromeOptions_: chrome.Options | null;
    private chromeService_: chrome.ServiceBuilder | null;
    private edgeOptions_: edge.Options | null;
    private edgeService_: edge.ServiceBuilder | null;
    private firefoxOptions_: firefox.Options | null;
    private firefoxService_: firefox.ServiceBuilder | null;
    private ieOptions_: ie.Options | null;
    private ieService_: ie.ServiceBuilder | null;
    private ignoreEnv_: boolean;
    private log_: logging.Logger;
    private proxy_: string | null;
    private safariOptions_: safari.Options | null;
    private url_: string;

    constructor();

    disableEnvironmentOverrides(): this;

    usingServer(url: string): this;

    getServerUrl(): string;

    usingWebDriverProxy(proxy: string): this;

    getWebDriverProxy(): string | null;

    usingHttpAgent(agent: http.Agent): this;

    getHttpAgent(): http.Agent | null;

    withCapabilities(capabilities: capabilities.Capabilities): this;

    getCapabilities(): capabilities.Capabilities;

    setCapability(key: string, value: unknown): this;

    forBrowser(name: string, opt_version?: string, opt_platform?: string): this;

    setProxy(config: proxy.Config): this;

    setLoggingPrefs(prefs: logging.Preferences): this;

    setAlertBehavior(behavior: capabilities.UserPromptHandler): this;

    setChromeOptions(options: chrome.Options): this;

    getChromeOptions(): chrome.Options;

    setChromeService(service: chrome.ServiceBuilder): this;

    setFirefoxOptions(options: firefox.Options): this;

    getFirefoxOptions(): firefox.Options;

    setFirefoxService(service: firefox.ServiceBuilder): this;

    setIeOptions(options: ie.Options): this;

    setIeService(service: ie.ServiceBuilder): this;

    setEdgeOptions(options: edge.Options): this;

    setEdgeService(service: edge.ServiceBuilder): this;

    setSafariOptions(options: safari.Options): this;

    getSafariOptions(): safari.Options;

    build(): ThenableWebDriver;
}

export class ThenableWebDriver extends WebDriver implements IWebDriver {
    constructor(session: string, ...rest: Array<unknown>);

    readonly catch: Promise<WebDriver>['catch'];

    static createSession(
        executor: Executor,
        capabilities: capabilities.Capabilities,
        onQuit: CallableFunction,
    ): WebDriver;

    readonly then: Promise<WebDriver>['then'];
}

export const version: string;

export { BrowsingContext, BrowsingContextInspector, LogInspector, NetworkInspector, ScriptManager };
export { By, locateWith, RelativeBy, withTagName } from './lib/by.js';
export { Browser, Capabilities, Capability, ITimeouts, type UserPromptHandler } from './lib/capabilities.js';
export { Color, Colors } from './lib/color.js';
export * as error from './lib/error.js';
export { Button, FileDetector, Key, Origin } from './lib/input.js';
export * as logging from './lib/logging.js';
export * as promise from './lib/promise.js';
export { Select } from './lib/select.js';
export { Session } from './lib/session.js';
export * as until from './lib/until.js';
export { Condition, WebDriver, WebElement, WebElementCondition, WebElementPromise } from './lib/webdriver.js';
export type { Alert, IWebDriverOptionsCookie } from './lib/webdriver.js';
