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

export interface BrowsingContext {
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
    export import Commands = Command.BrowserContext;
    export import Events = Event.BrowsingContext;

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

export type Command = Command._;

export namespace Command {
    type _ = SuggestedString<
        Command.Browser |
        Command.BrowserContext |
        Command.Input |
        Command.Network |
        Command.Script |
        Command.Session |
        Command.Storage>;

    type Browser = SuggestedString<
        Browser.CreateUserContext | 
        Browser.GetClientWindows | 
        Browser.GetUserContexts |
        Browser.RemoveUserContext>;

    namespace Browser {
        type Close = 'browser.close';
        type CreateUserContext = 'browser.createUserContext';
        type GetClientWindows = 'browser.getClientWindows';
        type GetUserContexts = 'browser.getUserContexts';
        type RemoveUserContext = 'browser.removeUserContext';
        type SetClientWindowState = 'browser.setClientWindowState';
        type SetDownloadBehavior = 'browser.setDownloadBehavior';
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
        type CaptureScreenshot = 'browsingContext.captureScreenshot';
        type Close = 'browsingContext.close';
        type Create = 'browsingContext.create';
        type GetTree = 'browsingContext.getTree';
        type HandleUserPrompt = 'browsingContext.handleUserPrompt';
        type LocateNodes = 'browsingContext.locateNodes';
        type Navigate = 'browsingContext.navigate';
        type Print = 'browsingContext.print';
        type Reload = 'browsingContext.reload';
        type SetBypassCsp = 'browsingContext.setBypassCSP';
        type SetViewport = 'browsingContext.setViewport';
        type StartScreencast = 'browsingContext.startScreencast';
        type StopScreencast = 'browsingContext.stopScreencast';
        type TraverseHistory = 'browsingContext.traverseHistory';
    }

    type Emulation = SuggestedString<
        Emulation.SetForcedColorsModeThemeOverride |
        Emulation.SetGeolocationOverride |
        Emulation.SetLocaleOverride |
        Emulation.SetNetworkConditions |
        Emulation.SetScreenOrientationOverride |
        Emulation.SetScreenSettingsOverride |
        Emulation.SetScriptingEnabled |
        Emulation.SetScrollbarTypeOverride |
        Emulation.SetTimezoneOverride |
        Emulation.SetTouchOverride |
        Emulation.SetUserAgentOverride>;

    namespace Emulation {
        type SetForcedColorsModeThemeOverride = 'emulation.setForcedColorsModeThemeOverride'
        type SetGeolocationOverride = 'emulation.setGeolocationOverride';
        type SetLocaleOverride = 'emulation.setLocaleOverride';
        type SetNetworkConditions = 'emulation.setNetworkConditions';
        type SetScreenOrientationOverride = 'emulation.setScreenOrientationOverride';
        type SetScreenSettingsOverride = 'emulation.setScreenSettingsOverride';
        type SetScriptingEnabled = 'emulation.setScriptingEnabled';
        type SetScrollbarTypeOverride = 'emulation.setScrollbarTypeOverride';
        type SetTimezoneOverride = 'emulation.setTimezoneOverride';
        type SetTouchOverride = 'emulation.setTouchOverride';
        type SetUserAgentOverride = 'emulation.setUserAgentOverride';
    }

    interface ICommand<M extends Command, T = unknown> {
        method: M;
        params: T;
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
        type AddDataCollector = 'network.addDataCollector';
        type AddIntercept = 'network.addIntercept';
        type ContinueRequest = 'network.continueRequest';
        type ContinueResponse = 'network.continueResponse';
        type ContinueWithAuth = 'network.continueWithAuth';
        type DisownData = 'network.disownData';
        type FailRequest = 'network.failRequest';
        type GetData = 'network.getData';
        type ProvideResponse = 'network.provideResponse';
        type RemoveDataCollector = 'network.removeDataCollector';
        type RemoveIntercept = 'network.removeIntercept';
        type SetCacheBehavior = 'network.setCacheBehavior';
        type SetExtraHeaders = 'network.setExtraHeaders';
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

    type Storage = SuggestedString<Storage.DeleteCookies | Storage.GetCookies | Storage.SetCookie>;
    namespace Storage {
        type DeleteCookies = 'storage.deleteCookies';
        type GetCookies = 'storage.getCookies';
        type SetCookie = 'storage.setCookie';
    }

    type WebExtension = SuggestedString<WebExtension.Install | WebExtension.Uninstall>;
    namespace WebExtension {
        type Install = 'webExtension.install';
        type Uninstall = 'webExtension.uninstall';
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

export namespace Emulation {

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
            userContext: Types.Browser.UserContext,
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

export namespace Input {

}

export namespace Log {

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

export namespace Script {

}

export namespace Session {
    export import Commands = Command.Session;
}

export namespace Storage {

}

export namespace Types {
    namespace Browser {
        // https://www.w3.org/TR/webdriver-bidi/#type-browser-ClientWindow
        type ClientWindow = string;
        
