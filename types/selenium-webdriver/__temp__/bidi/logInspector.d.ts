import type { SuggestedString } from '../_internal.js';
import type { WebDriver } from '../lib/webdriver.js';
import type { FilterBy } from './filterBy.js';
import type { BaseLogEntry, ConsoleLogEntry, JavascriptLogEntry } from './logEntries.js';

type LogConsoleType = 'console';
type LogJavaScriptType = 'javascript';
type LogJavaScriptExceptionType = 'javascriptException';
type LogTypeLogs = 'logs';
type LogTypeConsoleFilter = 'console_filter';
type LogTypeJavaScriptFilter = 'javascript_filter';
type LogTypeJavaScriptExceptionFilter = 'javascriptException_filter';
type LogTypeLogsFilter = 'logs_filter';

declare function LogInspector(
    driver: WebDriver,
    browsingContextIds?: Array<string>,
): Promise<LogInspector.Instance>;

declare namespace LogInspector {
    type LogType = SuggestedString<LogConsoleType | LogJavaScriptType | LogJavaScriptExceptionType | LogTypeLogs>;
    type LogFilter = SuggestedString<
        LogTypeConsoleFilter | LogTypeJavaScriptFilter | LogTypeJavaScriptExceptionFilter | LogTypeLogsFilter
    >;
    type LogHandler<T extends BaseLogEntry = BaseLogEntry> = (data: T) => void;

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
