import type { MapOf } from '../_internal.js';
import type { IPrintPageOptions, WebDriver, WebElement } from '../lib/webdriver.js';
import { BrowsingContext as BidiBrowsingContext } from './_internal.js';
import type { BrowsingContextInfo } from './browsingContextTypes.js';
import type { CaptureScreenshotParameters } from './captureScreenshotParameters.js';
import type { CreateContextParameters } from './createContextParameters.js';
import type { ReferenceValue, RemoteValue, SerializationOptions } from './protocolValue.js';

declare class BrowsingContext implements BidiBrowsingContext.BrowsingContext {
    readonly _driver: WebDriver;

    constructor(driver: WebDriver);

    create(type: BrowsingContextType, createParameters?: CreateContextParameters): Promise<unknown>;
    navigate(url: string, readinessState?: ReadinessState): Promise<NavigateResult>;
    getTree(maxDepth?: number): Promise<BrowsingContextInfo>;
    getTopLevelContexts(): Promise<Array<BrowsingContextInfo>>;
    close(): Promise<void>;
    printPage(options?: IPrintPageOptions): Promise<PrintResult>;
    captureScreenshot(parameters?: CaptureScreenshotParameters): Promise<string>;
    captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
    captureElementScreenshot(sharedId: string, handle?: string): Promise<string>;
    activate(): Promise<void>;
    handleUserPrompt(accept?: boolean, userText?: string): Promise<void>;
    reload(ignoreCache?: boolean, readinessState?: ReadinessState): Promise<NavigateResult>;
    setViewport(width: number, height: number, devicePixelRatio?: number): Promise<void>;
    traverseHistory(delta: number): Promise<void>;
    forward(): Promise<void>;
    back(): Promise<void>;
    locateNodes(
        locator: Locator,
        maxNodeCount?: number,
        sandbox?: string,
        serializationOptions?: SerializationOptions,
        startNodes?: Array<ReferenceValue>,
    ): Promise<Array<RemoteValue>>;
    locateNode(
        locator: Locator,
        sandbox?: string,
        serializationOptions?: SerializationOptions,
        startNodes?: Array<ReferenceValue>,
    ): Promise<RemoteValue | undefined>;
    locateElement(locator: Locator): Promise<WebElement>;
    locateElements(locator: Locator): Promise<Array<WebElement>>;
}

declare function getBrowsingContextInstance(
    driver: WebDriver,
    options: getBrowsingContextInstance.Options,
): Promise<BrowsingContext>;

declare namespace getBrowsingContextInstance {
    export import Locator = BidiBrowsingContext.Locator;
    export import Readiness = BidiBrowsingContext.Readiness;
    export import Type = BidiBrowsingContext.Type;
    type LocatorType = 'css' | 'innerText' | 'xpath';
    type LocatorMatchType = 'full' | 'partial' | (string & {});

    interface Options {
        browsingContextId?: string;
        createParameters?: CreateContextParameters;
        type?: BrowsingContextType;
    }

    interface LocatorMap {
        type: LocatorType;
        value: string;
        ignoreCase?: boolean;
        matchType?: LocatorMatchType;
        maxDepth?: number;
    }

    interface LocatorTypeConstants {
        CSS: 'css';
        INNER_TEXT: 'innerText';
        XPATH: 'xpath';
    }

    class Locator {
        static readonly Type: LocatorTypeConstants;

        constructor(
            type: LocatorType,
            value: string,
            ignoreCase?: boolean,
            matchType?: LocatorMatchType,
            maxDepth?: number,
        );

        static css(value: string): Locator;
        static xpath(value: string): Locator;
        static innerText(value: string, ignoreCase?: boolean, matchType?: LocatorMatchType, maxDepth?: number): Locator;

        toMap(): MapOf<LocatorMap>;
    }

    interface NavigateResult {
        readonly url: string;
        readonly navigationId: string | null;
    }

    interface PrintResult {
        readonly data: string;
    }

    interface BrowsingContext {
        readonly id: string;

        create(type: BrowsingContextType, createParameters?: CreateContextParameters): Promise<unknown>;
        navigate(url: string, readinessState?: ReadinessState): Promise<NavigateResult>;
        getTree(maxDepth?: number): Promise<BrowsingContextInfo>;
        getTopLevelContexts(): Promise<Array<BrowsingContextInfo>>;
        close(): Promise<void>;
        printPage(options?: IPrintPageOptions): Promise<PrintResult>;
        captureScreenshot(parameters?: CaptureScreenshotParameters): Promise<string>;
        captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
        captureElementScreenshot(sharedId: string, handle?: string): Promise<string>;
        activate(): Promise<void>;
        handleUserPrompt(accept?: boolean, userText?: string): Promise<void>;
        reload(ignoreCache?: boolean, readinessState?: ReadinessState): Promise<NavigateResult>;
        setViewport(width: number, height: number, devicePixelRatio?: number): Promise<void>;
        traverseHistory(delta: number): Promise<void>;
        forward(): Promise<void>;
        back(): Promise<void>;
        locateNodes(
            locator: Locator,
            maxNodeCount?: number,
            sandbox?: string,
            serializationOptions?: SerializationOptions,
            startNodes?: Array<ReferenceValue>,
        ): Promise<Array<RemoteValue>>;
        locateNode(
            locator: Locator,
            sandbox?: string,
            serializationOptions?: SerializationOptions,
            startNodes?: Array<ReferenceValue>,
        ): Promise<RemoteValue | undefined>;
        locateElement(locator: Locator): Promise<WebElement>;
        locateElements(locator: Locator): Promise<Array<WebElement>>;
    }
}

export = getBrowsingContextInstance;
