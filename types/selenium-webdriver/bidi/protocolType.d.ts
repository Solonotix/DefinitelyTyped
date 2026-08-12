import type { SuggestedString } from '../_internal.js';

export type PrimitiveUndefinedType = 'undefined';
export type PrimitiveNullType = 'null';
export type PrimitiveStringType = 'string';
export type PrimitiveNumberType = 'number';
export type PrimitiveSpecialNumberType = 'number';
export type PrimitiveBooleanType = 'boolean';
export type PrimitiveBigIntType = 'bigint';
export type NonPrimitiveArrayType = 'array';
export type NonPrimitiveDateType = 'date';
export type NonPrimitiveMapType = 'map';
export type NonPrimitiveObjectType = 'object';
export type NonPrimitiveRegularExpressionType = 'regexp';
export type NonPrimitiveSetType = 'set';
export type NonPrimitiveChannelType = 'channel';
export type RemoteSymbolType = 'symbol';
export type RemoteFunctionType = 'function';
export type RemoteWeakMapType = 'weakmap';
export type RemoteWeakSetType = 'weakset';
export type RemoteIteratorType = 'iterator';
export type RemoteGeneratorType = 'generator';
export type RemoteErrorType = 'error';
export type RemoteProxyType = 'proxy';
export type RemotePromiseType = 'promise';
export type RemoteTypedArrayType = 'typedarray';
export type RemoteArrayBufferType = 'arraybuffer';
export type RemoteNodeListType = 'nodelist';
export type RemoteHtmlCollectionType = 'htmlcollection';
export type RemoteNodeType = 'node';
export type RemoteWindowType = 'window';
export type SpecialNumberNanType = 'NaN';
export type SpecialNumberMinusZeroType = '-0';
export type SpecialNumberInfinityType = 'Infinity';
export type SpecialNumberMinusInfinityType = '-Infinity';

export interface IPrimitiveType {
    UNDEFINED: PrimitiveUndefinedType;
    NULL: PrimitiveNullType;
    STRING: PrimitiveStringType;
    NUMBER: PrimitiveNumberType;
    SPECIAL_NUMBER: PrimitiveSpecialNumberType;
    BOOLEAN: PrimitiveBooleanType;
    BIGINT: PrimitiveBigIntType;

    findByName(name: string): PrimitiveType | null;
}

export interface INonPrimitiveType {
    ARRAY: NonPrimitiveArrayType;
    DATE: NonPrimitiveDateType;
    MAP: NonPrimitiveMapType;
    OBJECT: NonPrimitiveObjectType;
    REGEXP: NonPrimitiveRegularExpressionType;
    SET: NonPrimitiveSetType;
    CHANNEL: NonPrimitiveChannelType;

    findByName(name: string): NonPrimitiveType | null;
}

export interface IRemoteType {
    SYMBOL: RemoteSymbolType;
    FUNCTION: RemoteFunctionType;
    WEAK_MAP: RemoteWeakMapType;
    WEAK_SET: RemoteWeakSetType;
    ITERATOR: RemoteIteratorType;
    GENERATOR: RemoteGeneratorType;
    ERROR: RemoteErrorType;
    PROXY: RemoteProxyType;
    PROMISE: RemotePromiseType;
    TYPED_ARRAY: RemoteTypedArrayType;
    ARRAY_BUFFER: RemoteArrayBufferType;
    NODE_LIST: RemoteNodeListType;
    HTML_COLLECTION: RemoteHtmlCollectionType;
    NODE: RemoteNodeType;
    WINDOW: RemoteWindowType;

    findByName(name: string): RemoteType | null;
}

export interface ISpecialNumberType {
    NAN: SpecialNumberNanType;
    MINUS_ZERO: SpecialNumberMinusZeroType;
    INFINITY: SpecialNumberInfinityType;
    MINUS_INFINITY: SpecialNumberMinusInfinityType;

