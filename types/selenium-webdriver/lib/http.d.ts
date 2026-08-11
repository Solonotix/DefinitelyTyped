import type { Command } from "./command";

export interface CommandSpec {
    method: string;
    path: string;
}

export interface RequestData {
    [name: string]: unknown;
}

export class Request<T = RequestData> {
    readonly method: string;
    readonly path: string;
    readonly data: T | undefined;
    readonly headers: Map<string, string>;

    constructor(method: string, path: string, data?: T);

    toString(): string;
}

export class Response {
    readonly status: number;
    readonly body: string;
    readonly headers: Map<string, string>;

    constructor(status: number, headers: Record<string, string>, body: string);

    toString(): string;
}

export class Client {
    send(request: Request): Promise<Response>;
}

export class Executor {
    constructor(client: Client | PromiseLike<Client>);

    defineCommand(name: string, method: string, path: string): void;
    execute(command: Command): Promise<unknown>;
}

export function buildPath(path: string, parameters: Record<string, unknown>): string;
