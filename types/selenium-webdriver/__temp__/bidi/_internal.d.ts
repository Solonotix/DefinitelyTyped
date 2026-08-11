import type * as events from 'node:events';

import * as ws from 'ws';

import type { MapOf, SuggestedString } from '../_internal.js';
import type { WebElement } from '../lib/webdriver.js';

export type BidiLogLevel = SuggestedString<'debug' | 'error' | 'info' | 'warn'>;

export interface BidiStatusResponseResultBuild {
    version: string;
}

export interface BidiStatusResponseResultOs {
    arch: string;
    name: string;
    version: string;
}

export interface BidiStatusResponseResult {
    build: BidiStatusResponseResultBuild;
    message: string;
    os: BidiStatusResponseResultOs;
    ready: boolean;
}

export interface BidiStatusResponse {
    id: number;
    result: BidiStatusResponseResult;
    type: string;
}

export interface Bidi extends events.EventEmitter {
    _ws: ws.WebSocket;
    browsingContexts: Array<string>;
    connected: boolean;
    events: Array<string>;
    id: number;

    get socket(): ws.WebSocket;

    get isConnected(): boolean;

    get status(): Promise<BidiStatusResponse>;

    waitForConnection(): Promise<void>;

    send<P extends Record<string, unknown>, T = unknown>(params: P): Promise<T>;

    subscribe(events?: string | Array<string>, browsingContexts?: string | Array<string>): Promise<void>;

    unsubscribe(events: string | Array<string>, browsingContexts?: string | Array<string>): Promise<void>;

    close(): Promise<void>;
}

export interface Browser {
    createUserContext(): Promise<string>;
    getUserContexts(): Promise<Array<string>>;
    getClientWindows(): Promise<Array<ClientWindow.Info>>;
    removeUserContext(userContext: string): Promise<void>;
}

export namespace BrowsingContext {
    interface BrowsingContext {
        readonly id: string;

        create(type: Type, createParameters?: CreateContext.Parameters): Promise<unknown>;
        navigate(url: string, readinessState?: Readiness): Promise<NavigateResult>;
        getTree(maxDepth?: number): Promise<Array<BrowsingContext.Info>>;
        getTopLevelContexts(): Promise<Array<BrowsingContext.Info>>;
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

    interface Info {
        readonly _children: null | Array<BrowsingContext.Info>;
        readonly _id: string;
        readonly _parentBrowsingContext: null | BrowsingContext.Info;
        readonly _url: string;

        get children(): null | Array<BrowsingContext.Info>;

        get id(): string;

        get parentBrowsingContext(): null | BrowsingContext.Info;

        get url(): string;
    }

    interface Inspector {
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

    interface Locator {
        type: Locator.Type;
        value: string;
        ignoreCase?: boolean;
        matchType?: Locator.Match;
        maxDepth?: number;
    }

    namespace Locator {
        type Match = SuggestedString<Match.Full | Match.Partial>;
        namespace Match {
            type Full = 'full';
            type Partial = 'partial';
        }

        type Type = SuggestedString<Type.Css | Type.InnerText | Type.Xpath>;
        namespace Type {
            type Css = 'css';
            type InnerText = 'innerText';
            type Xpath = 'xpath';
        }
        interface TypeEnum {
            CSS: Type.Css;
            INNER_TEXT: Type.InnerText;
            XPATH: Type.Xpath
        }
    }

    interface Navigation {
        readonly context: string;
        readonly navigation: string | null;
        readonly timestamp: number;
        readonly url: string;
    }

    interface Options {
        browsingContextId?: string;
        createParameters?: CreateContext.Parameters;
        type?: BrowsingContext.Type;
    }

    type Readiness = SuggestedString<Readiness.Complete | Readiness.Interactive | Readiness.None>;
    namespace Readiness {
        type Complete = 'complete';
        type Interactive = 'interactive';
        type None = 'none';
    }

    type Type = SuggestedString<Type.Tag | Type.Window>;
    namespace Type {
        type Tag = 'tab';
        type Window = 'window';
    }

