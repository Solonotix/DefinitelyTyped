export type ProxyType = 'autodetect' | 'direct' | 'manual' | 'pac' | 'system' | (string & {});

export interface Config<T extends ProxyType = ProxyType> {
    proxyType: T;
}

export interface ManualConfig extends Config<'manual'> {
    ftpProxy?: string;
    httpProxy?: string;
    noProxy?: string[];
    sslProxy?: string;
}

export interface SocksConfig extends Config<'manual'> {
    socksProxy: string;
    socksVersion?: number;
}

export interface ManualOptions {
    bypass?: string[];
    ftp?: string;
    http?: string;
    https?: string;
}

export interface PacConfig extends Config<'pac'> {
    proxyAutoconfigUrl: string;
}

export function direct(): Config<'direct'>;
export function manual(options: ManualOptions): ManualConfig;
export function pac(proxyAutoconfigUrl: string): PacConfig;
export function socks(socksProxy: string, socksVersion?: number): SocksConfig;
export function system(): Config<'system'>;
