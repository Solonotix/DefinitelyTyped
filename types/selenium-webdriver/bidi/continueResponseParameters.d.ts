import type { Header } from './networkTypes.js';

export class ContinueResponseParameters {
    constructor(request: string);

    cookies(cookieHeaders: Header[]): this;
    credentials(username: string, password: string): this;
    headers(headers: Header[]): this;
    reasonPhrase(reasonPhrase: string): this;
    statusCode(statusCode: number): this;
    asMap(): Map<string, unknown>;
}
