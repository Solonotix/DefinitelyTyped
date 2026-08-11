export type AddressFamily = 'IPv4' | 'IPv6' | (string & {});

export interface HostAndPort {
    host: string;
    port: number | null;
}

export function getAddress(family?: AddressFamily): string | undefined;

export function getLoopbackAddress(family?: AddressFamily): string | undefined;

export function splitHostAndPort(hostport: string): HostAndPort;
