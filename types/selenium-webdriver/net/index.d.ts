/** Internal network helpers shipped by selenium-webdriver. */
export function getAddress(family?: 'IPv4' | 'IPv6' | (string & {})): string | undefined;

export function getLoopbackAddress(family?: 'IPv4' | 'IPv6' | (string & {})): string | undefined;

export interface HostAndPort {
    host: string;
    port: number | null;
}

export function splitHostAndPort(hostport: string): HostAndPort;
