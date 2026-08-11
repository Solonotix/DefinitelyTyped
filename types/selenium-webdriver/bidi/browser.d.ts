import type { WebDriver } from "../lib/webdriver";
import type { ClientWindowInfo } from "./clientWindowInfo";

declare function getBrowserInstance(driver: WebDriver): Promise<getBrowserInstance.Instance>;

declare namespace getBrowserInstance {
    const WindowState: typeof import("./clientWindowInfo").WindowState;

    interface Instance {
        createUserContext(): Promise<string>;
        getUserContexts(): Promise<string[]>;
        removeUserContext(userContext: string): Promise<void>;
        getClientWindows(): Promise<ClientWindowInfo[]>;
    }
}

export = getBrowserInstance;
