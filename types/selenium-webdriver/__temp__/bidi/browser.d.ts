import type { WebDriver } from '../lib/webdriver.js';
import type { Bidi, Browser as IBrowser } from './_internal.js';
import { ClientWindowInfo, WindowState } from './clientWindowInfo.js';

declare class Browser implements IBrowser {
    readonly _driver: WebDriver;
    bidi: Bidi;

    constructor(driver: WebDriver);

    createUserContext(): Promise<string>;

    getUserContexts(): Promise<Array<string>>;

    getClientWindows(): Promise<Array<ClientWindowInfo>>;

    removeUserContext(userContext: string): Promise<void>;
}

declare function getBrowserInstance(driver: WebDriver): Promise<Browser>;

declare namespace getBrowserInstance {
    export { IBrowser as Browser, WindowState };
}

export = getBrowserInstance;
