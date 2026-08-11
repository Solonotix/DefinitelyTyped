import type { Stats } from 'node:fs';
import type { FileOptionsDiscardFd } from 'tmp';

import type { TypedFunction } from '../_internal.js';

export interface IWalkItem {
    dir: boolean;
    path: string;
}

declare function checkedCall<T>(fn: TypedFunction<void, [TypedFunction<void, [unknown, T]>]>): Promise<T>;

export function copy(src: string, dst: string): Promise<string>;

export function copyDir(
    src: string,
    dst: string,
    opt_exclude?: RegExp | TypedFunction<boolean, [string]>,
): Promise<string>;

export function exists(aPath: string): Promise<boolean>;

export function findInPath(file: string, opt_checkCwd?: boolean): string | null;

export function mkdir(aPath: string): Promise<string>;

export function mkdirp(dir: string): Promise<string>;

export function read(aPath: string): Promise<Buffer>;

export function rmDir(dirPath: string): Promise<void>;

export function stat(aPath: string): Promise<Stats>;

export function tmpDir(): Promise<string>;

export function tmpFile(opt_options?: FileOptionsDiscardFd): Promise<string>;

export function unlink(aPath: string): Promise<void>;

export function walkDir(rootPath: string): Promise<Array<IWalkItem>>;

export function write(aPath: string, data: string | Buffer): Promise<void>;
