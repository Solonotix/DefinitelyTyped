import type { WebDriver } from '../lib/webdriver.js';
import type { Browser as BrowserContract } from './_internal.js';

declare class Browser implements BrowserContract {
    constructor(driver: WebDriver);

    createUserContext(): Promise<string>;
    getUserContexts(): Promise<string[]>;
    removeUserContext(userContext: string): Promise<void>;
    getClientWindows(): ReturnType<BrowserContract['getClientWindows']>;
}

declare function getBrowserInstance(driver: WebDriver): Promise<getBrowserInstance.Browser>;

declare namespace getBrowserInstance {
    export const WindowState: typeof import('./clientWindowInfo').WindowState;

    export { BrowserContract as Browser };

    /** @deprecated Use {@link Browser}. */
    export type Instance = BrowserContract;
}

export = getBrowserInstance;
