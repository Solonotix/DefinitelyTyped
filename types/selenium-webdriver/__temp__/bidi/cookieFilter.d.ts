import type { MapOf } from '../_internal.js';
import type { BytesValue, IBytesValue, SameSite } from './networkTypes.js';

export interface ICookieFilter {
    domain?: string;
    expiry?: number;
    httpOnly?: boolean;
    name?: string;
    path?: string;
    sameSite?: SameSite;
    secure?: boolean;
    size?: number;
    value?: IBytesValue;
}

export class CookieFilter {
    asMap(): MapOf<ICookieFilter>;

    domain(domain: string): this;

    expiry(expiry: number): this;

    httpOnly(httpOnly: boolean): this;

    name(name: string): this;

    path(path: string): this;

    sameSite(sameSite: SameSite): this;

    secure(secure: boolean): this;

    size(size: number): this;

    value(value: BytesValue): this;
}
