import type { WebElement } from "..";
import type { ConsoleLogEntry, JavascriptLogEntry } from "../bidi/logEntries";
import type { WebDriver } from "./webdriver";

declare class Script {
    constructor(driver: WebDriver);

    // TODO: The existing logInspector declarations return Promise<void> for these registrations,
    // but the 4.46.0 runtime returns the numeric callback ID consumed by the removal methods.
    addJavaScriptErrorHandler(callback: (entry: JavascriptLogEntry) => void): Promise<number>;
    removeJavaScriptErrorHandler(id: number): Promise<void>;
    addConsoleMessageHandler(callback: (entry: ConsoleLogEntry) => void): Promise<number>;
    removeConsoleMessageHandler(id: number): Promise<void>;
    addDomMutationHandler(callback: Script.DomMutationHandler): Promise<number>;
    removeDomMutationHandler(id: number): Promise<void>;
    pin(script: string): Promise<string>;
    unpin(id: string): Promise<void>;
    execute<T = unknown>(script: string, ...args: unknown[]): Promise<T | undefined>;
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
