import type { EventEmitter } from 'node:events';
import type { WebSocket } from 'ws';

import type { SuggestedString } from '../_internal.js';

export type BidiLogLevel = SuggestedString<'debug' | 'error' | 'info' | 'warn'>;

export interface BidiSendArg<T extends Record<string, unknown> = Record<string, unknown>> {
    method: string;
    params: T;
}

export interface BidiSendPayload {
    id: number;
}

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

export interface Bidi extends EventEmitter {
    browsingContexts: string[];
    connected: boolean;
    events: string[];
    id: number;

    readonly socket: WebSocket;
    readonly isConnected: boolean;
    readonly status: Promise<BidiStatusResponse>;

    waitForConnection(): Promise<void>;
    send<P extends BidiSendArg, T = unknown>(params: P): Promise<T>;
    subscribe(events?: string | string[], browsingContexts?: string | string[]): Promise<void>;
    unsubscribe(events: string | string[], browsingContexts?: string | string[]): Promise<void>;
    close(): Promise<void>;
}

export namespace ClientWindow {
    type State = SuggestedString<'fullscreen' | 'maximized' | 'minimized' | 'normal'>;

    interface StateEnum {
        readonly FULLSCREEN: 'fullscreen';
        readonly MAXIMIZED: 'maximized';
        readonly MINIMIZED: 'minimized';
        readonly NORMAL: 'normal';
    }

    interface Info {
        active: boolean;
        clientWindow: string;
        height: number;
        state: State;
        width: number;
        x: number;
        y: number;
    }
}

export interface Browser {
    createUserContext(): Promise<string>;
    getUserContexts(): Promise<string[]>;
    removeUserContext(userContext: string): Promise<void>;
    getClientWindows(): Promise<ClientWindow.Info[]>;
}

export namespace BrowsingContext {
    type Readiness = SuggestedString<Readiness.Complete | Readiness.Interactive | Readiness.None>;
    namespace Readiness {
        type Complete = 'complete';
        type Interactive = 'interactive';
        type None = 'none';
    }

    type Type = SuggestedString<Type.Tab | Type.Window>;
    namespace Type {
        type Tab = 'tab';
        type Window = 'window';
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
    }
}
