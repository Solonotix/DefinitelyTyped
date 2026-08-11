import type { WebDriver } from '../lib/webdriver.js';
import type { BeforeRequestSent, ResponseStarted } from './networkTypes.js';

declare function NetworkInspector(
    driver: WebDriver,
    browsingContextIds?: Array<string>,
): Promise<NetworkInspector.Instance>;

declare namespace NetworkInspector {
    type Callback<T> = (event: T) => void;

    /** @deprecated Use the `Network` class from `bidi/network.js`. */
    interface Instance {
        beforeRequestSent(callback: Callback<BeforeRequestSent>): Promise<void>;
        responseStarted(callback: Callback<ResponseStarted>): Promise<void>;
        responseCompleted(callback: Callback<ResponseStarted>): Promise<void>;
        authRequired(callback: Callback<null>): Promise<void>;
    }
}

export = NetworkInspector;
