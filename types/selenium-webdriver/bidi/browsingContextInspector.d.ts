import type { WebDriver } from '../lib/webdriver.js';
import type { BrowsingContextInfo, NavigationInfo, UserPromptClosed, UserPromptOpened } from './browsingContextTypes.js';

declare function getBrowsingContextInspectorInstance(
    driver: WebDriver,
    browsingContextIds?: string[] | null,
): Promise<getBrowsingContextInspectorInstance.BrowsingContextInspector>;

declare namespace getBrowsingContextInspectorInstance {
    type ContextCallback = (event: BrowsingContextInfo) => void;
    type NavigationCallback = (event: NavigationInfo) => void;
    type UserPromptClosedCallback = (event: UserPromptClosed) => void;
    type UserPromptOpenedCallback = (event: UserPromptOpened) => void;

    interface BrowsingContextInspector {
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

    /** @deprecated Use {@link BrowsingContextInspector}. */
    type Instance = BrowsingContextInspector;
}

export = getBrowsingContextInspectorInstance;
