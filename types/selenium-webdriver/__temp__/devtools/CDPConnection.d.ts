export class CdpConnection {
    cmd_id: number;
    targetID: string | null;
    sessionId: string | null;

    constructor(wsConnection: string);

    execute<T>(method: string, params: T, callback: CallableFunction): void;
    send<P, T>(method: string, params: P): Promise<T>;
}
