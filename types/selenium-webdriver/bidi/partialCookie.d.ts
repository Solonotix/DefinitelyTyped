import type { BytesValue } from "./networkTypes";

export type SameSiteValue = "strict" | "lax" | "none" | "default";

export class PartialCookie {
    constructor(name: string, value: BytesValue, domain: string);

    path(path: string): this;
    size(size: number): this;
    httpOnly(httpOnly: boolean): this;
    secure(secure: boolean): this;
    sameSite(sameSite: SameSiteValue): this;
    expiry(expiry: number): this;
    asMap(): Map<string, unknown>;
}
