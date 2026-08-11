import type * as events from 'node:events';

import * as ws from 'ws';

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

export default class Bidi extends events.EventEmitter {
  _ws: ws.WebSocket;
  browsingContexts: Array<unknown>;
  connected: boolean;
  events: Array<unknown>;
  id: number;

  constructor(_webSocketUrl: string | URL);

  get socket(): WebSocket;

  get isConnected(): boolean;

  get status(): Promise<BidiStatusResponse>;

  waitForConnection(): Promise<void>;

  send<P extends BidiSendArg, T = unknown>(params: P): Promise<T>;

  subscribe(events: Array<string>, browsingContexts: Array<string>): Promise<void>;

  unsubscribe(events: Array<string>, browsingContexts: Array<string>): Promise<void>;

  close(): Promise<void>;
}

export namespace Internal {
  export { Bidi };
}
