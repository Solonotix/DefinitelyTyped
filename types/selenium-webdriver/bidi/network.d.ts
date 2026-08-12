import type { WebDriver } from '../lib/webdriver.js';
import type { AddInterceptParameters } from './addInterceptParameters.js';
import type { ContinueRequestParameters } from './continueRequestParameters.js';
import type { ContinueResponseParameters } from './continueResponseParameters.js';
import type { BeforeRequestSent, FetchError, ResponseStarted } from './networkTypes.js';
import type * as Types from './networkTypes.js';
import type { ProvideResponseParameters } from './provideResponseParameters.js';

export const CacheBehavior: {
    readonly DEFAULT: 'default';
    readonly BYPASS: 'bypass';
};

export type CacheBehavior = (typeof CacheBehavior)[keyof typeof CacheBehavior];

export function Network(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<Network.Instance>;

export namespace Network {
    export type CacheBehavior = import('./network').CacheBehavior;

    export { Types };

    export type BeforeRequestSentCallback = (event: BeforeRequestSent) => void;
    export type ResponseCallback = (event: ResponseStarted) => void;
    export type FetchErrorCallback = (event: FetchError) => void;

    export interface Instance {
        beforeRequestSent(callback: BeforeRequestSentCallback): Promise<void>;
        responseStarted(callback: ResponseCallback): Promise<void>;
        responseCompleted(callback: ResponseCallback): Promise<void>;
        authRequired(callback: ResponseCallback): Promise<number>;
        fetchError(callback: FetchErrorCallback): Promise<void>;
        removeCallback(id: number): void;
        addIntercept(params: AddInterceptParameters): Promise<string>;
        removeIntercept(interceptId: string): Promise<void>;
        continueWithAuth(requestId: string, username: string, password: string): Promise<void>;
        failRequest(requestId: string | number): Promise<void>;
        continueWithAuthNoCredentials(requestId: string): Promise<void>;
        cancelAuth(requestId: string): Promise<void>;
        continueRequest(params: ContinueRequestParameters): Promise<void>;
        continueResponse(params: ContinueResponseParameters): Promise<void>;
        provideResponse(params: ProvideResponseParameters): Promise<void>;
        setCacheBehavior(behavior: CacheBehavior, contexts?: string[] | null): Promise<void>;
        close(): Promise<void>;
    }
}
