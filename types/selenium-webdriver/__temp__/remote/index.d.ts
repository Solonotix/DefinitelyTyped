import type { StdioOptions } from 'node:child_process';

import type { ObjectLike } from '../_internal.js';
import type { Command } from '../io/exec.js';
import type { FileDetector as FileDetectorBase } from '../lib/input.js';
import type { Logger } from '../lib/logging.js';

declare class DriverServiceBuilder {
    readonly exe_: string;
    readonly options_: ObjectLike<ServiceOptions>;

    constructor(exe: string);

    addArguments(...arguments_: Array<string>): this;

    build(): DriverService;

    setEnvironment(env?: null | Map<string, string> | Record<string, string>): this;

    setHostname(hostname: string): this;

    setLoopback(loopback: boolean): this;

    setPath(basePath: string): this;

    setPort(port: number): this;

    setStdio(config: StdioOptions): this;
}

interface DriverServiceBuilderConstructor {
    new(): DriverServiceBuilder;
}

export class DriverService {
    static readonly Builder: DriverServiceBuilderConstructor;
    static readonly DEFAULT_START_TIMEOUT_MS: number;

    readonly address_: Promise<string>;
    readonly args_: Array<string> | Promise<Array<string>>;
    readonly command_: Promise<Command>;
    readonly env_: NodeJS.ProcessEnv & Record<string, string>;
    readonly executable_: string;
    readonly hostname_: string;
    readonly log_: Logger;
    readonly loopbackOnly_: boolean;
    readonly path_: string;
    readonly port_: number | Promise<number>;
    readonly stdio_: StdioOptions;

    constructor(executable: string, options: ServiceOptions);

    address(): Promise<string>;

    getExecutable(): string;

    isRunning(): boolean;

    kill(): Promise<void>;

    setExecutable(value: string): void;

    start(opt_timeoutMs?: number): Promise<string>;
}

export class FileDetector extends FileDetectorBase { }

declare class SeleniumServerOptions {
    readonly args: Array<string> | Promise<Array<string>>;
    readonly env: NodeJS.ProcessEnv & Record<string, string>;
    readonly jvmArgs: Array<string> | Promise<Array<string>>;
    readonly loopback?: boolean;
    readonly port: number | Promise<number>;
    readonly stdio?: StdioOptions;
}

interface SeleniumServerOptionsConstructor {
    new(): SeleniumServerOptions;
}

export class SeleniumServer extends DriverService {
    static readonly Options: SeleniumServerOptionsConstructor;

    constructor(jar: string, opt_options?: Partial<SeleniumServerOptions>);
}

export interface IServiceOptions {
    args: Array<string> | Promise<Array<string>>;
    env: NodeJS.ProcessEnv & Record<string, string>;
    loopback?: boolean;
    path?: string | null;
    port: number | Promise<number>;
    stdio: StdioOptions;
}

export class ServiceOptions implements IServiceOptions {
    readonly args: Array<string> | Promise<Array<string>>;
    readonly env: NodeJS.ProcessEnv & Record<string, string>;
    readonly loopback?: boolean;
    readonly path?: string | null;
    readonly port: number | Promise<number>;
    readonly stdio: StdioOptions;

    constructor();
}
