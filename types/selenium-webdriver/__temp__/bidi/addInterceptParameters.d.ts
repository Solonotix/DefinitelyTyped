import type { MapOf } from '../_internal.js';
import type { IUrlPatternAsMap, UrlPattern } from './urlPattern.js';

export interface IAddInterceptParameters {
    phases: Array<string>;
    urlPatterns?: Array<IUrlPatternAsMap | IUrlStringPattern>;
}

export interface IUrlStringPattern {
    type: "string";
    pattern: string;
}

export class AddInterceptParameters {
    constructor(phases: string | Array<string>);

    asMap(): MapOf<IAddInterceptParameters>;

    urlPattern(pattern: UrlPattern): this;

    urlPatterns(patterns: Array<UrlPattern>): this;

    urlStringPattern(pattern: string): this;

    urlStringPatterns(patterns: Array<string>): this;
}

export namespace AddInterceptParameters {
    export { IAddInterceptParameters, IUrlStringPattern }
}
