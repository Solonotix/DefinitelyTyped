import type { Builder } from '../index.js';
import type { Browser, Capabilities, Platform } from '../lib/capabilities.js';
import type { SeleniumServer } from '../remote/index.js';

export interface TargetBrowser {
    capabilities?: Capabilities;
    name: Browser | string;
    platform?: Platform | string;
    version?: string;
}

export class Environment {
    constructor(browser: TargetBrowser, url?: string | SeleniumServer);

    get browser(): TargetBrowser;

    browsers(...browsersToIgnore: Array<Browser | string>): () => boolean;

    builder(): Builder;
}

export interface SuiteOptions {
    browsers?: Array<Browser | TargetBrowser>;
}

export const SuiteOptions: { new(): SuiteOptions };

export function init(force?: boolean): void;

export function suite(fn: (environment: Environment) => void, options?: SuiteOptions): void;

export interface TestHook {
    (...args: Array<unknown>): unknown;
    only: TestHook;
}

export interface IgnoredTestHooks {
    describe: TestHook;
    it: TestHook;
}

export function ignore(predicateFn: () => boolean): IgnoredTestHooks;
