import type { ProtocolType } from './protocolType.js';
import type { ILocalValueAsMap, LocalValue } from './protocolValue.js';

export class ArgumentValue<T extends ProtocolType, V> {
    readonly value: LocalValue<T, V>;

    constructor(value: LocalValue<T, V>);

    asMap(): ILocalValueAsMap<T, V>;
}