    findByName(name: string): SpecialNumberType | null;
}

export type PrimitiveType = SuggestedString<
    | PrimitiveUndefinedType
    | PrimitiveNullType
    | PrimitiveStringType
    | PrimitiveNumberType
    | PrimitiveSpecialNumberType
    | PrimitiveBooleanType
    | PrimitiveBigIntType
>;

export type NonPrimitiveType = SuggestedString<
    | NonPrimitiveArrayType
    | NonPrimitiveDateType
    | NonPrimitiveMapType
    | NonPrimitiveObjectType
    | NonPrimitiveRegularExpressionType
    | NonPrimitiveSetType
    | NonPrimitiveChannelType
>;

export type RemoteType = SuggestedString<
    | RemoteSymbolType
    | RemoteFunctionType
    | RemoteWeakMapType
    | RemoteWeakSetType
    | RemoteIteratorType
    | RemoteGeneratorType
    | RemoteErrorType
    | RemoteProxyType
    | RemotePromiseType
    | RemoteTypedArrayType
    | RemoteArrayBufferType
    | RemoteNodeListType
    | RemoteHtmlCollectionType
    | RemoteNodeType
    | RemoteWindowType
>;

export type SpecialNumberType = SuggestedString<
    | SpecialNumberNanType
    | SpecialNumberMinusZeroType
    | SpecialNumberInfinityType
    | SpecialNumberMinusInfinityType
>;

export type ProtocolType = SuggestedString<PrimitiveType | NonPrimitiveType | RemoteType | SpecialNumberType>;

/** Type-only hierarchy for navigating primitive protocol value types. */
export type Primitive = PrimitiveType;
export namespace Primitive {
    type Undefined = PrimitiveUndefinedType;
    type Null = PrimitiveNullType;
    type String = PrimitiveStringType;
    type Number = PrimitiveNumberType;
    type SpecialNumber = PrimitiveSpecialNumberType;
    type Boolean = PrimitiveBooleanType;
    type BigInt = PrimitiveBigIntType;
}

/** Type-only hierarchy for navigating non-primitive protocol value types. */
export type NonPrimitive = NonPrimitiveType;
export namespace NonPrimitive {
    type Array = NonPrimitiveArrayType;
    type Date = NonPrimitiveDateType;
    type Map = NonPrimitiveMapType;
    type Object = NonPrimitiveObjectType;
    type RegularExpression = NonPrimitiveRegularExpressionType;
    type Set = NonPrimitiveSetType;
    type Channel = NonPrimitiveChannelType;
}

/** Type-only hierarchy for navigating remote protocol value types. */
export type Remote = RemoteType;
export namespace Remote {
    type Symbol = RemoteSymbolType;
    type Function = RemoteFunctionType;
    type WeakMap = RemoteWeakMapType;
    type WeakSet = RemoteWeakSetType;
    type Iterator = RemoteIteratorType;
    type Generator = RemoteGeneratorType;
    type Error = RemoteErrorType;
    type Proxy = RemoteProxyType;
    type Promise = RemotePromiseType;
    type TypedArray = RemoteTypedArrayType;
    type ArrayBuffer = RemoteArrayBufferType;
    type NodeList = RemoteNodeListType;
    type HtmlCollection = RemoteHtmlCollectionType;
    type Node = RemoteNodeType;
    type Window = RemoteWindowType;
}

/** Type-only hierarchy for navigating special number encodings. */
export type SpecialNumber = SpecialNumberType;
export namespace SpecialNumber {
    type Nan = SpecialNumberNanType;
    type MinusZero = SpecialNumberMinusZeroType;
    type Infinity = SpecialNumberInfinityType;
    type MinusInfinity = SpecialNumberMinusInfinityType;
}

export const PrimitiveType: IPrimitiveType;
export const NonPrimitiveType: INonPrimitiveType;
export const RemoteType: IRemoteType;
export const SpecialNumberType: ISpecialNumberType;
