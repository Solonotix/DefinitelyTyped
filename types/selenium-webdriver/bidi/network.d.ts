import type { WebDriver } from "../lib/webdriver";
import type { AddInterceptParameters } from "./addInterceptParameters";
import type { ContinueRequestParameters } from "./continueRequestParameters";
import type { ContinueResponseParameters } from "./continueResponseParameters";
import type { BeforeRequestSent, FetchError, ResponseStarted } from "./networkTypes";
import type { ProvideResponseParameters } from "./provideResponseParameters";

export const CacheBehavior: {
    readonly DEFAULT: "default";
    readonly BYPASS: "bypass";
};

export type CacheBehavior = (typeof CacheBehavior)[keyof typeof CacheBehavior];

export function Network(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<Network.Instance>;

export namespace Network {
    type BeforeRequestSentCallback = (event: BeforeRequestSent) => void;
    type ResponseCallback = (event: ResponseStarted) => void;
    type FetchErrorCallback = (event: FetchError) => void;

    interface Instance {
        beforeRequestSent(callback: BeforeRequestSentCallback): Promise<void>;
        responseStarted(callback: ResponseCallback): Promise<void>;
        responseCompleted(callback: ResponseCallback): Promise<void>;
        authRequired(callback: BeforeRequestSentCallback): Promise<number>;
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
