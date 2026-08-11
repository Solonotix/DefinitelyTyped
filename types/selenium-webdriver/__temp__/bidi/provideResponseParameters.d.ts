import type { BytesValue, Header, IBytesValue, IHeader } from './networkTypes.js';

export interface IProvideResponseParameters {
    body?: IBytesValue;
    cookies?: Array<IHeader>;
    headers?: Array<IHeader>;
    reasonPhrase?: string;
    request: string;
    statusCode?: number;
}

export class ProvideResponseParameters {
    constructor(request: string);

    body(value: BytesValue): this;

    cookies(cookieHeaders: Array<Header>): this;

    headers(headers: Array<Header>): this;

    reasonPhrase(reasonPhrase: string): this;

    statusCode(statusCode: number): this;

    asMap(): Map<keyof IProvideResponseParameters, IProvideResponseParameters[keyof IProvideResponseParameters]>;
}
