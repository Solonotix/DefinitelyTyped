import type { BidiLogLevel } from './_internal.js';

export class FilterBy {
    readonly level_: BidiLogLevel;

    constructor(level: BidiLogLevel);

    static logLevel(level: BidiLogLevel): FilterBy;

    getLevel(): BidiLogLevel;
}
