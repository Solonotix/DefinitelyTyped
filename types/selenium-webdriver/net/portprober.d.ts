/** Internal port-probing helpers shipped by selenium-webdriver. */
/**
 * @param opt_host The bound host to test the {@code port} against. Defaults to {@code INADDR_ANY}.
 * @return A promise that will resolve to a free port. If a port cannot be found, the promise will be rejected.
 */
export function findFreePort(opt_host?: string): Promise<number>;

/**
 * Tests if a port is free.
 * @param port The port to test.
 * @param opt_host The bound host to test the {@code port} against. Defaults to {@code INADDR_ANY}.
 * @return A promise that will resolve with whether the port
 *     is free.
 */
export function isFree(port: number, opt_host?: string): Promise<boolean>;
