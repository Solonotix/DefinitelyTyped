import type { MapOf } from '../_internal.js';

export interface IUrlPatternAsMap {
    hostname?: string;
    pathname?: string;
    port?: number;
    protocol?: string;
    search?: string;
    type: 'pattern';
}

export class UrlPattern {
    protocol(protocol: string): this;

    hostname(hostname: string): this;

    port(port: number): this;

    pathname(pathname: string): this;

    /**
     * Sets the search parameter in the URL pattern.
     *
     * @param {string} search - The search parameter to be set.
     * @returns {UrlPattern} - Returns the updated instance of the URL pattern for chaining.
     */
    search(search: string): this;

    asMap(): MapOf<IUrlPatternAsMap>;
}
