import type * as events from 'node:events';

import * as ws from 'ws';

import type { EventListenerSimple, MapOf, SuggestedString } from '../_internal.js';
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

export namespace Browser {
    export import Commands = Command.Browser;
}

interface BrowsingContext {
    readonly id: string;

    create(type: Type, createParameters?: CreateContext.Parameters): Promise<unknown>;
    navigate(url: string, readinessState?: BrowsingContext.Readiness): Promise<BrowsingContext.Navigation>;
    getTree(maxDepth?: number): Promise<Array<BrowsingContext.Info>>;
    getTopLevelContexts(): Promise<Array<BrowsingContext.Info>>;
    close(): Promise<void>;
    printPage(options?: IPrintPageOptions): Promise<PrintResult>;
    captureScreenshot(parameters?: CaptureScreenshotParameters): Promise<string>;
    captureBoxScreenshot(x: number, y: number, width: number, height: number): Promise<string>;
    captureElementScreenshot(sharedId: string, handle?: string): Promise<string>;
    activate(): Promise<void>;
    handleUserPrompt(accept?: boolean, userText?: string): Promise<void>;
    reload(ignoreCache?: boolean, readinessState?: BrowsingContext.Readiness): Promise<BrowsingContext.Navigation>;
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

export namespace BrowsingContext {
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
        onBrowsingContextCreated(callback: EventListenerSimple<BrowsingContext.Info>): Promise<void>;
        onBrowsingContextDestroyed(callback: EventListenerSimple<BrowsingContext.Info>): Promise<void>;
        onNavigationStarted(callback: EventListenerSimple<BrowsingContext.Navigation>): Promise<void>;
        onFragmentNavigated(callback: EventListenerSimple<BrowsingContext.Navigation>): Promise<void>;
        onUserPromptClosed(callback: EventListenerSimple<UserPromptClosed>): Promise<void>;
        onUserPromptOpened(callback: EventListenerSimple<UserPromptOpened<unknown>>): Promise<void>;
        onDomContentLoaded(callback: EventListenerSimple<BrowsingContext.Navigation>): Promise<void>;
        onBrowsingContextLoaded(callback: EventListenerSimple<BrowsingContext.Navigation>): Promise<void>;
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
        readonly browsingContextId: string;
        readonly navigationId: string;
        readonly timestamp: number;
        readonly url: string;
    }
    
    interface Options {
        browsingContextId?: string;
        createParameters?: CreateContext.Parameters;
        type?: BrowsingContext.Type;
    }

    interface PrintResult {
        readonly data: string;
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

    namespace UserPrompt {
        interface Closed {
            readonly accepted: boolean;
            readonly browsingContextId: string;
            readonly userText?: string;
        }

        interface Opened<T extends Type = Type> {
            readonly browsingContextId: string;
            readonly message: string;
            readonly type: T;
        }

        type Type = '';
        namespace Type {
            
        }
    }
}

export namespace ClientWindow {
    interface Info {
        readonly active?: boolean | undefined;
        readonly clientWindow?: State | undefined;
        readonly height?: number | undefined;
        readonly state?: string | undefined;
        readonly width?: number | undefined;
        readonly x?: number | undefined;
        readonly y?: number | undefined;
    }

    type State = SuggestedString<State.Full | State.Max | State.Min | State.Normal>;
    namespace State {
        type Full = 'fullscreen';
        type Max = 'maximized';
        type Min = 'minimized';
        type Normal = 'normal';
    }

    interface StateEnum {
        FULLSCREEN: State.Full;
        MAXIMIZED: State.Max;
        MINIMIZED: State.Min;
        NORMAL: State.Normal;
    }
}

export type Command = SuggestedString<
    Command.Browser |
    Command.BrowserContext |
    Command.Input |
    Command.Network |
    Command.Script |
    Command.Session |
    Command.Storage>;

export namespace Command {
    type Browser = SuggestedString<
        Browser.CreateUserContext | 
        Browser.GetClientWindows | 
        Browser.GetUserContexts |
        Browser.RemoveUserContext>;

    namespace Browser {
        type CreateUserContext = 'browser.createUserContext';
        type GetClientWindows = 'browser.getClientWindows';
        type GetUserContexts = 'browser.getUserContexts';
        type RemoveUserContext = 'browser.removeUserContext';
    }

