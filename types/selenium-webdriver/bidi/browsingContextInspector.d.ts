import type { WebDriver } from "../lib/webdriver";
import type { BrowsingContextInfo, NavigationInfo, UserPromptClosed, UserPromptOpened } from "./browsingContextTypes";

declare function getBrowsingContextInspectorInstance(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<getBrowsingContextInspectorInstance.Instance>;

declare namespace getBrowsingContextInspectorInstance {
    type ContextCallback = (event: BrowsingContextInfo) => void;
    type NavigationCallback = (event: NavigationInfo) => void;
    type UserPromptClosedCallback = (event: UserPromptClosed) => void;
    type UserPromptOpenedCallback = (event: UserPromptOpened) => void;

    interface Instance {
        onBrowsingContextCreated(callback: ContextCallback): Promise<void>;
        onBrowsingContextDestroyed(callback: ContextCallback): Promise<void>;
        onNavigationStarted(callback: NavigationCallback): Promise<void>;
        onFragmentNavigated(callback: NavigationCallback): Promise<void>;
        onUserPromptClosed(callback: UserPromptClosedCallback): Promise<void>;
        onUserPromptOpened(callback: UserPromptOpenedCallback): Promise<void>;
        onDomContentLoaded(callback: NavigationCallback): Promise<void>;
        onBrowsingContextLoaded(callback: NavigationCallback): Promise<void>;
        close(): Promise<void>;
    }
}

export = getBrowsingContextInspectorInstance;
