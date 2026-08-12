import type { SuggestedString } from '../_internal.js';
import type { WebDriver } from '../lib/webdriver.js';
import type { FilterBy } from './filterBy.js';
import type { BaseLogEntry, ConsoleLogEntry, JavascriptLogEntry } from './logEntries.js';

declare function LogInspector(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<LogInspector.Instance>;

declare namespace LogInspector {
    type LogType = SuggestedString<'console' | 'javascript' | 'javascriptException' | 'logs'>;
    type LogFilter = SuggestedString<
        'console_filter' | 'javascript_filter' | 'javascriptException_filter' | 'logs_filter'
    >;
    type LogHandler<T extends BaseLogEntry = BaseLogEntry> = (data: T) => void;

    /** Public contract returned by the CommonJS factory. */
    interface Instance {
        removeCallback(id: number): void;
        onConsoleEntry(callback: LogHandler<ConsoleLogEntry>, filterBy?: FilterBy): Promise<number>;
        onJavascriptLog(callback: LogHandler<JavascriptLogEntry>, filterBy?: FilterBy): Promise<number>;
        onJavascriptException(callback: LogHandler<JavascriptLogEntry>): Promise<number>;
        onLog(callback: LogHandler<BaseLogEntry>, filterBy?: FilterBy): Promise<number>;
        close(): Promise<void>;
    }
}

export = LogInspector;
