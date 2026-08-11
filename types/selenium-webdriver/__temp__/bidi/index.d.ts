import { EventEmitter } from 'node:events';

import type * as ws from 'ws';

import type {
    Bidi as IBidi,
    BidiLogLevel,
    BidiStatusResponse,
    BidiStatusResponseResult,
    BidiStatusResponseResultBuild,
    BidiStatusResponseResultOs,
} from './_internal.js';
import type { AddInterceptParameters } from './addInterceptParameters.js';
import type { ArgumentValue } from './argumentValue.js';
import type Browser = require('./browser.js');
import type * as BrowsingContext from './browsingContext.js';
import type * as BrowsingContextInspector from './browsingContextInspector.js';
import type * as BrowsingContextTypes from './browsingContextTypes.js';
import type * as CaptureScreenshotParameters from './captureScreenshotParameters.js';
import type * as ClientWindowInfo from './clientWindowInfo.js';
import type * as ClipRectangle from './clipRectangle.js';
import type * as ContinueRequestParameters from './continueRequestParameters.js';
import type * as ContinueResponseParameters from './continueResponseParameters.js';
import type * as CookieFilter from './cookieFilter.js';
import type * as CreateContextParameters from './createContextParameters.js';
import type * as EvaluateResult from './evaluateResult.js';
import type * as FilterBy from './filterBy.js';
import type * as Input from './input.js';
import type * as InterceptPhase from './interceptPhase.js';
import type * as LogEntries from './logEntries.js';
import type * as LogInspector from './logInspector.js';
import type * as Network from './network.js';
import type * as NetworkInspector from './networkInspector.js';
import type * as NetworkTypes from './networkTypes.js';
import type * as PartialCookie from './partialCookie.js';
import type * as PartitionDescriptor from './partitionDescritptor.js';
import type * as PartitionKey from './partitionKey.js';
import type * as Permissions from './external/permissions.js';
import type * as ProtocolType from './protocolType.js';
import type * as ProtocolValue from './protocolValue.js';
import type * as ProviderResponseParameters from './providerResponseParameters.js';
import type * as RealmInfo from './realmiInfo.js';
import type * as ResultOwnership from './resultOwnership.js';
import type * as ScriptManager from './scriptManager.js';
import type * as ScriptTypes from './scriptTypes.js';
import type * as Storage from './storage.js';
import type * as UrlPattern from './urlPattern.js';

declare class Bidi extends EventEmitter implements IBidi {
    _ws: ws.WebSocket;
    browsingContexts: Array<string>;
    connected: boolean;
    events: Array<string>;
    id: number;

    constructor(_webSocketUrl: string | URL);

    get socket(): ws.WebSocket;

    get isConnected(): boolean;

    get status(): Promise<BidiStatusResponse>;

    waitForConnection(): Promise<void>;

    send<P extends Record<string, unknown>, T = unknown>(params: P): Promise<T>;

    subscribe(events?: string | Array<string>, browsingContexts?: string | Array<string>): Promise<void>;

    unsubscribe(events: string | Array<string>, browsingContexts?: string | Array<string>): Promise<void>;

    close(): Promise<void>;
}

declare namespace Bidi {
    export namespace External {
        export { Permissions };
    }

    export {
        AddInterceptParameters,
        ArgumentValue,
        BidiLogLevel,
        BidiStatusResponseResultBuild,
        BidiStatusResponseResultOs,
        BidiStatusResponseResult,
        BidiStatusResponse,
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
        FilterBy,
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
        ProviderResponseParameters,
        RealmInfo,
        ResultOwnership,
        ScriptManager,
        ScriptTypes,
        Storage,
        UrlPattern
    };

}

export = Bidi;