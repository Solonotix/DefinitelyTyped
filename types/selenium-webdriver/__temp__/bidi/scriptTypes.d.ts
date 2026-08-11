import type { ProtocolType } from './protocolType.js';
import type { RemoteValue } from './protocolValue.js';

export class Message<T extends RemoteValue<ProtocolType, unknown>> {
    readonly _channel: string;
    readonly _data: T;
    readonly _source: Source;

    constructor(channel: string, data: T, source: Source);

    get channel(): string;
    get data(): T;
    get source(): Source;
}

export interface ISourceArg {
    context?: string;
    realm: string;
}

export class Source {
    readonly _browsingContextId: string | null;
    readonly _realmId: string;

    constructor(source: ISourceArg);

    get browsingContextId(): string | null;
    get realmId(): string;
}
