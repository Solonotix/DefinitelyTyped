import type { WebDriver } from '../lib/webdriver.js';
import type { BrowsingContext } from './_internal.js';
import type {
    BrowsingContextInfo,
    NavigationInfo,
    UserPromptClosed,
    UserPromptOpened,
} from './browsingContextTypes.js';


type Callback<T> = (event: T) => void;

declare class BrowsingContextInspector implements BrowsingContext.Inspector {
    readonly _browsingContextIds?: Array<string>;
    readonly _driver: WebDriver;

    constructor(driver: WebDriver, browsingContextIds?: Array<string>);

    onBrowsingContextCreated(callback: Callback<BrowsingContextInfo>): Promise<void>;
    onBrowsingContextDestroyed(callback: Callback<BrowsingContextInfo>): Promise<void>;
    onNavigationStarted(callback: Callback<NavigationInfo>): Promise<void>;
    onFragmentNavigated(callback: Callback<NavigationInfo>): Promise<void>;
    onUserPromptClosed(callback: Callback<UserPromptClosed>): Promise<void>;
    onUserPromptOpened(callback: Callback<UserPromptOpened<unknown>>): Promise<void>;
    onDomContentLoaded(callback: Callback<NavigationInfo>): Promise<void>;
    onBrowsingContextLoaded(callback: Callback<NavigationInfo>): Promise<void>;
    close(): Promise<void>;
}

declare function BrowsingContextInspector(
    driver: WebDriver,
    browsingContextIds?: Array<string>,
): Promise<BrowsingContextInspector>;

declare namespace BrowsingContextInspector {


}

export = BrowsingContextInspector;
