import { EventEmitter } from 'node:events';

import type { WebSocket } from 'ws';

import type {
    Bidi as IBidi,
    BidiLogLevel,
    BidiSendArg,
    BidiStatusResponse,
    BidiStatusResponseResult,
    BidiStatusResponseResultBuild,
    BidiStatusResponseResultOs,
} from './_internal.js';
import type * as AddInterceptParameters from './addInterceptParameters.js';
import type * as ArgumentValue from './argumentValue.js';
import type Browser = require('./browser');
import type BrowsingContext = require('./browsingContext');
import type BrowsingContextInspector = require('./browsingContextInspector');
import type * as BrowsingContextTypes from './browsingContextTypes.js';
import type * as CaptureScreenshotParameters from './captureScreenshotParameters.js';
import type * as ClientWindowInfo from './clientWindowInfo.js';
import type * as ClipRectangle from './clipRectangle.js';
import type * as ContinueRequestParameters from './continueRequestParameters.js';
import type * as ContinueResponseParameters from './continueResponseParameters.js';
import type * as CookieFilter from './cookieFilter.js';
import type * as CreateContextParameters from './createContextParameters.js';
import type * as EvaluateResult from './evaluateResult.js';
import type * as External from './external/_internal.js';
import type * as FilterBy from './filterBy.js';
import type * as Generated from './generated/_internal.js';
import type Input = require('./input');
import type * as InterceptPhase from './interceptPhase.js';
import type * as LogEntries from './logEntries.js';
import type LogInspector = require('./logInspector');
import type { Network } from './network.js';
import type NetworkInspector = require('./networkInspector');
import type * as NetworkTypes from './networkTypes.js';
import type * as PartialCookie from './partialCookie.js';
import type * as PartitionDescriptor from './partitionDescriptor.js';
import type * as PartitionKey from './partitionKey.js';
import type * as ProtocolType from './protocolType.js';
import type * as ProtocolValue from './protocolValue.js';
import type * as ProvideResponseParameters from './provideResponseParameters.js';
import type * as RealmInfo from './realmInfo.js';
import type * as ResultOwnership from './resultOwnership.js';
import type ScriptManager = require('./scriptManager');
import type * as ScriptTypes from './scriptTypes.js';
import type Storage = require('./storage');
import type * as UrlPattern from './urlPattern.js';

declare class Bidi extends EventEmitter implements IBidi {
    browsingContexts: string[];
    connected: boolean;
    events: string[];
    id: number;

    constructor(webSocketUrl: string | URL);

    get socket(): WebSocket;
    get isConnected(): boolean;
    get status(): Promise<Bidi.StatusResult>;

    waitForConnection(): Promise<void>;
    send<P extends BidiSendArg, T = unknown>(params: P): Promise<T>;
    subscribe(events?: string | string[], browsingContexts?: string | string[]): Promise<void>;
    unsubscribe(events: string | string[], browsingContexts?: string | string[]): Promise<void>;
    close(): Promise<void>;
}

declare namespace Bidi {
    export type BuildInfo = BidiStatusResponseResultBuild;
    export type OsInfo = BidiStatusResponseResultOs;
    export type Params = BidiSendArg;
    export type ResultData = BidiStatusResponseResult;
    export type StatusResult = BidiStatusResponse;

    export {
        AddInterceptParameters,
        ArgumentValue,
        BidiLogLevel,
        Browser,
        BrowsingContext,
        BrowsingContextInspector,
        BrowsingContextTypes,
        CaptureScreenshotParameters,
        ClientWindowInfo,
        ClipRectangle,
        ContinueRequestParameters,
        ContinueResponseParameters,
        CookieFilter,
        CreateContextParameters,
        EvaluateResult,
        External,
        FilterBy,
        Generated,
        Input,
        InterceptPhase,
        LogEntries,
        LogInspector,
        Network,
        NetworkInspector,
        NetworkTypes,
        PartialCookie,
        PartitionDescriptor,
        PartitionKey,
        ProtocolType,
        ProtocolValue,
        ProvideResponseParameters,
        RealmInfo,
        ResultOwnership,
        ScriptManager,
        ScriptTypes,
        Storage,
        UrlPattern,
    };
}

export = Bidi;
