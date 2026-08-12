import type { WebSocket } from 'ws';

export class CdpConnection {
    cmd_id: number;
    targetID: string | null;
    sessionId: string | null;

    constructor(wsConnection: WebSocket);

    execute<P>(method: string, params: P, callback: (error?: Error) => void): void;
    send<T = unknown, P = unknown>(method: string, params: P): Promise<T>;
}
