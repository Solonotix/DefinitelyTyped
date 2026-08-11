import { Session } from "../lib/session";
import type { WebDriver } from "../lib/webdriver";
import { EvaluateResultException, EvaluateResultSuccess } from "./evaluateResult";
import { LocalValue, RemoteValue, ResultOwnership } from "./protocolValue";
import { RealmInfo } from "./realmInfo";

type LocalValueJSON = ReturnType<LocalValue["asMap"]>;

declare class ScriptManager {
    constructor(driver: WebDriver);
    _driver: WebDriver;

    init(browsingContextId: string): Promise<void>;

    disownRealmScript(realmId: string, handles: string[]): Promise<void>;

    // TODO: The staged declaration uses boolean sandbox values in several ScriptManager methods, while the
    // 4.46.0 implementation treats sandbox as a string name. Keep the runtime-backed string contract here.
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
        thisParameter?: any,
        resultOwnership?: ResultOwnership | null,
    ): Promise<EvaluateResultSuccess<RemoteValue<unknown>> | EvaluateResultException>;

    callFunctionInBrowsingContext(
        browsingContextId: string,
        functionDeclaration: string,
        awaitPromise: boolean,
        argumentValueList?: LocalValue[] | null,
        thisParameter?: any,
        resultOwnership?: ResultOwnership | null,
        sandbox?: string | null,
    ): Promise<EvaluateResultSuccess<RemoteValue<unknown>> | EvaluateResultException>;

    evaluateFunctionInRealm(
        realmId: string,
        expression: string,
        awaitPromise: boolean,
        resultOwnership?: ResultOwnership | null,
    ): Promise<EvaluateResultSuccess<RemoteValue<unknown>> | EvaluateResultException>;

    evaluateFunctionInBrowsingContext(
        browsingContextId: string,
        expression: string,
        awaitPromise: boolean,
        resultOwnership?: ResultOwnership | null,
        sandbox?: string | null,
    ): Promise<EvaluateResultSuccess<RemoteValue<unknown>> | EvaluateResultException>;

    addPreloadScript(
        functionDeclaration: string,
        argumentValueList?: LocalValue[] | null,
        sandbox?: string | null,
    ): Promise<string>;

    removePreloadScript(script: string): Promise<any>;

    getCallFunctionParams(
        targetType: string,
        id: string,
        sandbox: string | null,
        functionDeclaration: string,
        awaitPromise: boolean,
        argumentValueList?: LocalValue[] | null,
        thisParameter?: any,
        resultOwnership?: ResultOwnership | null,
    ): {
        target: { context?: string; realm?: string; sandbox?: string };
        functionDeclaration: string;
        awaitPromise: boolean;
        arguments: LocalValueJSON[];
        this: any;
        resultOwnership: any;
    };

    getEvaluateParams(
        targetType: string,
        id: string,
        sandbox: string | null,
        expression: string,
        awaitPromise: boolean,
        resultOwnership?: any,
    ): {
        target: {
            context?: string;
            realm?: string;
            sandbox?: string;
        };
        expression: string;
        awaitPromise: boolean;
        resultOwnership?: any;
    };

    createEvaluateResult<T>(
        response: { result: EvaluateResultSuccess<T> | EvaluateResultException },
    ): EvaluateResultSuccess<T> | EvaluateResultException;

    realmInfoMapper(realms: any[]): RealmInfo[];

    getAllRealms(): Promise<RealmInfo[]>;

    getRealmsByType(type: string): Promise<RealmInfo[]>;

    getRealmsInBrowsingContext(browsingContext: any): Promise<RealmInfo[]>;

    getRealmsInBrowsingContextByType(browsingContext: any, type: string): Promise<RealmInfo[]>;
}

// TODO: The existing declaration models the driver as Session and the factory
// as synchronous. The staged declaration and 4.46.0 runtime accept WebDriver
// and return a promise after asynchronous initialization.
declare function getScriptManagerInstance(
    browsingContextId: string | string[],
    driver: WebDriver,
): Promise<ScriptManager>;
declare function getScriptManagerInstance(browsingContextId: string, driver: Session): ScriptManager;

export = getScriptManagerInstance;
