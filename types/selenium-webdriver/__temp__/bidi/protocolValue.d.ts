import type { EntriesOf, MapOf, ObjectLike, SuggestedString } from '../_internal.js';
import { Protocol } from './_internal.js';

import type { ProtocolType } from './protocolType.js';

export import ProtocolValue = Protocol.Value;
export const RemoteReferenceType: ProtocolValue.RemoteReferenceTypeEnum;

export class ChannelValue {
    readonly channel: string;
    readonly options?: SerializationOptions;
    readonly resultOwnership?: ProtocolValue.ResultOwnership;

    constructor(channel: string, options?: SerializationOptions, resultOwnership?: ProtocolValue.ResultOwnership);
}

export class LocalValue<T extends ProtocolType = ProtocolType, V = unknown> {
    readonly type: T;
    readonly value: V;

    constructor(type: T, value?: V);

    static createStringValue(value: string): LocalValue<ProtocolType.Primitive.String, string>;

    static createNumberValue(value: number): LocalValue<ProtocolType.Primitive.Number, number>;

    static createSpecialNumberValue(value: number): LocalValue<ProtocolType.Primitive.SpecialNumber, number>;

    static createUndefinedValue(): LocalValue<ProtocolType.Primitive.Undefined, undefined>;

    static createNullValue(): LocalValue<ProtocolType.Primitive.Null, undefined>;

    static createBooleanValue(value: boolean): LocalValue<ProtocolType.Primitive.Boolean, boolean>;

    static createBigIntValue(value: bigint): LocalValue<ProtocolType.Primitive.BigInt, bigint>;

    static createArrayValue<A extends Array<unknown>>(value: A): LocalValue<ProtocolType.NonPrimitive.Array, A>;

    static createDateValue(value: string): LocalValue<ProtocolType.NonPrimitive.Date, string>;

    static createMapValue<T>(map: MapOf<T>): LocalValue<ProtocolType.NonPrimitive.Map, EntriesOf<T>>;

    static createObjectValue<T>(object: ObjectLike<T>): LocalValue<ProtocolType.NonPrimitive.Object, EntriesOf<T>>;

    static createRegularExpressionValue(value: string): LocalValue<ProtocolType.NonPrimitive.RegularExpression, string>;

    static createSetValue<S extends Set<unknown>>(value: S): LocalValue<ProtocolType.NonPrimitive.Set, S>;

    static createChannelValue<C extends ChannelValue>(value: C): LocalValue<ProtocolType.NonPrimitive.Channel, C>;

    static createReferenceValue(handle: string, sharedId: string): ReferenceValue;

    static getArgument<T, P extends ProtocolType = ProtocolType, V = unknown>(argument: T): LocalValue<P, V>;

    asMap(): MapOf<ProtocolValue.Local<T, V>>;
}

export interface IRemoteRegExpValue {
    flags?: string;
    pattern: string;
}

export interface IRemoteValueRegExpArg extends ProtocolValue.Remote<ProtocolType.NonPrimitive.RegularExpression, IRemoteRegExpValue> { }

export class RemoteValue<T extends ProtocolType = ProtocolType, V = unknown> {
    handle: string | null;
    internalId: string | null;
    sharedId: string | null;
    type: T | null;
    value: V | null;

    constructor(remoteValue: Partial<RemoteValue<T, V>>);

    deserializeValue(
        this: RemoteValue<ProtocolType.NonPrimitive.RegularExpression, IRemoteRegExpValue>,
        value: IRemoteRegExpValue,
        type: ProtocolType.NonPrimitive.RegularExpression,
    ): RegExpValue;
    deserializeValue(
        this: RemoteValue<ProtocolType.NonPrimitive.Object, V>,
        value: V,
        type: ProtocolType.NonPrimitive.Object,
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
    readonly maxDomDepth: number;
    readonly maxObjectDepth: number | null;

    constructor(maxDomDepth?: number, maxObjectDepth?: number | null, includeShadowTree?: IncludeShadowTree);
}