        namespace ClientWindow {
            // https://www.w3.org/TR/webdriver-bidi/#type-browser-ClientWindowInfo
            interface Info {
                active: boolean;
                clientWindow: ClientWindow;
                height: number;
                state: State;
                width: number;
                x: number;
                y: number;
            }
            
            type State = SuggestedString<State.Fullscreen | State.Maximized | State.Minimized | State.Normal>;
            namespace State {
                type Fullscreen = 'fullscreen';
                type Maximized = 'maximized';
                type Minimized = 'minimized';
                type Normal = 'normal';
            }
        }
        
        export import ClientWindowInfo = ClientWindow.Info;

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browserusercontext
        type UserContext = string;
        namespace UserContext {
            // https://www.w3.org/TR/webdriver-bidi/#type-browser-UserContextInfo
            interface Info {
                userContext: UserContext;
            }
        }

        export import UserContextInfo = UserContext.Info;
    }

    namespace BrowsingContext {
        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browsingcontextaccessibilitylocator
        interface AccessibilityLocator extends Locator<Locator.Type.Accessibility, Locator.AccessibilityValue> {}

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-NavigationInfo
        interface BaseNavigationInfo {
            context: BrowsingContext;
            navigation: Navigation | null;
            timestamp: number;
            url: string;
            userContext?: Browser.UserContext;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-Browsingcontext
        type BrowsingContext = string;

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browsingcontextcontextlocator
        interface ContextLocator extends Locator<Locator.Type.Context, Locator.ContextValue> {}

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browsingcontextcsslocator
        interface CssLocator extends Locator<Locator.Type.Css, string> {}

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-Download
        type Download = string;

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-Info
        interface Info {
            children: InfoList | null;
            clientWindow: Browser.ClientWindow;
            context: BrowsingContext;
            originalOpener: BrowsingContext | null;
            parent?: BrowsingContext | null;
            url: string;
            userContext: Browser.UserContext;
        }

        type InfoList = Array<Info>;

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browsingcontextinnertextlocator
        interface InnerTextLocator extends Locator<Locator.Type.InnerText, string> {
            ignoreCase?: boolean;
            matchType?: Locator.MatchType;
            maxDepth?: number;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-Locator
        interface Locator<T extends Locator.Type, V> {
            type: T;
            value: V;
        }

        namespace Locator {
            interface AccessibilityValue {
                name?: string;
                role?: string;
            }

            interface ContextValue {
                context: BrowsingContext;
            }

            type MatchType = SuggestedString<MatchType.Full | MatchType.Partial>;
            namespace MatchType {
                type Full = 'full';
                type Partial = 'partial';
            }

            type Type = SuggestedString<Type.Accessibility | Type.Context | Type.Css | Type.InnerText | Type.Xpath>;
            namespace Type {
                type Accessibility = 'accessibility';
                type Context = 'context';
                type Css = 'css';
                type InnerText = 'innerText';
                type Xpath = 'xpath';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-Navigation
        type Navigation = string;
        namespace Navigation {
            // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-NavigationInfo
            interface Info extends BaseNavigationInfo {}
        }

        export import NavigationInfo = Navigation.Info;

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-ReadinessState
        type ReadinessState = SuggestedString<ReadinessState.Complete | ReadinessState.Interactive | ReadinessState.None>;
        namespace ReadinessState {
            type Complete = 'complete';
            type Interactive = 'interactive';
            type None = 'none';
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-browsingContext-UserPromptType
        type UserPromptType = SuggestedString<UserPromptType.Alert | UserPromptType.BeforeUnload | UserPromptType.Confirm | UserPromptType.Prompt>;
        namespace UserPromptType {
            type Alert = 'alert';
            type BeforeUnload = 'beforeunload';
            type Confirm = 'confirm';
            type Prompt = 'prompt';
        }

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-browsingcontextxpathlocator
        interface XPathLocator extends Locator<Locator.Type.Xpath, string> {}
    }

    namespace Input {
        // https://www.w3.org/TR/webdriver-bidi/#type-input-origin
        interface ElementOrigin {

        }
    }

    namespace Log {
        export import BaseLogEntry = Entry.Base;
        export import ConsoleLogEntry = Entry.Console;
        export import GenericLogEntry = Entry.Generic;
        export import JavascriptLogEntry = Entry.Javascript;

