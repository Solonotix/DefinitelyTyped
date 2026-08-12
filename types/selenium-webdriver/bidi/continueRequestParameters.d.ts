import type { BytesValue, Header } from './networkTypes.js';

export class ContinueRequestParameters {
    constructor(request: string);

    body(value: BytesValue): this;
    cookies(cookieHeaders: Header[]): this;
    headers(headers: Header[]): this;
    method(method: string): this;
    url(url: string): this;
    asMap(): Map<string, unknown>;
}
