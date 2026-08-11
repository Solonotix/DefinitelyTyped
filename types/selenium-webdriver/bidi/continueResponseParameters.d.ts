import type { Header } from "./networkTypes";

export class ContinueResponseParameters {
    // TODO: The staged declaration used RequestData here, but the 4.46.0 runtime
    // stores this value as the BiDi `request` parameter, whose protocol value is an ID string.
    constructor(request: string);

    cookies(cookieHeaders: Header[]): this;
    credentials(username: string, password: string): this;
    headers(headers: Header[]): this;
    reasonPhrase(reasonPhrase: string): this;
    statusCode(statusCode: number): this;
    asMap(): Map<string, unknown>;
}
