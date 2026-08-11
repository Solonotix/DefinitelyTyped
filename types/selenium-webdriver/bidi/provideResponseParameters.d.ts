import type { BytesValue, Header } from "./networkTypes";

export class ProvideResponseParameters {
    constructor(request: string);

    body(value: BytesValue): this;
    cookies(cookieHeaders: Header[]): this;
    headers(headers: Header[]): this;
    reasonPhrase(reasonPhrase: string): this;
    statusCode(statusCode: number): this;
    asMap(): Map<string, unknown>;
}
