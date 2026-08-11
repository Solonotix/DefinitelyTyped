import type { WebDriver } from "./webdriver";

declare class Network {
    constructor(driver: WebDriver);

    getAuthCredentials(uri: string): Network.AuthCredentials | null;
    addAuthenticationHandler(username: string, password: string, uri?: string): Promise<number>;
    removeAuthenticationHandler(id: number): Promise<void>;
    clearAuthenticationHandlers(): Promise<void>;
}

declare namespace Network {
    interface AuthCredentials {
        username: string;
        password: string;
        uri: string;
    }
}

export = Network;
