import type { ProtocolType } from './protocolType.js';
import type { LocalValue, ReferenceValue } from './protocolValue.js';

/** @deprecated Use the LocalValue factory methods directly. */
export class ArgumentValue<T extends ProtocolType = ProtocolType, V = unknown> {
    readonly value: LocalValue<T, V> | ReferenceValue;

    constructor(value: LocalValue<T, V> | ReferenceValue);

    asMap(): Record<string, unknown>;
}
