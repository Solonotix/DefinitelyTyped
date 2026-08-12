import type { WebDriver } from '../lib/webdriver.js';
import type { BeforeRequestSent, ResponseStarted } from './networkTypes.js';

declare function getNetworkInspectorInstance(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<getNetworkInspectorInstance.NetworkInspector>;

declare namespace getNetworkInspectorInstance {
    type BeforeRequestSentCallback = (event: BeforeRequestSent) => void;
    type ResponseCallback = (event: ResponseStarted) => void;

    interface NetworkInspector {
        beforeRequestSent(callback: BeforeRequestSentCallback): Promise<void>;
        responseStarted(callback: ResponseCallback): Promise<void>;
        responseCompleted(callback: ResponseCallback): Promise<void>;
        authRequired(callback: ResponseCallback): Promise<void>;
    }

    /** @deprecated Use {@link NetworkInspector}. */
    type Instance = NetworkInspector;
}

export = getNetworkInspectorInstance;
