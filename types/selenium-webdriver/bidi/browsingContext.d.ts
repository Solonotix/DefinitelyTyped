import type { MapOf } from '../_internal.js';
import type { IPrintPageOptions, WebDriver, WebElement } from '../lib/webdriver.js';
import { BrowsingContext as BidiBrowsingContext } from './_internal.js';
import type { BrowsingContextInfo } from './browsingContextTypes.js';
import type { CaptureScreenshotParameters } from './captureScreenshotParameters.js';
import type { CreateContextParameters } from './createContextParameters.js';
import type { ReferenceValue, RemoteValue, SerializationOptions } from './protocolValue.js';

declare function getBrowsingContextInstance(
    driver: WebDriver,
    options: getBrowsingContextInstance.Options,
): Promise<getBrowsingContextInstance.BrowsingContext>;

declare namespace getBrowsingContextInstance {
    export import Readiness = BidiBrowsingContext.Readiness;
    export import Type = BidiBrowsingContext.Type;

    interface Options {
        browsingContextId?: string;
        createParameters?: CreateContextParameters;
        type?: BidiBrowsingContext.Type;
    }

    interface CreateResult {
        result: {
            context: string;
        };
    }

    interface LocatorMap {
        type: BidiBrowsingContext.Locator.Type;
        value: string;
        ignoreCase?: boolean;
        matchType?: BidiBrowsingContext.Locator.Match;
        maxDepth?: number;
    }

    /** The locator constructor attached to the exported factory at runtime. */
    class Locator {
        static readonly Type: {
            readonly CSS: 'css';
            readonly INNER_TEXT: 'innerText';
            readonly XPATH: 'xpath';
        };

        constructor(
            type: BidiBrowsingContext.Locator.Type,
            value: string,
            ignoreCase?: boolean,
            matchType?: BidiBrowsingContext.Locator.Match,
            maxDepth?: number,
        );

        static css(value: string): Locator;
        static xpath(value: string): Locator;
        static innerText(
            value: string,
            ignoreCase?: boolean,
            matchType?: BidiBrowsingContext.Locator.Match,
            maxDepth?: number,
        ): Locator;

        toMap(): MapOf<LocatorMap>;
    }

    namespace Locator {
        export import Match = BidiBrowsingContext.Locator.Match;
        export import Type = BidiBrowsingContext.Locator.Type;
    }

    interface NavigateResult {
        readonly url: string;
        readonly navigationId: string | null;
    }

    interface PrintResult {
        readonly data: string;
    }

    /** Public contract returned by the CommonJS factory. */
    interface BrowsingContext {
        readonly id: string;

        create(type: BidiBrowsingContext.Type, createParameters?: CreateContextParameters): Promise<CreateResult>;
        navigate(url: string, readinessState?: BidiBrowsingContext.Readiness): Promise<NavigateResult>;
        getTree(maxDepth?: number): Promise<BrowsingContextInfo>;
        getTopLevelContexts(): Promise<BrowsingContextInfo[]>;
        close(): Promise<void>;
        printPage(options?: IPrintPageOptions): Promise<PrintResult>;
        captureScreenshot(parameters?: CaptureScreenshotParameters): Promise<string>;
        captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
        captureElementScreenshot(sharedId: string, handle?: string): Promise<string>;
        activate(): Promise<void>;
        handleUserPrompt(accept?: boolean, userText?: string): Promise<void>;
        reload(ignoreCache?: boolean, readinessState?: BidiBrowsingContext.Readiness): Promise<NavigateResult>;
        setViewport(width: number, height: number, devicePixelRatio?: number): Promise<void>;
        traverseHistory(delta: number): Promise<void>;
        forward(): Promise<void>;
        back(): Promise<void>;
        locateNodes(
            locator: Locator,
            maxNodeCount?: number,
            sandbox?: string,
            serializationOptions?: SerializationOptions,
            startNodes?: ReferenceValue[],
        ): Promise<RemoteValue[]>;
        locateNode(
            locator: Locator,
            sandbox?: string,
            serializationOptions?: SerializationOptions,
            startNodes?: ReferenceValue[],
        ): Promise<RemoteValue | undefined>;
        locateElement(locator: Locator): Promise<WebElement>;
        locateElements(locator: Locator): Promise<WebElement[]>;
    }

    /** @deprecated Use {@link BrowsingContext}. */
    type Instance = BrowsingContext;
}

export = getBrowsingContextInstance;
