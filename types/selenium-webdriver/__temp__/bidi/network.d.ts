import type { WebDriver } from '../lib/webdriver.js';
import type { Network as BidiNetwork } from './_internal.js';
import type { AddInterceptParameters } from './addInterceptParameters.js';
import type { ContinueRequestParameters } from './continueRequestParameters.js';
import type { ContinueResponseParameters } from './continueResponseParameters.js';
import type { BeforeRequestSent, FetchError, ResponseStarted } from './networkTypes.js';
import type { ProvideResponseParameters } from './provideResponseParameters.js';

declare class Network {
    addCallback(eventType: BidiNetwork.Event.BeforeRequestSent, callback: (event: BeforeRequestSent) => void): number;
    addCallback(
        eventType: BidiNetwork.Event.AuthRequired | BidiNetwork.Event.ResponseCompleted | BidiNetwork.Event.ResponseStarted,
        callback: (event: ResponseStarted) => void,
    ): number;
    addCallback(eventType: BidiNetwork.Event.FetchError, callback: (event: FetchError) => void): number;
    removeCallback(id: number): void;

    beforeRequestSent(callback: (event: BeforeRequestSent) => void): Promise<void>;
    responseStarted(callback: (event: ResponseStarted) => void): Promise<void>;
    responseCompleted(callback: (event: ResponseStarted) => void): Promise<void>;
    authRequired(callback: (event: ResponseStarted) => void): Promise<number>;
    fetchError(callback: (event: FetchError) => void): Promise<void>;

    addIntercept(params: AddInterceptParameters): Promise<string>;
    removeIntercept(interceptId: string): Promise<void>;
    continueWithAuth(requestId: string, username: string, password: string): Promise<void>;
    failRequest(requestId: string): Promise<void>;
    continueWithAuthNoCredentials(requestId: string): Promise<void>;
    cancelAuth(requestId: string): Promise<void>;
    continueRequest(params: ContinueRequestParameters): Promise<void>;
    continueResponse(params: ContinueResponseParameters): Promise<void>;
    provideResponse(params: ProvideResponseParameters): Promise<void>;
    setCacheBehavior(behavior: BidiNetwork.CacheBehavior, contexts?: Array<string> | null): Promise<void>;
    close(): Promise<void>;
}

declare function getNetworkInstance(driver: WebDriver, browsingContextIds?: Array<string> | null): Promise<Network>;
declare const exports: {
    CacheBehavior: BidiNetwork.CacheBehaviorEnum,
    Network: typeof getNetworkInstance
};

declare namespace exports {

}

export = exports;