        // https://www.w3.org/TR/webdriver-bidi/#types-log-logentry
        type Entry = ConsoleLogEntry | GenericLogEntry | JavascriptLogEntry;
        namespace Entry {
            interface Base {
                level: Level;
                source: Script.Source;
                stackTrace?: Script.StackTrace;
                text: string | null;
                timestamp: number;
            }

            interface Console extends Generic<Type.Console> {
                args: Array<Script.RemoteValue>;
                method: string;
            }

            interface Generic<T extends Type = Type> extends Base {
                type: T;
            }

            interface Javascript extends Generic<Type.Javascript> {}


            type Type = SuggestedString<Type.Console | Type.Javascript>;
            namespace Type {
                type Console = 'console';
                type Javascript = 'javascript';
            }
        }

        type Level = SuggestedString<Level.Debug | Level.Error | Level.Info | Level.Warn>;
        namespace Level {
            type Debug = 'debug';
            type Error = 'error';
            type Info = 'info';
            type Warn = 'warn';
        }
    }

    namespace Network {
        // https://www.w3.org/TR/webdriver-bidi/#type-network-AuthChallenge
        interface AuthChallenge {
            schema: string;
            realm: string;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-AuthCredentials
        interface AuthCredentials {
            password: string;
            type: 'password';
            username: string;
        }

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-networkbase64value
        interface Base64Value extends BytesValue<BytesValue.Type.Base64> {}

        // https://www.w3.org/TR/webdriver-bidi/#type-network-BaseParameters
        interface BaseParameters {
            context: BrowsingContext.BrowsingContext | null;
            intercepts?: Array<Intercept>;
            isBlocked: boolean;
            navigation: BrowsingContext.Navigation | null;
            redirectCount: number;
            request: RequestData;
            timestamp: number;
            userContext?: Browser.UserContext | null;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-BytesValue
        interface BytesValue<T extends BytesValue.Type = BytesValue.Type, V = string> {
            type: T;
            value: V;
        }

        namespace BytesValue {
            type Type = SuggestedString<Type.Base64 | Type.String>;
            namespace Type {
                type Base64 = 'base64';
                type String = 'string';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Collector
        type Collector = string;

        namespace Collector {
            // https://www.w3.org/TR/webdriver-bidi/#type-network-CollectorType
            type Type = SuggestedString<Type.Blob | Type.Stream>;
            namespace Type {
                type Blob = 'blob';
                /** @deprecated Future state uncertain */
                type Stream = 'stream';
            }
        }

        export import CollectorType = Collector.Type;

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Cookie
        interface Cookie {
            domain: string;
            expiry?: number;
            httpOnly: boolean;
            name: string;
            path: string;
            sameSite: Cookie.SameSite;
            secure: boolean;
            size: number;
            value: BytesValue;
        }

        namespace Cookie {
            type SameSite = SuggestedString<SameSite.Default | SameSite.Lax | SameSite.None | SameSite.Strict>;
            namespace SameSite {
                type Default = 'default';
                type Lax = 'lax';
                type None = 'none';
                type Strict = 'strict';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-CookieHeader
        interface CookieHeader {
            name: string;
            value: BytesValue;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-DataType
        type DataType = SuggestedString<DataType.Request | DataType.Response>;
        namespace DataType {
            type Request = 'request';
            type Response = 'response';
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-FetchTimingInfo
        interface FetchTimingInfo {
            connectEnd: number;
            connectStart: number;
            dnsEnd: number;
            dnsStart: number;
            fetchStart: number;
            redirectEnd: number;
            redirectStart: number;
            requestStart: number;
            requestTime: number;
            responseEnd: number;
            responseStart: number;
            timeOrigin: number;
            tlsStart: number;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Header
        interface Header {
            name: string;
            value: BytesValue;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Initiator
        interface Initiator {
            columnNumber?: number;
            lineNumber?: number;
            request?: Request;
            stackTrace?: Script.StackTrace;
            type?: Initiator.Type;
        }

        namespace Initiator {
            type Type = SuggestedString<Type.Parser | Type.Preflight | Type.Script | Type.Other>;
            namespace Type {
                type Parser = 'parser';
                type Preflight = 'preflight';
                type Script = 'script';
                type Other = 'other';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Intercept
        type Intercept = string;

        // https://www.w3.org/TR/webdriver-bidi/#type-network-Request
        type Request = string;
        namespace Request {
            // https://www.w3.org/TR/webdriver-bidi/#type-network-RequestData
            interface Data {
                bodySize: number | null;
                cookies: Array<Cookie>;
                destination: string;
                headers: Array<Header>;
                headersSize: number | null;
                initiatorType: string | null;
                request: Request;
                timings: FetchTimingInfo;
                url: string;
            }
        }

