import type { WebDriver } from "../lib/webdriver";
import type { BeforeRequestSent, ResponseStarted } from "./networkTypes";

declare function getNetworkInspectorInstance(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<getNetworkInspectorInstance.Instance>;

declare namespace getNetworkInspectorInstance {
    type BeforeRequestSentCallback = (event: BeforeRequestSent) => void;
    type ResponseCallback = (event: ResponseStarted) => void;

    interface Instance {
        beforeRequestSent(callback: BeforeRequestSentCallback): Promise<void>;
        responseStarted(callback: ResponseCallback): Promise<void>;
        responseCompleted(callback: ResponseCallback): Promise<void>;
        authRequired(callback: BeforeRequestSentCallback): Promise<void>;
    }
}

export = getNetworkInspectorInstance;
