import type { EntriesOf, MapOf, ObjectLike, SuggestedString } from '../_internal.js';

import type {
    NonPrimitiveArrayType,
    NonPrimitiveChannelType,
    NonPrimitiveDateType,
    NonPrimitiveMapType,
    NonPrimitiveObjectType,
    NonPrimitiveRegularExpressionType,
    NonPrimitiveSetType,
    PrimitiveBigIntType,
    PrimitiveBooleanType,
    PrimitiveNullType,
    PrimitiveNumberType,
    PrimitiveSpecialNumberType,
    PrimitiveStringType,
    PrimitiveUndefinedType,
    ProtocolType,
} from './protocolType.js';

export { };

type ResultOwnershipNone = 'none';
type ResultOwnershipRoot = 'root';
export type ResultOwnership = ResultOwnershipNone | ResultOwnershipRoot;
export namespace ResultOwnership {
    type None = ResultOwnershipNone;
    type Root = ResultOwnershipRoot;
}
type RemoteReferenceTypeHandle = 'handle';
type RemoteReferenceTypeSharedId = 'sharedId';
export type RemoteReferenceType = RemoteReferenceTypeHandle | RemoteReferenceTypeSharedId;
export namespace RemoteReferenceType {
    type Handle = RemoteReferenceTypeHandle;
    type SharedId = RemoteReferenceTypeSharedId;
}

export interface IRemoteReferenceType {
    HANDLE: RemoteReferenceTypeHandle;
    SHARED_ID: RemoteReferenceTypeSharedId;
}
export const RemoteReferenceType: IRemoteReferenceType;

export class ChannelValue {
    readonly channel: string;
    readonly options?: SerializationOptions;
    readonly resultOwnership?: ResultOwnership;

    constructor(channel: string, options?: SerializationOptions, resultOwnership?: ResultOwnership);
}

export interface ILocalValueAsMap<T extends ProtocolType = ProtocolType, V = unknown> {
    type: T;
    value?: V;
}

export class LocalValue<T extends ProtocolType = ProtocolType, V = unknown> {
    readonly type: T;
    readonly value: V;

    constructor(type: T, value?: V);

    static createStringValue(value: string): LocalValue<PrimitiveStringType, string>;

    static createNumberValue(value: number): LocalValue<PrimitiveNumberType, number>;

    static createSpecialNumberValue(value: number): LocalValue<PrimitiveSpecialNumberType, number>;

    static createUndefinedValue(): LocalValue<PrimitiveUndefinedType, undefined>;

    static createNullValue(): LocalValue<PrimitiveNullType, undefined>;

    static createBooleanValue(value: boolean): LocalValue<PrimitiveBooleanType, boolean>;

    static createBigIntValue(value: bigint): LocalValue<PrimitiveBigIntType, bigint>;

    static createArrayValue<A extends Array<unknown>>(value: A): LocalValue<NonPrimitiveArrayType, A>;

    static createDateValue(value: string): LocalValue<NonPrimitiveDateType, string>;

    static createMapValue<T>(map: MapOf<T>): LocalValue<NonPrimitiveMapType, EntriesOf<T>>;

    static createObjectValue<T>(object: ObjectLike<T>): LocalValue<NonPrimitiveObjectType, EntriesOf<T>>;

    static createRegularExpressionValue(value: string): LocalValue<NonPrimitiveRegularExpressionType, string>;

    static createSetValue<S extends Set<unknown>>(value: S): LocalValue<NonPrimitiveSetType, S>;

    static createChannelValue<C extends ChannelValue>(value: C): LocalValue<NonPrimitiveChannelType, C>;

    static createReferenceValue(handle: string, sharedId: string): ReferenceValue;

    static getArgument<T, P extends ProtocolType = ProtocolType, V = unknown>(argument: T): LocalValue<P, V> | null;

    asMap(): ILocalValueAsMap<T, V>;
}

export interface IRemoteValueArg<T, V> {
    handle: string;
    internalId: string;
    sharedId: string;
    type: T;
    value: V;
}

export interface IRemoteRegExpValue {
    flags?: string;
    pattern: string;
}

export interface IRemoteValueRegExpArg extends IRemoteValueArg<NonPrimitiveRegularExpressionType, IRemoteRegExpValue> { }

export class RemoteValue<T extends ProtocolType = ProtocolType, V = unknown> {
    handle: string | null;
    internalId: string | null;
    sharedId: string | null;
    type: T | null;
    value: V | null;

    constructor(remoteValue: Partial<RemoteValue<T, V>>);

    deserializeValue(
        this: RemoteValue<NonPrimitiveRegularExpressionType, IRemoteRegExpValue>,
        value: IRemoteRegExpValue,
        type: NonPrimitiveRegularExpressionType,
    ): RegExpValue;
    deserializeValue(
        this: RemoteValue<NonPrimitiveObjectType, V>,
        value: V,
        type: NonPrimitiveObjectType,
    ): EntriesOf<V>;
    deserializeValue(value: V, type?: T): V | EntriesOf<V> | RegExpValue;
}

export interface IReferenceValueAsMap {
    handle?: string;
    sharedId?: string;
}

export class ReferenceValue {
    constructor(handle: string, sharedId: string);

    asMap(): IReferenceValueAsMap;
}

export class RegExpValue {
    flags: string | null;
    pattern: string;

    constructor(pattern: string, flags?: string);
}

type IncludeShadowTree = SuggestedString<'all' | 'none' | 'open'>;

export class SerializationOptions {
    readonly _includeShadowTree: IncludeShadowTree;
    readonly _maxDomDepth: number;
    readonly _maxObjectDepth: number | null;

    constructor(maxDomDepth?: number, maxObjectDepth?: number | null, includeShadowTree?: IncludeShadowTree);
}
