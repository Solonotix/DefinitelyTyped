import type { Source } from './scriptTypes.js';

export class BaseLogEntry {
    protected readonly _level: string;
    protected readonly _source: Source;
    protected readonly _stackTrace: string;
    protected readonly _text: string;
    protected readonly _timeStamp: number;

    constructor(level: string, source: Source, text: string, timeStamp: number, stackTrace: string);

    get level(): string;

    get text(): string;

    get timeStamp(): number;

    get stackTrace(): string;

    get source(): Source;
}

export class GenericLogEntry extends BaseLogEntry {
    protected readonly _type: string;

    constructor(level: string, source: Source, text: string, timeStamp: number, type: string, stackTrace: string);

    get type(): string;
}

export class ConsoleLogEntry<T extends Array<unknown> = Array<unknown>> extends GenericLogEntry {
    protected readonly _args: T;
    protected readonly _method: string;

    constructor(
        level: string,
        source: Source,
        text: string,
        timeStamp: number,
        type: string,
        method: string,
        args: T,
        stackTrace: string,
    );

    get args(): T;

    get method(): string;
}

export class JavascriptLogEntry extends GenericLogEntry { }
