/** Internal HTTP polling helpers shipped by selenium-webdriver. */
export function getStatus(url: string): Promise<Record<string, unknown>>;

/** Rejection used when a polling cancellation token resolves first. */
export class CancellationError {}

export function waitForServer(
    url: string,
    timeout: number,
    opt_cancelToken?: PromiseLike<unknown>,
): Promise<Record<string, unknown>>;

export function waitForUrl(url: string, timeout: number, opt_cancelToken?: PromiseLike<unknown>): Promise<void>;
