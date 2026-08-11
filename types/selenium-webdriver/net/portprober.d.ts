/** Internal port-probing helpers shipped by selenium-webdriver. */
export function findFreePort(opt_host?: string): Promise<number>;

export function isFree(port: number, opt_host?: string): Promise<boolean>;