    interface NavigateResult {
        readonly url: string;
        readonly navigationId: string | null;
    }

    interface PrintResult {
        readonly data: string;
    }


}

export namespace ClientWindow {
    interface Info {
        readonly active: boolean | undefined;
        readonly clientWindow: string | undefined;
        readonly height: number | undefined;
        readonly state: string | undefined;
        readonly width: number | undefined;
        readonly x: number | undefined;
        readonly y: number | undefined;
    }

    type State = SuggestedString<State.Full | State.Max | State.Min | State.Normal>;
    namespace State {
        type Full = 'fullscreen';
        type Max = 'maximized';
        type Min = 'minimized';
        type Normal = 'normal';
    }

    interface IState {
        FULLSCREEN: State.Full;
        MAXIMIZED: State.Max;
        MINIMIZED: State.Min;
        NORMAL: State.Normal;
    }
}

export namespace CreateContext {
    interface IParameters {
        background?: boolean;
        referenceContext?: string;
        userContext?: string;
    }

    interface Parameters {
        asMap(): MapOf<IParameters>;

        background(background: boolean): this;

        referenceContext(id: string): this;

        userContext(userContext: string): this;
    }
}

export namespace Network {
    type CacheBehavior = SuggestedString<CacheBehavior.Bypass | CacheBehavior.Default>;
    namespace CacheBehavior {
        type Bypass = 'bypass';
        type Default = 'default';
    }

    interface CacheBehaviorEnum {
        BYPASS: CacheBehavior.Bypass;
        DEFAULT: CacheBehavior.Default;
    }

    type Event = SuggestedString<Event.AuthRequired | Event.BeforeRequestSent | Event.FetchError | Event.ResponseCompleted | Event.ResponseStarted>;
    namespace Event {
        type AuthRequired = 'network.authRequired';
        type BeforeRequestSent = 'network.beforeRequestSent';
        type FetchError = 'network.fetchError';
        type ResponseCompleted = 'network.responseCompleted';
        type ResponseStarted = 'network.responseStarted';
    }

    interface Navigation {
        readonly context: string;
        readonly navigation: string | null;
        readonly timestamp: number;
        readonly url: string;
    }
}

export namespace Protocol {
    type Type = SuggestedString<Type.Primitive | Type.NonPrimitive | Type.Remote | Type.SpecialNumber>;
    namespace Type {
        type NonPrimitive = SuggestedString<
              NonPrimitive.Array
            | NonPrimitive.Channel
            | NonPrimitive.Date
            | NonPrimitive.Map
            | NonPrimitive.Object
            | NonPrimitive.RegularExpression
            | NonPrimitive.Set>;

        namespace NonPrimitive {
            type Array = 'array';
            type Date = 'date';
            type Map = 'map';
            type Object = 'object';
            type RegularExpression = 'regexp';
            type Set = 'set';
            type Channel = 'channel';
        }

        interface NonPrimitiveEnum {
            ARRAY: NonPrimitive.Array;
            DATE: NonPrimitive.Date;
            MAP: NonPrimitive.Map;
            OBJECT: NonPrimitive.Object;
            REGULAR_EXPRESSION: NonPrimitive.RegularExpression;
            SET: NonPrimitive.Set;
            CHANNEL: NonPrimitive.Channel;

            findByName(name: string): NonPrimitive | null;
        }

        type Primitive = SuggestedString<
            Primitive.Undefined
            | Primitive.Null
            | Primitive.String
            | Primitive.Number
            | Primitive.SpecialNumber
            | Primitive.Boolean
            | Primitive.BigInt>;

        namespace Primitive {
            type Undefined = 'undefined';
            type Null = 'null';
            type String = 'string';
            type Number = 'number';
            type SpecialNumber = 'number';
            type Boolean = 'boolean';
            type BigInt = 'bigint';
        }

