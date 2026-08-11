export function findFreePort(host?: string): Promise<number | 'Unable to find a free port'>;

export function isFree(port: number, host?: string): Promise<boolean>;
