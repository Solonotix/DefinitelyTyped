import type { Agent } from 'node:http';
export { Agent } from 'node:http';

import type { Client } from '../lib/http.js';
export type { Executor, Request, Response } from '../lib/http.js';

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

export class HttpClient extends Client {
    readonly agent_: Agent | null;
    readonly client_options: IHttpClientOptions;
    readonly options_: IRequestOptions;
    readonly proxyOptions_: IRequestOptions | null;

    constructor(serverUrl: string, opt_agent?: Agent, opt_proxy?: string, client_options?: IHttpClientOptions);

    get keepAlive(): boolean;

    set keepAlive(value: boolean | string);
}