        export import RequestData = Request.Data;

        // https://www.w3.org/TR/webdriver-bidi/#type-network-ResponseContent
        interface ResponseContent {
            size: number;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-network-ResponseData
        interface ResponseData {
            authChallenge?: Array<AuthChallenge>;
            bodySize: number | null;
            bytesReceived: number;
            content: ResponseContent;
            fromCache: boolean;
            headers: Array<Header>;
            headersSize: number | null;
            mimeType: string;
            protocol: string;
            status: number;
            statusText: string;
            url: string;
        }

        export import SameSite = Cookie.SameSite;

        // https://www.w3.org/TR/webdriver-bidi/#type-network-SetCookieHeader
        interface SetCookieHeader {
            domain?: string;
            expiry?: string;
            httpOnly?: boolean;
            maxAge?: number;
            name: string;
            path?: string;
            sameSite?: SameSite;
            secure?: boolean;
            value: BytesValue;
        }

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-networkstringvalue
        interface StringValue extends BytesValue<BytesValue.Type.String> {}

        // https://www.w3.org/TR/webdriver-bidi/#type-network-UrlPattern
        interface UrlPattern<T extends UrlPattern.Type = UrlPattern.Type> {
            type: T;
        }

        namespace UrlPattern {
            // https://www.w3.org/TR/webdriver-bidi/#cddl-type-networkurlpatternpattern
            interface Pattern extends UrlPattern<UrlPattern.Type.Pattern> {
                hostname?: string;
                pathname?: string;
                port?: string;
                protocol?: string;
                search?: string;
            }

            // https://www.w3.org/TR/webdriver-bidi/#cddl-type-networkurlpatternstring
            interface String extends UrlPattern<UrlPattern.Type.String> {
                pattern: string;
            }

            type Type = SuggestedString<Type.Pattern | Type.String>;
            namespace Type {
                type Pattern = 'pattern';
                type String = 'string';
            }
        }

        export import UrlPatternPattern = UrlPattern.Pattern;
        export import UrlPatternString = UrlPattern.String;
    }

    namespace Script {
        export import ArrayBufferRemoteValue = RemoteValue.ArrayBufferRemoteValue;
        export import ArrayLocalValue = LocalValue.ArrayLocal;
        export import ArrayRemoteValue = RemoteValue.ArrayRemoteValue;
        export import AudioWorkletRealmInfo = RealmInfo.AudioWorklet;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-Channel
        type Channel = string;
        namespace Channel {
            // https://www.w3.org/TR/webdriver-bidi/#cddl-type-scriptchannelproperties
            interface Properties {
                channel: Channel;
                ownership?: ResultOwnership;
                serializationOptions?: SerializationOptions;
            }

            type Type = 'channel';
            
            // https://www.w3.org/TR/webdriver-bidi/#type-script-ChannelValue
            interface Value extends Script.Value<Channel.Type, Properties> {}
        }

        export import ChannelProperties = Channel.Properties;
        export import ChannelValue = Channel.Value;
        // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptcontexttarget
        export import ContextTarget = Target.Context;
        export import DateLocalValue = LocalValue.DateLocal;
        export import DateRemoteValue = RemoteValue.DateRemoteValue;
        export import DedicatedWorkerRealmInfo = RealmInfo.DedicatedWorker;
        export import ErrorRemoteValue = RemoteValue.ErrorRemoteValue;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-EvaluateResult
        interface EvaluateResult<T extends EvaluateResult.Type = EvaluateResult.Type> extends Value<T, never> {
            realm: string;
        }

        namespace EvaluateResult {
            interface Exception extends EvaluateResult<Type.Exception> {
                exceptionDetails: ExceptionDetails;
            }

            interface Success extends EvaluateResult<Type.Success> {
                result: RemoteValue;
            }

            type Type = SuggestedString<Type.Exception | Type.Success>;
            namespace Type {
                type Exception = 'exception';
                type Success = 'success';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-ExceptionDetails
        interface ExceptionDetails {
            columnNumber: number;
            exception: RemoteValue;
            lineNumber: number;
            stackTrace: StackTrace;
            text: string;
        }
        
        export import FunctionRemoteValue = RemoteValue.FunctionRemoteValue;
        export import GeneratorRemoteValue = RemoteValue.GeneratorRemoteValue;
        
        // https://www.w3.org/TR/webdriver-bidi/#type-script-Handle
        type Handle = string;

        export import HTMLCollectionRemoteValue = RemoteValue.HTMLCollectionRemoteValue;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-InternalId
        type InternalId = string;

        export import ListLocalValue = LocalValue.ListLocal;
        export import ListRemoteValue = RemoteValue.ListRemoteValue;
        // https://www.w3.org/TR/webdriver-bidi/#type-script-LocalValue
        export import LocalValue = LocalValue.Value;

