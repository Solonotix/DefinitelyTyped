import type { WebDriver } from './webdriver.js';

interface IAuthHandler {
    password: string;
    uri: string;
    username: string;
}

declare class Network {
    constructor(driver: WebDriver);

    getAuthCredentials(uri: string): IAuthHandler | null;

    addAuthenticationHandler(username: string, password: string, uri?: string): Promise<number>;

    removeAuthenticationHandler(id: number): Promise<void>;

    clearAuthenticationHandlers(): void;
}

export = Network;
