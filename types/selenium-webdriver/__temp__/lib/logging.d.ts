import type { SuggestedString } from '../_internal.js';

export { };

export type EntryHandler = (entry: Entry) => void;
export type Loggable = string | (() => string);

interface IEntryJson {
    level: string;
    message: string;
    timestamp: number;
    type: string;
}

export class Entry {
    level: Level;
    message: string;
    timestamp: number;
    type: string;

    constructor(level: Level | string | number, message: string, opt_timestamp?: number, opt_type?: string);

    toJSON(): IEntryJson;
}

export class Level {
    readonly name_: string;
    readonly value_: number;

    static readonly ALL: Level;
    static readonly DEBUG: Level;
    static readonly FINE: Level;
    static readonly FINER: Level;
    static readonly FINEST: Level;
    static readonly INFO: Level;
    static readonly OFF: Level;
    static readonly SEVERE: Level;
    static readonly WARNING: Level;

    constructor(name: string, value: number);

    get name(): string;

    get value(): number;

    toString(): string;
}

export class LogManager {
    readonly loggers_: Map<string, Logger>;
    readonly root_: Logger;

    private createLogger_(name: string, parent: Logger): Logger;

    getLogger(name: string): Logger;
}

export class Logger {
    private handlers_: Set<EntryHandler> | null;
    readonly level_: Level | null;
    readonly name_: string;
    readonly parent_: Logger | null;

    addHandler(handler: EntryHandler): void;

    debug(loggable: Loggable): void;

    fine(loggable: Loggable): void;

    finer(loggable: Loggable): void;

    finest(loggable: Loggable): void;

    getEffectiveLevel(): Level;

    getName(): string;

    getLevel(): Level;

    info(loggable: Loggable): void;

    isLoggable(level: Level): boolean;

    log(level: Level, loggable: Loggable): void;

    removeHandler(handler: EntryHandler): void;

    setLevel(level: Level): void;

    severe(loggable: Loggable): void;

    warning(loggable: Loggable): void;
}

export class Preferences {
    readonly prefs_: Map<string, Level>;

    setLevel(type: string | Type, level: Level | string | number): void;

    toJSON(): Record<string, Level>;
}

type TypeLogBrowser = 'browser';
type TypeLogClient = 'client';
type TypeLogDriver = 'driver';
type TypeLogPerformance = 'performance';
type TypeLogServer = 'server';
export type Type = SuggestedString<TypeLogBrowser | TypeLogClient | TypeLogDriver | TypeLogPerformance | TypeLogServer>;

interface IType {
    BROWSER: TypeLogBrowser;
    CLIENT: TypeLogClient;
    DRIVER: TypeLogDriver;
    PERFORMANCE: TypeLogPerformance;
    SERVER: TypeLogServer;
}

export const Type: IType;

export function addConsoleHandler(opt_logger?: Logger): void;

export function getLevel(nameOrValue: number | string): Level;

export function getLogger(name: string): Logger;

export function installConsoleHandler(): void;

export function removeConsoleHandler(opt_logger?: Logger): void;
