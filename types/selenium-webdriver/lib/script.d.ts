import type { ConsoleLogEntry, JavascriptLogEntry } from '../bidi/logEntries.js';
import type { RemoteValue } from '../bidi/protocolValue.js';
import type { WebDriver, WebElement } from './webdriver.js';

declare class Script {
    constructor(driver: WebDriver);

    addJavaScriptErrorHandler(callback: (entry: JavascriptLogEntry) => void): Promise<number>;
    removeJavaScriptErrorHandler(id: number): Promise<void>;
    addConsoleMessageHandler(callback: (entry: ConsoleLogEntry) => void): Promise<number>;
    removeConsoleMessageHandler(id: number): Promise<void>;
    addDomMutationHandler(callback: Script.DomMutationHandler): Promise<number>;
    removeDomMutationHandler(id: number): Promise<void>;
    pin(script: string): Promise<string>;
    unpin(id: string): Promise<void>;
    execute(script: string, ...args: unknown[]): Promise<RemoteValue | undefined>;
}

declare namespace Script {
    interface DomMutationEvent {
        attribute_name: string;
        current_value: string;
        element: WebElement;
        old_value: string;
    }

    type DomMutationHandler = (event: DomMutationEvent) => void;
}

export = Script;
