import type { TypedFunction } from '../_internal.js';
import type { Command } from './command.js';
import type { Logger } from './logging.js';

export type CommandTransformer<C extends Command, T extends Command> = TypedFunction<T, [C]>;
export interface ICommandSpec {
    method: string;
    path: string;
}

export function buildPath(path: string, parameters: Record<string, string>): string;

export class Client {
    send(request: IRequest): Promise<Response>;
}

export class Executor {
    private customCommands_: Map<string, ICommandSpec> | null;
    readonly log_: Logger;

    constructor(client: Client | Promise<Client>);

    defineCommand(name: string, method: string, path: string): void;
    execute<T>(command: Command): Promise<T>;
}

export interface IRequest<T = unknown> {
    readonly data: T;
    readonly headers: Map<string, string>;
    readonly method: string;
    readonly path: string;
}

export class Request<T = unknown> implements IRequest<T> {
    readonly data: T;
    readonly headers: Map<string, string>;
    readonly method: string;
    readonly path: string;

    constructor(method: string, path: string, opt_data?: T);

    toString(): string;
}

export class Response {
    readonly body: string;
    readonly headers: Map<string, string>;
    readonly status: number;

    constructor(status: number, headers: Record<string, string>, body: string);

    toString(): string;
}
