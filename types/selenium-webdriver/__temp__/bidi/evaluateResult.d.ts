import type { ObjectLike, SuggestedString } from '../_internal.js';
import type { ProtocolType } from './protocolType.js';
import type { RemoteValue } from './protocolValue.js';

export { };

/**
 * Represents the type of script evaluation result.
 * Described in https://w3c.github.io/webdriver-bidi/#type-script-EvaluateResult.
 */
type EvaluateResultTypeSuccess = 'success';
type EvaluateResultTypeException = 'exception';
type EvaluateResultType = SuggestedString<EvaluateResultTypeSuccess | EvaluateResultTypeException>;
export const EvaluateResultType: IEvaluateResultType;
export interface IEvaluateResultType {
    SUCCESS: EvaluateResultTypeSuccess;
    EXCEPTION: EvaluateResultTypeException;
}

export interface IEvaluateResult<
    T extends EvaluateResultType = EvaluateResultType,
    P extends ProtocolType = ProtocolType,
    V = unknown,
> {
    readonly exceptionDetails?: ExceptionDetails;
    readonly realmId: string;
    readonly result?: ObjectLike<RemoteValue<P, V>>;
    readonly resultType: T;
}

/**
 * Represents a successful evaluation result.
 */
export class EvaluateResultSuccess<P extends ProtocolType = ProtocolType, V = unknown>
    implements IEvaluateResult<EvaluateResultTypeSuccess, P, V> {
    readonly realmId: string;
    readonly result: RemoteValue<P, V>;
    readonly resultType: EvaluateResultTypeSuccess;

    constructor(realmId: string, value: RemoteValue<P, V>);
}

/**
 * Represents an exception that occurred during evaluation of a result.
 */
export class EvaluateResultException implements IEvaluateResult<EvaluateResultTypeException> {
    readonly exceptionDetails: ExceptionDetails;
    readonly realmId: string;
    readonly resultType: EvaluateResultTypeException;

    constructor(realmId: string, exceptionDetails: ExceptionDetails);
}

/**
 * Represents details of an exception.
 */
export class ExceptionDetails {
    readonly columnNumber: number | null;
    readonly exception: string | null;
    readonly lineNumber: number | null;
    readonly stackTrace: string | null;
    readonly text: string | null;

    constructor(exceptionDetails: Partial<ExceptionDetails>);
}
