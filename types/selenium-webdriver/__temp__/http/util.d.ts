export function getStatus(url: string): Promise<Record<string, unknown>>;

export class CancellationError {}

export function waitForServer(
    url: string,
    timeout: number,
    cancelToken?: PromiseLike<unknown>,
): Promise<Record<string, unknown>>;

export function waitForUrl(url: string, timeout: number, cancelToken?: PromiseLike<unknown>): Promise<void>;
