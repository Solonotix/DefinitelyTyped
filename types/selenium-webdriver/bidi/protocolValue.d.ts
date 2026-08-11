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
  ProtocolType
} from './protocolType.js';

export {};

type ResultOwnershipNone = 'none';
type ResultOwnershipRoot = 'root';
export type ResultOwnership = SuggestedString<ResultOwnershipNone | ResultOwnershipRoot>;
type RemoteReferenceTypeHandle = 'handle';
type RemoteReferenceTypeSharedId = 'sharedId';
export type RemoteReferenceType = RemoteReferenceTypeHandle | RemoteReferenceTypeSharedId;

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
  value: V;
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

  static getArgument<T, P extends ProtocolType = ProtocolType, V = unknown>(argument: T): LocalValue<P, V>;

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

export interface IRemoteValueRegExpArg extends IRemoteValueArg<NonPrimitiveRegularExpressionType, IRemoteRegExpValue> {}

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
    type: NonPrimitiveRegularExpressionType
  ): RegExpValue;
  deserializeValue(this: RemoteValue<NonPrimitiveObjectType, V>, value: V, type: NonPrimitiveObjectType): EntriesOf<V>;
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

export interface IRemoteReferenceType {
    HANDLE: "handle";
    SHARED_ID: "sharedId";
}

export const RemoteReferenceType: IRemoteReferenceType;

export type ResultOwnership = "none" | "root" | (string & {});

export class ChannelValue {
    readonly channel: string;
    readonly options?: SerializationOptions;
    readonly resultOwnership?: ResultOwnership;

    constructor(channel: string, options?: SerializationOptions, resultOwnership?: ResultOwnership);
}

export interface LocalValueJSON {
    type: string;
    value?: any;
}

export class LocalValue<T = unknown> {
    constructor(type: string, value?: T);
    type: string;
    value: T;

    static createStringValue(value: string): LocalValue<string>;

    static createNumberValue(value: number): LocalValue<number>;

    static createSpecialNumberValue(value: number): LocalValue<number>;

    static createUndefinedValue(): LocalValue<undefined>;

    static createNullValue(): LocalValue<null>;

    static createBooleanValue(value: boolean): LocalValue<boolean>;

    static createBigIntValue(value: BigInt): LocalValue<BigInt>;

    static createArrayValue(value: any[]): LocalValue<any[]>;

    static createDateValue(value: Date): LocalValue<Date>;

    static createMapValue(map: Map<any, any>): LocalValue<Map<any, any>>;

    static createObjectValue(map: Map<any, any>): LocalValue<Map<any, any>>;

    static createRegularExpressionValue(value: RegExp): LocalValue<RegExp>;

    static createSetValue(value: Set<any>): LocalValue<Set<any>>;

    static createChannelValue(value: ChannelValue): LocalValue<ChannelValue>;

    static createReferenceValue(handle: string, sharedId: string): ReferenceValue;

    static getArgument(argument: unknown): LocalValue;

    // TODO: The existing declaration exposed toJson(), while the staged declaration and 4.46.0 runtime expose
    // asMap(). Keep the compatibility member until removal of the non-runtime method is reviewed.
    toJson(): LocalValueJSON;

    asMap(): LocalValueJSON;
}

export interface RemoteValueJSON<T> {
    type?: string;
    handle?: string;
    internalId?: string;
    value?: T;
    sharedId?: string;
}

export type MappedInternalType<T> = T extends Map<any, any> ? ReferenceValue
    : T extends RegExp ? RegExpValue
    : T;

export class RemoteValue<T> {
    constructor(remoteValue: RemoteValueJSON<T>);
    type: string | null;
    handle: string | null;
    internalId: string | null;
    value: MappedInternalType<T> | null;
    sharedId: string | null;
    deserializeValue(value: MappedInternalType<T> | null, type: string): T;
}

export interface ReferenceValueJSON {
    handle?: string;
    sharedId?: string;
}

export class ReferenceValue {
    constructor(handle: string, sharedId: string);
    handle: string | null;
    sharedId?: string | null;
    asMap(): ReferenceValueJSON;
}

export class RegExpValue {
    constructor(pattern: string, flags?: string | null);
    pattern: string;
    flags: string | null;
}

export class SerializationOptions {
    constructor(
        maxDomDepth?: number,
        maxObjectDepth?: number | null,
        includeShadowTree?: string,
    );
    maxDomDepth: number;
    maxObjectDepth: number | null;
    includeShadowTree: string;
}
