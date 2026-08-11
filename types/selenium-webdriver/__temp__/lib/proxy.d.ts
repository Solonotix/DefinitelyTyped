import type { SuggestedString } from '../_internal.js';

export { };

type ProxyTypeAuto = 'autodetect';
type ProxyTypeDirect = 'direct';
type ProxyTypeManual = 'manual';
type ProxyTypePac = 'pac';
type ProxyTypeSystem = 'system';
export type ProxyType = SuggestedString<
    ProxyTypeAuto | ProxyTypeDirect | ProxyTypeManual | ProxyTypePac | ProxyTypeSystem
>;

export interface Config<T extends ProxyType = ProxyType> {
    proxyType: T;
}

export interface ManualConfig extends Config<ProxyTypeManual> {
    ftpProxy?: string;
    httpProxy?: string;
    noProxy?: string;
    sslProxy?: string;
}

export interface SocksConfig extends Config<ProxyTypeManual> {
    socksProxy: string;
    socksVersion?: number;
}

export interface IManualProxyArg {
    bypass?: Array<string>;
    ftp?: string;
    http?: string;
    https?: string;
}

export interface PacConfig extends Config<ProxyTypePac> {
    proxyAutoconfigUrl: string;
}

export function direct(): Config<ProxyTypeDirect>;

export function manual(config: IManualProxyArg): ManualConfig;

export function pac(proxyAutoconfigUrl: string): PacConfig;

export function socks(socksProxy: string, socksVersion?: number): SocksConfig;

export function system(): Config<ProxyTypeSystem>;
