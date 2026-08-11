import type { MapOf } from '../_internal.js';
import type { BytesValue, BytesValueType, Header, IBytesValue, IHeader } from './networkTypes.js';

export interface IContinueRequestParameters<T extends BytesValueType = BytesValueType, V extends string = string> {
    body?: IBytesValue<T, V>;
    cookies?: Array<IHeader>;
    headers?: Array<IHeader>;
    method?: string;
    url?: string;
}

export class ContinueRequestParameters<T extends BytesValueType = BytesValueType, V extends string = string> {
    constructor(request: string);

    asMap(): MapOf<IContinueRequestParameters>;

    body(value: BytesValue<T, V>): this;

    cookies(cookieHeaders: Array<Header>): this;

    headers(headers: Array<Header>): this;

    method(method: string): this;

    url(url: string): this;
}
