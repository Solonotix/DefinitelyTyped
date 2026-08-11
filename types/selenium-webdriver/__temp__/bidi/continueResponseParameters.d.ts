import type { MapOf } from '../_internal.js';
import type { Header, IHeader } from './networkTypes.js';

export interface IContinueResponseCredentials {
    type: 'password';
    username: string;
    password: string;
}

export interface IContinueResponseParameters {
    request: string;
    cookies?: Array<IHeader>;
    credentials?: IContinueResponseCredentials;
    headers?: Array<IHeader>;
    reasonPhrase?: string;
    statusCode?: number;
}

export class ContinueResponseParameters {
    constructor(request: string);

    cookies(cookieHeaders: Array<Header>): this;
    credentials(username: string, password: string): this;
    headers(headers: Array<Header>): this;
    reasonPhrase(reasonPhrase: string): this;
    statusCode(statusCode: number): this;
    asMap(): MapOf<IContinueResponseParameters>;
}