        namespace LocalValue {
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptarraylocalvalue
            interface ArrayLocal<T extends Value = Value> extends Script.Value<Type.Array, ListLocal<T>> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptdatelocalvalue
            interface DateLocal extends Script.Value<Type.Date, string> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptlistlocalvalue
            type ListLocal<T extends Value> = Array<T>;
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptmaplocalvalue
            interface MapLocal<K extends Value | string = Value | string, V extends Value = Value> extends Script.Value<Type.Map, MappingLocal<K, V>> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptmappinglocalvalue
            type MappingLocal<K extends Value | string, V extends Value> = Array<[K, V]>;
            // https://www.w3.org/TR/webdriver-bidi/#cddl-type-scriptobjectlocalvalue
            interface ObjectLocal<K extends Value | string = Value | string, V extends Value = Value> extends Script.Value<Type.Object, MappingLocal<K, V>> {}


            // https://www.w3.org/TR/webdriver-bidi/#cddl-type-scriptregexplocalvalue
            interface RegExpLocal extends Script.Value<Type.RegExp, RegExpLocal.Value> {}
            namespace RegExpLocal {
                // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptregexpvalue
                interface Value {
                    flags?: string;
                    pattern: string;
                }
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptsetlocalvalue
            interface SetLocal<T extends Value = Value> extends Script.Value<Type.Set, ListLocal<T>> {}
            
            type Type = SuggestedString<
                PrimitiveProtocolValue.Type |
                Channel.Type |
                Type.Array |
                Type.Date |
                Type.Map |
                Type.Object |
                Type.RegExp |
                Type.Set |
                Type.Symbol>;

            namespace Type {
                type Array = 'array';
                export import BigInt = PrimitiveProtocolValue.Type.BigInt;
                export import Boolean = PrimitiveProtocolValue.Type.Boolean;
                export import Channel = Script.Channel.Type;
                type Date = 'date';
                type Map = 'map';
                export import Null = PrimitiveProtocolValue.Type.Null;
                export import Number = PrimitiveProtocolValue.Type.Number;
                type Object = 'object';
                type RegExp = 'regexp';
                type Set = 'set';
                export import String = PrimitiveProtocolValue.Type.String;
                type Symbol = 'symbol';
                export import Undefined = PrimitiveProtocolValue.Type.Undefined;
            }

            type Value<T extends LocalValue = never, U extends LocalValue = never> = ArrayLocal<T>
                | ChannelValue
                | DateLocal
                | MapLocal<T, U>
                | ObjectLocal<T, U>
                | PrimitiveProtocolValue
                | RegExpLocal
                | RemoteReference
                | SetLocal<T>;
        }

        export import MapLocalValue = LocalValue.MapLocal;
        export import MapRemoteValue = RemoteValue.MapRemoteValue;
        export import MappingLocalValue = LocalValue.MappingLocal;
        export import MappingRemoteValue = RemoteValue.MappingRemoteValue;
        export import NodeProperties = RemoteValue.NodeProperties;
        export import NodeRemoteValue = RemoteValue.NodeRemoteValue;
        export import NodeListRemoteValue = RemoteValue.NodeListRemoteValue;
        export import ObjectLocalValue = LocalValue.ObjectLocal;
        export import ObjectRemoteValue = RemoteValue.ObjectRemoteValue;
        export import PaintWorkletRealmInfo = RealmInfo.PaintWorklet;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-PrimitiveProtocolValue
        interface PrimitiveProtocolValue<
            T extends PrimitiveProtocolValue.Type = PrimitiveProtocolValue.Type, 
            V extends PrimitiveProtocolValue.Values = PrimitiveProtocolValue.Values> extends Value<T, V> {}

        namespace PrimitiveProtocolValue {
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptbigintvalue
            interface BigIntPrimitive extends PrimitiveProtocolValue<Type.BigInt, string> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptbooleanvalue
            interface BooleanPrimitive extends PrimitiveProtocolValue<Type.Boolean, boolean> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptnullvalue
            interface NullPrimitive extends PrimitiveProtocolValue<Type.Null, never> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptnumbervalue
            interface NumberPrimitive extends PrimitiveProtocolValue<Type.Number, number | SpecialNumber> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptstringvalue
            interface StringPrimitive extends PrimitiveProtocolValue<Type.String, string> {}
            
            type SpecialNumber = 'NaN' | '-0' | 'Infinity' | '-Infinity';
            type Type = SuggestedString<Type.BigInt | Type.Boolean | Type.Null | Type.Number | Type.String | Type.Undefined>;
            namespace Type {
                type BigInt = 'bigint';
                type Boolean = 'boolean';
                type Null = 'null';
                type Number = 'number';
                type String = 'string';
                type Undefined = 'undefined';
            }

