import { Types } from '../bidi/_internal.js';

export import Config = Types.Session.ProxyConfiguration;
export import ManualConfig = Config.ManualProxyConfiguration;
export import ProxyType = Config.Type;
export import SocksConfig = Config.SocksProxyConfiguration;
export import PacConfig = Config.PacProxyConfiguration;

export interface IManualProxyArg {
    bypass?: Array<string>;
    ftp?: string;
    http?: string;
    https?: string;
}

export function direct(): Config.DirectProxyConfiguration;

export function manual(config: IManualProxyArg): ManualConfig;

export function pac(proxyAutoconfigUrl: string): PacConfig;

export function socks(socksProxy: string, socksVersion?: number): SocksConfig;

export function system(): Config.SystemProxyConfiguration;
