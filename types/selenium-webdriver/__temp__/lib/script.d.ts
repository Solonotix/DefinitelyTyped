import type { ConsoleLogEntry, JavascriptLogEntry } from '../bidi/logEntries.js';
import type { LogHandler } from '../bidi/logInspector.js';
import type { WebDriver, WebElement } from './webdriver.js';

interface IDomMutationEvent {
    attribute_name: string;
    current_value: string;
    element: WebElement;
    old_value: string;
}

type DomMutationHandler = (event: IDomMutationEvent) => void;

declare class Script {
    constructor(driver: WebDriver);

    addJavaScriptErrorHandler(callback: LogHandler<JavascriptLogEntry>): Promise<number>;

    removeJavaScriptErrorHandler(id: number): Promise<void>;

    addConsoleMessageHandler(callback: LogHandler<ConsoleLogEntry>): Promise<number>;

    removeConsoleMessageHandler(id: number): Promise<void>;

    addDomMutationHandler(callback: DomMutationHandler): Promise<number>;

    removeDomMutationHandler(id: number): Promise<void>;

    pin(script: string): Promise<string>;

    unpin(id: string): Promise<void>;

    execute<T>(script: string, ...args: Array<unknown>): Promise<T | undefined>;
}

declare namespace Script {
    export type { DomMutationHandler, IDomMutationEvent };
}

export = Script;