            interface UndefinedPrimitive extends PrimitiveProtocolValue<Type.Undefined, never> {}
            type Values = boolean | number | string;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-PreloadScript
        type PreloadScript = string;

        export import PromiseRemoteValue = RemoteValue.PromiseRemoteValue;
        export import ProxyRemoteValue = RemoteValue.ProxyRemoteValue;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-Realm
        type Realm = string;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-RealmInfo
        interface RealmInfo<T extends RealmInfo.Type = RealmInfo.Type> {
            origin: string;
            realm: Realm;
            type: T;
        }

        namespace RealmInfo {
            interface AudioWorklet extends RealmInfo<Type.AudioWorklet> {}
            
            interface DedicatedWorker extends RealmInfo<Type.DedicatedWorker> {
                owners: Array<Realm>;
            }
            
            interface PaintWorklet extends RealmInfo<Type.PaintWorklet> {}
            interface ServiceWorker extends RealmInfo<Type.ServiceWorker> {}
            interface SharedWorker extends RealmInfo<Type.SharedWorker> {}
            
            interface Window extends RealmInfo<Type.Window> {
                context: BrowsingContext.BrowsingContext;
                sandbox?: string;
                userContext?: Browser.UserContext;
            }

            interface Worker extends RealmInfo<Type.Worker> {}
            interface Worklet extends RealmInfo<Type.Worklet> {}

            // https://www.w3.org/TR/webdriver-bidi/#type-script-RealmType
            type Type = SuggestedString<
                Type.AudioWorklet | 
                Type.DedicatedWorker | 
                Type.PaintWorklet | 
                Type.ServiceWorker | 
                Type.SharedWorker | 
                Type.Window | 
                Type.Worker | 
                Type.Worklet>;

            namespace Type {
                type AudioWorklet = 'audio-worklet';
                type DedicatedWorker = 'dedicated-worker';
                type PaintWorklet = 'paint-worklet';
                type ServiceWorker = 'service-worker';
                type SharedWorker = 'shared-worker';
                type Window = 'window';
                type Worker = 'worker';
                type Worklet = 'worklet';
            }
        }

        // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptrealmtarget
        export import RealmTarget = Target.Realm;
        export import RegExpLocalValue = LocalValue.RegExpLocal;
        export import RegExpRemoteValue = RemoteValue.RegExpRemoteValue;
        
        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-scriptremoteobjectreference
        interface RemoteObjectReference extends RemoteReference {
            handle: Handle;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-RemoteReference
        interface RemoteReference {
            handle?: Handle;
            sharedId?: SharedId;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-RemoteValue
        export import RemoteValue = RemoteValue.Value;

        namespace RemoteValue {
            interface _<T extends Type = Type> {
                handle?: Handle;
                internalId?: InternalId;
                type: T;
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptarrayremotevalue
            interface ArrayRemoteValue<T extends Value = Value> extends _<Type.Array> {
                value?: ListRemoteValue<T>;
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptarraybufferremotevalue
            interface ArrayBufferRemoteValue extends _<Type.ArrayBuffer> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptdateremotevalue
            interface DateRemoteValue extends _<Type.Date>, Script.DateLocalValue {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scripterrorremotevalue
            interface ErrorRemoteValue extends _<Type.Error> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptfunctionremotevalue
            interface FunctionRemoteValue extends _<Type.Function> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptgeneratorremotevalue
            interface GeneratorRemoteValue extends _<Type.Generator> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scripthtmlcollectionremotevalue
            interface HTMLCollectionRemoteValue extends _<Type.HtmlCollection> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptlistremotevalue
            type ListRemoteValue<T extends Value = Value> = Array<T>;
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptmapremotevalue
            interface MapRemoteValue<K extends Value | string = Value | string, V extends Value = Value> extends _<Type.Map> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptmappingremotevalue
            type MappingRemoteValue<K extends Value | string = Value | string, V extends Value = Value> = Array<[K, V]>;

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptnodeproperties
            interface NodeProperties {
                attributes?: Record<string, string>;
                childNodeCount: number;
                children?: Array<NodeRemoteValue>;
                mode?: NodeProperties.Mode;
                namespaceURI?: string;
                nodeType?: number;
                nodeValue?: string;
                shadowRoot?: NodeRemoteValue | null;
            }