    type BrowserContext = SuggestedString<
        BrowserContext.Activate |
        BrowserContext.CaptureScreenshot |
        BrowserContext.Close |
        BrowserContext.Create |
        BrowserContext.GetTree |
        BrowserContext.HandleUserPrompt |
        BrowserContext.LocateNodes |
        BrowserContext.Navigate |
        BrowserContext.Print |
        BrowserContext.Reload |
        BrowserContext.SetViewport |
        BrowserContext.TraverseHistory>;

    namespace BrowserContext {
        type Activate = 'browsingContext.activate';
        type CaptureScreenshot = 'browsingContext.catpureScreenshot';
        type Close = 'browsingContext.close';
        type Create = 'browsingContext.create';
        type GetTree = 'browsingContext.getTree';
        type HandleUserPrompt = 'browsingContext.handleUserPrompt';
        type LocateNodes = 'browsingContext.locateNodes';
        type Navigate = 'browsingContext.navigate';
        type Print = 'browsingContext.close';
        type Reload = 'browsingContext.reload';
        type SetViewport = 'browsingContext.setViewport';
        type TraverseHistory = 'browsingContext.traverseHistory';
    }

    type Input = SuggestedString<
        Input.PerformActions |
        Input.ReleaseActions |
        Input.SetFiles>;

    namespace Input {
        type PerformActions = 'input.performActions';
        type ReleaseActions = 'input.releaseActions';
        type SetFiles = 'input.setFiles';
    }

    type Network = SuggestedString<
        Network.AddIntercept |
        Network.ContinueRequest |
        Network.ContinueResponse |
        Network.ContinueWithAuth |
        Network.FailRequest |
        Network.ProvideResponse |
        Network.RemoveIntercept |
        Network.SetCacheBehavior>;

    namespace Network {
        type AddIntercept = 'network.addIntercept';
        type ContinueRequest = 'network.continueRequest';
        type ContinueResponse = 'network.continueResponse';
        type ContinueWithAuth = 'network.continueWithAuth';
        type FailRequest = 'network.failRequest';
        type ProvideResponse = 'network.provideResponse';
        type RemoveIntercept = 'network.removeIntercept';
        type SetCacheBehavior = 'network.setCacheBehavior';
    }

    type Script = SuggestedString<
        Script.AddPreloadScript |
        Script.CallFunction |
        Script.Disown |
        Script.Evaluate |
        Script.GetRealms |
        Script.RemovePreloadScript>;

    namespace Script {
        type AddPreloadScript = 'script.addPreloadScript';
        type CallFunction = 'script.callFunction';
        type Disown = 'script.disown';
        type Evaluate = 'script.evaluate';
        type GetRealms = 'script.getRealms';
        type RemovePreloadScript = 'script.removePreloadScript';
    }

    type Session = SuggestedString<Session.Status | Session.Subscribe | Session.Unsubscribe>;
    namespace Session {
        type Status = 'session.status';
        type Subscribe = 'session.subscribe';
        type Unsubscribe = 'session.unsubscribe';
    }

    type Storage = SuggestedString<Storage.DeleteCookies | Storage.GetCookies | Storage.SetCookies>;
    namespace Storage {
        type DeleteCookies = 'storage.deleteCookies';
        type GetCookies = 'storage.getCookies';
        type SetCookie = 'storage.setCookie';
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

export interface Event<M extends Command, T = unknown> {
    method: M;
    params: T;
}

export namespace Event {
    namespace BrowsingContext {
        interface Create extends Event<Command.BrowserContext.Create> {

        }

        namespace Create {
            interface Parameters {
                background?: boolean;
                referenceContext?: string;
                userContext?: string;
                type: string;
            }
        }

        interface Info {
            children: Array<Info> | null;
            clientWindow: ClientWindow.Info,
            context: string,
            originalOpener: string | null,
            url: string,
            userContext: browser.UserContext,
            parent?: string | null,
        }

        interface Navigation {
            readonly context: string;
            readonly navigation: string | null;
            readonly timestamp: number;
            readonly url: string;
        }

        interface NavigateRequest {
            readonly method: '';
        }

        interface NavigateResult {
            readonly url: string;
            readonly navigationId: string | null;
        }
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
