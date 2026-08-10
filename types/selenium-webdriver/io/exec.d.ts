import type { StdioOptions } from 'node:child_process';

import type { TypedFunction } from '../_internal.js';

export class Command {
  constructor(result: Promise<Result>, onKill: TypedFunction<void, [string]>);

  /**
   * @return {!Promise<!Result>} A promise for the result of this
   *     command.
   */
  result(): Promise<Result>;

  kill(opt_signal?: string): void;
}

export class Options {
  readonly args?: Array<string>;
  readonly env?: NodeJS.ProcessEnv;
  readonly stdio?: StdioOptions;

  constructor();
}

export class Result {
  readonly code?: number;
  readonly signal?: string;

  constructor(code?: number, signal?: string);

  toString(): string;
}

export function exec(command: string, options?: Options): Promise<Result>;
