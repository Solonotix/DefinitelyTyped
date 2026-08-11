import type { LocalValue, ReferenceValue } from "./protocolValue";

/** @deprecated Use the LocalValue factory methods directly. */
export class ArgumentValue<T = unknown> {
    readonly value: LocalValue<T> | ReferenceValue;

    constructor(value: LocalValue<T> | ReferenceValue);

    // TODO: The staged declaration models LocalValue.asMap(), while the existing
    // protocolValue declaration exposes toJson(); the 4.46.0 runtime has asMap().
    asMap(): Record<string, unknown>;
}
