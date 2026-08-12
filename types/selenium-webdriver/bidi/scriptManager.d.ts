import type { WebDriver } from '../lib/webdriver.js';
import type { EvaluateResultException, EvaluateResultSuccess, ExceptionDetails } from './evaluateResult.js';
import type { ProtocolType } from './protocolType.js';
import type { ILocalValueAsMap, IRemoteValueArg, LocalValue, RemoteValue, ResultOwnership } from './protocolValue.js';
import type { RealmInfo, RealmType } from './realmInfo.js';
import type { Message } from './scriptTypes.js';

declare function getScriptManagerInstance(
    browsingContextIds: string | string[] | null,
    driver: WebDriver,
): Promise<getScriptManagerInstance.ScriptManager>;

declare namespace getScriptManagerInstance {
    type TargetType = 'contextTarget' | 'realm';
    type Event = 'script.message' | 'script.realmCreated' | 'script.realmDestroyed';
    type Callback<T> = (event: T) => void;

    interface ParamsTarget {
        context?: string;
        realm?: string;
        sandbox?: string;
    }

    interface CallFunctionParams {
        arguments?: ILocalValueAsMap[];
        awaitPromise: boolean;
        functionDeclaration: string;
        resultOwnership?: ResultOwnership;
        this?: unknown;
        target: ParamsTarget;
    }

    interface EvaluateParams {
        awaitPromise: boolean;
        expression: string;
        resultOwnership?: ResultOwnership;
        target: ParamsTarget;
    }

    interface EvaluateResultSuccessResponse {
        realm: string;
        result: Partial<IRemoteValueArg<ProtocolType, unknown>>;
        type: 'success';
    }

    interface EvaluateResultExceptionResponse {
        exceptionDetails: Partial<ExceptionDetails>;
        realm: string;
        type: 'exception';
    }

    interface EvaluateResponse {
        result: EvaluateResultSuccessResponse | EvaluateResultExceptionResponse;
    }

    interface ScriptManager {
        init(browsingContextIds: string | string[] | null): Promise<void>;

        addCallback(eventType: Event, callback: Callback<unknown>): number;
        removeCallback(id: number): void;

        disownRealmScript(realmId: string, handles: string[]): Promise<void>;
        disownBrowsingContextScript(
            browsingContextId: string,
            handles: string[],
            sandbox?: string | null,
        ): Promise<void>;

        callFunctionInRealm(
            realmId: string,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: LocalValue[] | null,
            thisParameter?: unknown,
            resultOwnership?: ResultOwnership | null,
        ): Promise<EvaluateResultSuccess | EvaluateResultException>;
        callFunctionInBrowsingContext(
            browsingContextId: string,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: LocalValue[] | null,
            thisParameter?: unknown,
            resultOwnership?: ResultOwnership | null,
            sandbox?: string | null,
        ): Promise<EvaluateResultSuccess | EvaluateResultException>;
        evaluateFunctionInRealm(
            realmId: string,
            expression: string,
            awaitPromise: boolean,
            resultOwnership?: ResultOwnership | null,
        ): Promise<EvaluateResultSuccess | EvaluateResultException>;
        evaluateFunctionInBrowsingContext(
            browsingContextId: string,
            expression: string,
            awaitPromise: boolean,
            resultOwnership?: ResultOwnership | null,
            sandbox?: string | null,
        ): Promise<EvaluateResultSuccess | EvaluateResultException>;

        addPreloadScript(
            functionDeclaration: string,
            argumentValueList?: LocalValue[] | null,
            sandbox?: string | null,
        ): Promise<string>;
        removePreloadScript(script: string): Promise<unknown>;

        getCallFunctionParams(
            targetType: TargetType,
            id: string,
            sandbox: string | null,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: LocalValue[] | null,
            thisParameter?: unknown,
            resultOwnership?: ResultOwnership | null,
        ): CallFunctionParams;
        getEvaluateParams(
            targetType: TargetType,
            id: string,
            sandbox: string | null,
            expression: string,
            awaitPromise: boolean,
            resultOwnership?: ResultOwnership | null,
        ): EvaluateParams;
        createEvaluateResult(response: EvaluateResponse): EvaluateResultSuccess | EvaluateResultException;
        realmInfoMapper(realms: object[]): RealmInfo[];

        getAllRealms(): Promise<RealmInfo[]>;
        getRealmsByType(type: RealmType): Promise<RealmInfo[]>;
        getRealmsInBrowsingContext(browsingContext: string): Promise<RealmInfo[]>;
        getRealmsInBrowsingContextByType(browsingContext: string, type: RealmType): Promise<RealmInfo[]>;

        onMessage(callback: Callback<Message>): Promise<number>;
        onRealmCreated(callback: Callback<RealmInfo>): Promise<number>;
        onRealmDestroyed(callback: Callback<RealmInfo | string | null>): Promise<number>;
        close(): Promise<void>;
    }

    /** @deprecated Use {@link ScriptManager}. */
    type Instance = ScriptManager;
}

export = getScriptManagerInstance;