            namespace NodeProperties {
                type Mode = SuggestedString<Mode.Closed | Mode.Open>;
                namespace Mode {
                    type Closed = 'closed';
                    type Open = 'open';
                }
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptnoderemotevalue
            interface NodeRemoteValue extends _<Type.Node>, RemoteReference {
                value?: NodeProperties;
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptnodelistremotevalue
            interface NodeListRemoteValue<T extends Value = Value> extends _<Type.NodeList> {
                value?: ListRemoteValue<T>
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptobjectremotevalue
            interface ObjectRemoteValue<K extends Value | string = Value | string, V extends Value = Value> extends _<Type.Object> {
                value?: MappingRemoteValue<K, V>;
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptpromiseremotevalue
            interface PromiseRemoteValue extends _<Type.Promise> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptproxyremotevalue
            interface ProxyRemoteValue extends _<Type.Proxy> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptregexpremotevalue
            interface RegExpRemoteValue extends _<Type.RegExp> {}

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptsetremotevalue
            interface SetRemoteValue<T extends Value = Value> extends _<Type.Set> {
                value?: ListRemoteValue<T>
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptsymbolremotevalue
            interface SymbolRemoteValue extends _<Type.Symbol> {}

            type Type = string;
            namespace Type {
                type Array = 'array';
                export import Date = LocalValue.Type.Date;
                type Symbol = 'symbol';
                type Object = 'object';
                type Function = 'function';
                type Map = 'map';
                export import RegExp = LocalValue.Type.RegExp;
                type Set = 'set';
                type WeakMap = 'weakmap';
                type WeakSet = 'weakset';
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

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scripttypedarrayremotevalue
            interface TypedArrayRemoteValue extends _<Type.TypedArray> {}

            type Value = ArrayRemoteValue |
                ArrayBufferRemoteValue |
                DateRemoteValue |
                ErrorRemoteValue |
                FunctionRemoteValue |
                GeneratorRemoteValue |
                HTMLCollectionRemoteValue |
                MapRemoteValue |
                NodeRemoteValue |
                NodeListRemoteValue |
                ObjectRemoteValue |
                Script.PrimitiveProtocolValue |
                PromiseRemoteValue |
                ProxyRemoteValue |
                RegExpRemoteValue |
                SetRemoteValue |
                SymbolRemoteValue |
                TypedArrayRemoteValue |
                WeakMapRemoteValue |
                WeakSetRemoteValue |
                WindowProxyRemoteValue;

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptweakmapremotevalue
            interface WeakMapRemoteValue extends _<Type.WeakMap> {}
            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptweaksetremotevalue
            interface WeakSetRemoteValue extends _<Type.WeakSet> {}

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptwindowproxyproperties
            interface WindowProxyProperties {
                context: BrowsingContext.BrowsingContext;
            }

            // https://w3c.github.io/webdriver-bidi/#cddl-type-scriptwindowproxyremotevalue
            interface WindowProxyRemoteValue extends _<Type.Window> {
                value: WindowProxyProperties;
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-ResultOwnership
        type ResultOwnership = SuggestedString<ResultOwnership.None | ResultOwnership.Root>;
        namespace ResultOwnership {
            type None = 'none';
            type Root = 'root';
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-SerializationOptions
        interface SerializationOptions {
            includeShadowTree?: SerializationOptions.IncludeShadowTree;
            maxDomDepth?: number | null;
            maxObjectDepth?: number | null;
        }

        namespace SerializationOptions {
            type IncludeShadowTree = SuggestedString<IncludeShadowTree.All | IncludeShadowTree.None | IncludeShadowTree.Open>;
            namespace IncludeShadowTree {
                type All = 'all';
                type None = 'none';
                type Open = 'open';
            }
        }

        export import ServiceWorkerRealmInfo = RealmInfo.ServiceWorker;

        export import SetLocalValue = LocalValue.SetLocal;
        export import SetRemoteValue = RemoteValue.SetRemoteValue;

        // https://www.w3.org/TR/webdriver-bidi/#type-script-SharedId
        type SharedId = string;
        export import SharedWorkerRealmInfo = RealmInfo.SharedWorker;

        // https://www.w3.org/TR/webdriver-bidi/#cddl-type-scriptsharedreference
        interface SharedReference extends RemoteReference {
            sharedId: SharedId;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-StackFrame
        interface StackFrame {
            columnNumber: number;
            functionName: string;
            lineNumber: number;
            url: string;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-StackTrace
        interface StackTrace {
            callFrames: Array<StackFrame>;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-Source
        interface Source {
            context?: BrowsingContext.BrowsingContext;
            realm: Realm;
            userContext?: Browser.UserContext;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-script-Target
        type Target = Target.Context | Target.Realm;
        namespace Target {
            interface Context {
                context: BrowsingContext.BrowsingContext;
                sandbox?: string;
            }

