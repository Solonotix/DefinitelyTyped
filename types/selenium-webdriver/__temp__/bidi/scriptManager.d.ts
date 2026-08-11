import type { WebDriver } from '../lib/webdriver.js';
import type { IEvaluateResult } from './evaluateResult.js';
import type { ILocalValueAsMap, LocalValue, RemoteValue, ResultOwnership } from './protocolValue.js';
import type { RealmInfo, RealmType } from './realmInfo.js';
import type { Message } from './scriptTypes.js';

declare function ScriptManager(
    browsingContextIds: string | Array<string> | null,
    driver: WebDriver,
): Promise<ScriptManager.Instance>;

declare namespace ScriptManager {
    type TargetType = 'contextTarget' | 'realm';
    type Event = 'script.message' | 'script.realmCreated' | 'script.realmDestroyed';
    type Callback<T> = (event: T) => void;

    interface ParamsTarget {
        context?: string;
        realm?: string;
        sandbox?: string;
    }

    interface CallFunctionParams {
        arguments?: Array<ILocalValueAsMap>;
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

    interface Instance {
        addCallback(eventType: Event, callback: Callback<unknown>): number;
        removeCallback(id: number): void;
        disownRealmScript(realmId: string, handles: Array<string>): Promise<void>;
        disownBrowsingContextScript(
            browsingContextId: string,
            handles: Array<string>,
            sandbox?: string | null,
        ): Promise<void>;
        callFunctionInRealm(
            realmId: string,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: Array<LocalValue> | null,
            thisParameter?: unknown,
            resultOwnership?: ResultOwnership | null,
        ): Promise<IEvaluateResult>;
        callFunctionInBrowsingContext(
            browsingContextId: string,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: Array<LocalValue> | null,
            thisParameter?: unknown,
            resultOwnership?: ResultOwnership | null,
            sandbox?: string | null,
        ): Promise<IEvaluateResult>;
        evaluateFunctionInRealm(
            realmId: string,
            expression: string,
            awaitPromise: boolean,
            resultOwnership?: ResultOwnership | null,
        ): Promise<IEvaluateResult>;
        evaluateFunctionInBrowsingContext(
            browsingContextId: string,
            expression: string,
            awaitPromise: boolean,
            resultOwnership?: ResultOwnership | null,
            sandbox?: string | null,
        ): Promise<IEvaluateResult>;
        addPreloadScript(
            functionDeclaration: string,
            argumentValueList?: Array<LocalValue>,
            sandbox?: string | null,
        ): Promise<string>;
        removePreloadScript(script: string): Promise<unknown>;
        getCallFunctionParams(
            targetType: TargetType,
            id: string,
            sandbox: string | null,
            functionDeclaration: string,
            awaitPromise: boolean,
            argumentValueList?: Array<LocalValue> | null,
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
        getAllRealms(): Promise<Array<RealmInfo>>;
        getRealmsByType(type: RealmType): Promise<Array<RealmInfo>>;
        getRealmsInBrowsingContext(browsingContext: string): Promise<Array<RealmInfo>>;
        getRealmsInBrowsingContextByType(browsingContext: string, type: RealmType): Promise<Array<RealmInfo>>;
        onMessage(callback: Callback<Message<RemoteValue>>): Promise<number>;
        onRealmCreated(callback: Callback<RealmInfo>): Promise<number>;
        onRealmDestroyed(callback: Callback<RealmInfo | string | null>): Promise<number>;
        close(): Promise<void>;
    }
}

export = ScriptManager;
