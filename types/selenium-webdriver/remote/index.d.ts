import type { StdioOptions } from 'node:child_process';

import type * as _ from '../_internal.js';
import type * as exec from '../io/exec.js';
import type * as input from '../lib/input.js';
import type * as logging from '../lib/logging.js';

export {};
export namespace Remote {
  export { DriverService, FileDetector, SeleniumServer, ServiceOptions };
  type CommandLineFlag = string | PromiseLike<string>;
}

declare class DriverServiceBuilder {
  readonly exe_: string;
  readonly options_: _.ObjectLike<ServiceOptions>;

  /**
   * @param exe Path to the executable to use. This executable must accept the `--port` flag for defining the port to start the server on.
   * @throws {Error} If the provided executable path does not exist.
   */
  constructor(exe: string);

  /**
   * Define additional command line arguments to use when starting the server.
   *
   * @param var_args The arguments to include.
   * @return A self reference.
   */
  addArguments(...var_args: Array<string>): this;

  build(): DriverService;

  setEnvironment(env?: null | Map<string, string> | Record<string, string>): this;

  /**
   * Sets the host name to access the server on. If specified, the {@linkplain #setLoopback() loopback} setting will be ignored.
   *
   * @param hostname
   * @return A self reference.
   */
  setHostname(hostname: string): this;

  setLoopback(loopback: boolean): this;

  setPath(basePath: string): this;

  setPort(port: number): this;

  setStdio(config: StdioOptions): this;
}

/**
 * Manages the life and death of a native executable WebDriver server.
 *
 * It is expected that the driver server implements the
 * https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol.
 * Furthermore, the managed server should support multiple concurrent sessions,
 * so that this class may be reused for multiple clients.
 */
export class DriverService {
  static readonly Builder: typeof DriverServiceBuilder;
  static readonly DEFAULT_START_TIMEOUT_MS: number;

  address_: Promise<string>;
  readonly args_: Array<string> | Promise<Array<string>>;
  command_: Promise<exec.Command>;
  readonly env_: NodeJS.ProcessEnv & Record<string, string>;
  executable_: string;
  readonly hostname_: string;
  readonly log_: logging.Logger;
  readonly loopbackOnly_: boolean;
  readonly path_: string;
  readonly port_: number | Promise<number>;
  readonly stdio_: StdioOptions;

  /**
     * @param executable Path to the executable to run.
     * @param options Configuration options for the service.
     */
  constructor(executable: string, options: IServiceOptions);

  /**
     * @return A promise that resolves to the server's address.
     * @throws {Error} If the server has not been started.
     */
  address(): Promise<string>;

  getExecutable(): string;

  /**
   * Returns whether the underlying process is still running. This does not take
   * into account whether the process is in the process of shutting down.
   * @return Whether the underlying service process is running.
   */
  isRunning(): boolean;

  /**
   * Stops the service if it is not currently running. This function will kill the server immediately. 
   * To synchronize with the active control flow, use {@link #stop()}.
   * @return A promise that will be resolved when the server has been stopped.
   */
  kill(): Promise<void>;

  setExecutable(value: string): void;

  /**
   * Starts the server if it is not already running.
   * @param opt_timeoutMs How long to wait, in milliseconds, for the server to start accepting requests. Defaults to 30 seconds.
   * @return A promise that will resolve to the server's base URL when it has started accepting requests. If the
   *     timeout expires before the server has started, the promise will be rejected.
   */
  start(opt_timeoutMs?: number): Promise<string>;
}

export class FileDetector extends input.FileDetector {}

declare class SeleniumServerOptions {
  readonly args: Array<string> | Promise<Array<string>>;
  readonly env: NodeJS.ProcessEnv & Record<string, string>;
  readonly jvmArgs: Array<string> | Promise<Array<string>>;
  readonly loopback?: boolean;
  readonly port: number | Promise<number>;
  readonly stdio?: StdioOptions;
}

interface SeleniumServerOptionsConstructor {
  new (): SeleniumServerOptions;
}

export class SeleniumServer extends DriverService {
  static readonly Options: SeleniumServerOptionsConstructor;

  constructor(jar: string, opt_options?: Partial<SeleniumServerOptions>);
}

/**
 * A record object that defines the configuration options for a DriverService
 * instance.
 *
 * @record
 */
export interface IServiceOptions {
  args: Array<string> | Promise<Array<string>>;
  env: NodeJS.ProcessEnv & Record<string, string>;
  loopback?: boolean;
  path?: string | null;
  port: number | Promise<number>;
  stdio: StdioOptions;
}

/**
 * A record object that defines the configuration options for a DriverService
 * instance.
 *
 * @record
 */
export class ServiceOptions implements IServiceOptions {
  readonly args: Array<string> | Promise<Array<string>>;
  readonly env: NodeJS.ProcessEnv & Record<string, string>;
  readonly loopback?: boolean;
  readonly path?: string | null;
  readonly port: number | Promise<number>;
  readonly stdio: StdioOptions;

  constructor();
}
