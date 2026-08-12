import type { Command } from './command.js';

export interface CommandSpec {
    method: string;
    path: string;
}

export interface RequestData {
    [name: string]: unknown;
}

/**
 * Represents a HTTP request message. This class is a 'partial' request and only
 * defines the path on the server to send a request to. It is each client's
 * responsibility to build the full URL for the final request.
 * @final
 */
export class Request<T = RequestData> {
    readonly method: string;
    readonly path: string;
    readonly data: T | undefined;
    readonly headers: Map<string, string>;

    /**
     * @param {string} method The HTTP method to use for the request.
     * @param {string} path The path on the server to send the request to.
     * @param {Object=} opt_data This request's non-serialized JSON payload data.
     */
    constructor(method: string, path: string, data?: T);

    /** @override */
    toString(): string;
}

/**
 * Represents a HTTP response message.
 * @final
 */
export class Response {
    readonly status: number;
    readonly body: string;
    readonly headers: Map<string, string>;

    /**
     * @param {number} status The response code.
     * @param {!Object<string>} headers The response headers. All header names
     *     will be converted to lowercase strings for consistent lookups.
     * @param {string} body The response body.
     */
    constructor(status: number, headers: Record<string, string>, body: string);

    /** @override */
    toString(): string;
}

export class Client {
    send(request: Request): Promise<Response>;
}

/**
 * A command executor that communicates with the server using HTTP + JSON.
 *
 * By default, each instance of this class will use the legacy wire protocol
 * from [Selenium project][json]. The executor will automatically switch to the
 * [W3C wire protocol][w3c] if the remote end returns a compliant response to
 * a new session command.
 *
 * [json]: https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
 * [w3c]: https://w3c.github.io/webdriver/webdriver-spec.html
 */
export class Executor {
    /**
     * @param {!(HttpClient|IThenable<!HttpClient>)} client The client to use for sending
     *     requests to the server, or a promise-like object that will resolve to
     *     to the client.
     */
    constructor(client: Client | PromiseLike<Client>);

    /**
     * Defines a new command for use with this executor. When a command is sent,
     * the {@code path} will be preprocessed using the command's parameters; any
     * path segments prefixed with ':' will be replaced by the parameter of the
     * same name. For example, given '/person/:name' and the parameters
     * '{name: 'Bob'}', the final command path will be '/person/Bob'.
     *
     * @param {string} name The command name.
     * @param {string} method The HTTP method to use when sending this command.
     * @param {string} path The path to send the command to, relative to
     *     the WebDriver server's command root and of the form
     *     '/path/:variable/segment'.
     */
    defineCommand(name: string, method: string, path: string): void;
    /** @override */
    execute<T = unknown>(command: Command): Promise<T>;
}

/**
 * Builds a fully qualified path using the given set of command parameters. Each
 * path segment prefixed with ':' will be replaced by the value of the
 * corresponding parameter. All parameters spliced into the path will be
 * removed from the parameter map.
 * @param {string} path The original resource path.
 * @param {!Object<*>} parameters The parameters object to splice into the path.
 * @return {string} The modified path.
 */
export function buildPath(path: string, parameters: Record<string, unknown>): string;