            interface Realm {
                realm: Script.Realm;
            }
        }

        type Type = SuggestedString<PrimitiveProtocolValue.Type | LocalValue.Type | RemoteValue.Type>;
        export import TypedArrayRemoteValue = RemoteValue.TypedArrayRemoteValue;

        interface Value<T extends Type = Type, V = unknown> {
            type: T;
            value: V;
        }

        export import WeakMapRemoteValue = RemoteValue.WeakMapRemoteValue;
        export import WeakSetRemoteValue = RemoteValue.WeakSetRemoteValue;
        export import WindowProxyProperties = RemoteValue.WindowProxyProperties;
        export import WindowProxyRemoteValue = RemoteValue.WindowProxyRemoteValue;
        export import WindowRealmInfo = RealmInfo.Window;
        export import WorkerRealmInfo = RealmInfo.Worker;
        export import WorkletRealmInfo = RealmInfo.Worklet;
    }

    namespace Session {
        // https://www.w3.org/TR/webdriver-bidi/#type-session-CapabilitiesRequest
        interface CapabilitiesRequest {
            alwaysMatch?: CapabilityRequest;
            // TODO review ? firstMatch: [*session.CapabilityRequest]
            firstMatch?: Array<CapabilityRequest>;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-CapabilityRequest
        interface CapabilityRequest {
            acceptInsecureCerts?: boolean;
            browserName?: string;
            browserVersion?: string;
            platformName?: string;
            proxy?: ProxyConfiguration;
            // TODO review ? unhandledPromptBehavior: session.UserPromptHandler,
            unhandledPromptBehavior?: UserPromptHandler;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-ProxyConfiguration
        interface ProxyConfiguration<T extends ProxyConfiguration.Type = ProxyConfiguration.Type> {
            proxyType: T;
        }

        namespace ProxyConfiguration {
            interface AutodetectProxyConfiguration extends ProxyConfiguration<Type.Auto> {}
            interface DirectProxyConfiguration extends ProxyConfiguration<Type.Direct> {}
            
            interface ManualProxyConfiguration extends ProxyConfiguration<Type.Manual> {
                httpProxy?: string;
                noProxy?: Array<string>;
                socksProxy?: string;
                socksVersion?: number;
                sslProxy?: string;
            }

            interface PacProxyConfiguration extends ProxyConfiguration<Type.Pac> {
                proxyAutoconfigUrl: string;
            }
            
            interface SocksProxyConfiguration extends ManualProxyConfiguration {
                socksProxy: string;
            }

            interface SystemProxyConfiguration extends ProxyConfiguration<Type.System> {}

            type Type = SuggestedString<Type.Auto | Type.Direct | Type.Manual | Type.Pac | Type.System>;
            namespace Type {
                type Auto = 'autodetect';
                type Direct = 'direct';
                type Manual = 'manual';
                type Pac = 'pac';
                type System = 'system';
            }
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-Subscription
        type Subscription = string;

        // https://www.w3.org/TR/webdriver-bidi/#type-session-SubscriptionParameters
        interface SubscribeParameters {
            contexts?: Array<BrowsingContext.BrowsingContext>;
            events: Array<string>;
            userContexts?: Array<Browser.UserContext>;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-UnsubscribeByIDRequest
        interface UnsubscribeByIDRequest {
            subscriptions: Array<Subscription>;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-UnsubscribeByAttributesRequest
        interface UnsubscribeByAttributesRequest {
            events: Array<string>;
        }

        // https://www.w3.org/TR/webdriver-bidi/#type-session-UserPromptHandler
        interface UserPromptHandler {
            alert?: UserPromptHandler.Type;
            beforeUnload?: UserPromptHandler.Type;
            confirm?: UserPromptHandler.Type;
            default?: UserPromptHandler.Type;
            file?: UserPromptHandler.Type;
            prompt?: UserPromptHandler.Type;
        }

        namespace UserPromptHandler {
            // https://www.w3.org/TR/webdriver-bidi/#type-session-UserPromptHandlerType
            type Type = SuggestedString<Type.Accept | Type.Dismiss | Type.Ignore>;
            namespace Type {
                type Accept = 'accept';
                type Dismiss = 'dismiss';
                type Ignore = 'ignore';
            }
        }
    }

    namespace Storage {
        // https://www.w3.org/TR/webdriver-bidi/#type-storage-PartitionKey
        interface PartitionKey {
            sourceOrigin?: string;
            userContext?: string;
        }
    }

    namespace WebExtension {
        // https://www.w3.org/TR/webdriver-bidi/#type-webExtension-Extension
        type Extension = string;
    }
}

export namespace WebExtension {

}
