import type { MapOf } from '../_internal.js';
import type { BytesValue, IBytesValue, SameSite } from './networkTypes.js';

export interface IPartialCookie {
    domain: string;
    expiry?: number;
    httpOnly?: boolean;
    name: string;
    path?: string;
    sameSite?: SameSite;
    secure?: boolean;
    size?: number;
    value: IBytesValue;
}

export class PartialCookie {
    constructor(name: string, value: BytesValue, domain: string);

    asMap(): MapOf<IPartialCookie>;

    expiry(expiry: number): this;

    httpOnly(httpOnly: boolean): this;

    path(path: string): this;

    sameSite(sameSite: SameSite): this;

    secure(secure: boolean): this;

    size(size: number): this;
}
