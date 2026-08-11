import { Protocol } from './_internal.js';

export import ProtocolType = Protocol.Type;

export type NonPrimitiveType = ProtocolType.NonPrimitive;
export const NonPrimitiveType: ProtocolType.NonPrimitiveEnum;

export type PrimitiveType = ProtocolType.Primitive;
export const PrimitiveType: ProtocolType.PrimitiveEnum;

export type RemoteType = ProtocolType.Remote;
export const RemoteType: ProtocolType.RemoteEnum;

export type SpecialNumberType = ProtocolType.SpecialNumber;
export const SpecialNumberType: ProtocolType.SpecialNumberEnum;
