import type { Agent } from 'node:http';
export { Agent } from 'node:http';

import type { Client } from '../lib/http.js';
export { Executor, Request, Response } from '../lib/http.js';

export interface IRequestOptions {
    auth?: string;
    hash: null;
    host?: string;
    hostname?: string;
    path?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search: null;
}

export interface IHttpClientOptions {
    'keep-alive'?: boolean;
}

/**
 * A basic HTTP client used to send messages to a remote end.
 */
export class HttpClient extends Client {
    private readonly agent_: Agent | null;
    private readonly client_options: IHttpClientOptions;
    private readonly options_: IRequestOptions;
    private readonly proxyOptions_: IRequestOptions | null;

    /**
     * @param {string} serverUrl URL for the WebDriver server to send commands to.
     * @param {http.Agent=} opt_agent The agent to use for each request.
     *     Defaults to `http.globalAgent`.
     * @param {?string=} opt_proxy The proxy to use for the connection to the
     *     server. Default is to use no proxy.
     */
    constructor(serverUrl: string, opt_agent?: Agent, opt_proxy?: string, client_options?: IHttpClientOptions);

    get keepAlive(): boolean;

    set keepAlive(value: boolean | string);
}