        interface PrimitiveEnum {
            UNDEFINED: Primitive.Undefined;
            NULL: Primitive.Null;
            STRING: Primitive.String;
            NUMBER: Primitive.Number;
            SPECIAL_NUMBER: Primitive.SpecialNumber;
            BOOLEAN: Primitive.Boolean;
            BIGINT: Primitive.BigInt;

            findByName(name: string): Primitive | null;
        }

        type Remote = SuggestedString<
            Remote.Symbol
            | Remote.Function
            | Remote.WeakMap
            | Remote.WeakSet
            | Remote.Iterator
            | Remote.Generator
            | Remote.Error
            | Remote.Proxy
            | Remote.Promise
            | Remote.TypedArray
            | Remote.ArrayBuffer
            | Remote.NodeList
            | Remote.HtmlCollection
            | Remote.Node
            | Remote.Window>;

        namespace Remote {
            type Symbol = 'symbol';
            type Function = 'function';
            type WeakMap = 'weakmap';
            type WeakSet = 'weakset';
            type Iterator = 'iterator';
            type Generator = 'generator';
            type Error = 'error';
            type Proxy = 'proxy';
            type Promise = 'promise';
            type TypedArray = 'typedarray';
            type ArrayBuffer = 'arraybuffer';
            type NodeList = 'nodelist';
            type HtmlCollection = 'htmlcollection';
            type Node = 'node';
            type Window = 'window';
        }

        interface RemoteEnum {
            SYMBOL: Remote.Symbol;
            FUNCTION: Remote.Function;
            WEAK_MAP: Remote.WeakMap;
            WEAK_SET: Remote.WeakSet;
            ITERATOR: Remote.Iterator;
            GENERATOR: Remote.Generator;
            ERROR: Remote.Error;
            PROXY: Remote.Proxy;
            PROMISE: Remote.Promise;
            TYPED_ARRAY: Remote.TypedArray;
            ARRAY_BUFFER: Remote.ArrayBuffer;
            NODE_LIST: Remote.NodeList;
            HTML_COLLECTION: Remote.HtmlCollection;
            NODE: Remote.Node;
            WINDOW: Remote.Window;

            findByName(name: string): Remote | null;
        }

        type SpecialNumber = SuggestedString<
              SpecialNumber.Nan 
            | SpecialNumber.MinusZero 
            | SpecialNumber.Infinity 
            | SpecialNumber.MinusInfinity>;

        namespace SpecialNumber {
            type Nan = 'NaN';
            type MinusZero = '-0';
            type Infinity = 'Infinity';
            type MinusInfinity = '-Infinity';
        }

        interface SpecialNumberEnum {
            NAN: SpecialNumber.Nan;
            MINUS_ZERO: SpecialNumber.MinusZero;
            INFINITY: SpecialNumber.Infinity;
            MINUS_INFINITY: SpecialNumber.MinusInfinity;
        }
    }

    namespace Value {
        type IncludeShadowTree = SuggestedString<IncludeShadowTree.All | IncludeShadowTree.None | IncludeShadowTree.Open>;
        namespace IncludeShadowTree {
            type All = 'all';
            type None = 'none';
            type Open = 'open';
        }

        interface Local<T extends Protocol.Type = Protocol.Type, V = unknown> {
            type: T;
            value: V;
        }

        interface Remote<T, V> {
            handle: string;
            internalId: string;
            sharedId: string;
            type: T;
            value: V;
        }
        
        type RemoteReferenceType = SuggestedString<RemoteReferenceType.Handle | RemoteReferenceType.SharedId>;
        namespace RemoteReferenceType {
            type Handle = 'handle';
            type SharedId = 'sharedId';
        }
        interface RemoteReferenceTypeEnum {
            HANDLE: RemoteReferenceType.Handle;
            SHARED_ID: RemoteReferenceType.SharedId;
        }

        type ResultOwnership = SuggestedString<ResultOwnership.None | ResultOwnership.Root>;
        namespace ResultOwnership {
            type None = 'none';
            type Root = 'root';
        }
    }
}
