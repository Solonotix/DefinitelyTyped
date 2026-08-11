import type { MapOf, SuggestedString } from '../_internal.js';
import type { Network } from './_internal.js';
import type { NavigationInfo } from './browsingContextTypes.js';

export { };

export interface MessageParameters {
    readonly id: string | null;
    readonly navigation: Network.Navigation | null;

    readonly redirectCount: number;

    readonly request: IRequestData;

    readonly timestamp: number;
}

export interface BeforeRequestSentParameters extends MessageParameters {
    readonly initiation: IInitiator;
}

export interface FetchErrorParameters extends MessageParameters {
    readonly errorText: string;
}

export interface ResponseStartedParameters extends MessageParameters {
    readonly response: IResponseData;
}

export interface IBaseParameters {
    get id(): string | null;

    get navigation(): NavigationInfo | null;

    get redirectCount(): number;

    get request(): RequestData;

    get timestamp(): number;
}

declare class BaseParameters implements IBaseParameters {
    readonly _id: string | null;
    readonly _navigation: NavigationInfo | null;
    readonly _redirectCount: number;
    readonly _request: RequestData;
    readonly _timestamp: number;

    constructor(
        id: string | null,
        navigation: Network.Navigation | undefined,
        redirectCount: number,
        request: IRequestData,
        timestamp: number,
    );

    get id(): string | null;

    get navigation(): NavigationInfo | null;

    get redirectCount(): number;

    get request(): RequestData;

    get timestamp(): number;
}

export interface IBeforeRequestSent extends IBaseParameters {
    get initiator(): Initiator;
}

export class BeforeRequestSent extends BaseParameters implements IBeforeRequestSent {
    readonly _initiator: Initiator;

    constructor(
        id: string,
        navigation: Network.Navigation,
        redirectCount: number,
        request: IRequestData,
        timestamp: number,
        initiator: IInitiator,
    );

    get initiator(): Initiator;
}

type BytesValueTypeString = 'string';
type BytesValueTypeBase64 = 'base64';
export type BytesValueType = SuggestedString<BytesValueTypeString | BytesValueTypeBase64>;
export interface IBytesValueType {
    BASE64: BytesValueTypeBase64;
    STRING: BytesValueTypeString;
}

export interface IBytesValue<T extends BytesValueType = BytesValueType, V extends string = string> {
    type: T;
    value: V;
}

export class BytesValue<T extends BytesValueType = BytesValueType, V extends string = string> {
    readonly _type: T;
    readonly _value: V;
    static readonly Type: IBytesValueType;

    constructor(type: T, value: V);

    asMap(): MapOf<IBytesValue<T, V>>;

    get type(): T;

    get value(): V;
}

export interface ICookie<T extends BytesValue = BytesValue> {
    readonly domain: string | undefined;
    readonly expires: number | undefined;
    readonly httpOnly: boolean | undefined;
    readonly name: string;
    readonly path: string | undefined;
    readonly sameSite: string | undefined;
    readonly secure: boolean | undefined;
    readonly size: number | undefined;
    readonly value: T;
}

export class Cookie<T extends BytesValue = BytesValue> implements ICookie<T> {
    readonly _domain?: string;
    readonly _expires?: number;
    readonly _httpOnly?: boolean;
    readonly _name: string;
    readonly _path?: string;
    readonly _sameSite?: string;
    readonly _secure?: boolean;
    readonly _size?: number;
    readonly _value: T;

    constructor(
        name: string,
        value: T,
        domain?: string,
        path?: string,
        size?: number,
        httpOnly?: boolean,
        secure?: boolean,
        sameSite?: string,
        expires?: number,
    );

    get domain(): string | undefined;

    get expires(): number | undefined;

    get httpOnly(): boolean | undefined;

    get name(): string;

    get path(): string | undefined;

    get sameSite(): string | undefined;

    get secure(): boolean | undefined;

    get size(): number | undefined;

    get value(): T;
}

export interface IFetchError {
    get errorText(): string;
}

export class FetchError extends BaseParameters implements IFetchError {
    readonly _errorText: string;

    constructor(
        id: string,
        navigation: Network.Navigation,
        redirectCount: number,
        request: IRequestData,
        timestamp: number,
        errorText: string,
    );

    get errorText(): string;
}

export interface IFetchTimingInfo {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly dnsEnd: number;
    readonly dnsStart: number;
    readonly fetchStart: number;
    readonly originTime: number;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly requestTime: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly tlsStart: number;
}

declare class FetchTimingInfo implements IFetchTimingInfo {
    readonly _connectEnd: number;
    readonly _connectStart: number;
    readonly _dnsEnd: number;
    readonly _dnsStart: number;
    readonly _fetchStart: number;
    readonly _originTime: number;
    readonly _redirectEnd: number;
    readonly _redirectStart: number;
    readonly _requestStart: number;
    readonly _requestTime: number;
    readonly _responseEnd: number;
    readonly _responseStart: number;
    readonly _tlsStart: number;

    constructor(
        originTime: number,
        requestTime: number,
        redirectStart: number,
        redirectEnd: number,
        fetchStart: number,
        dnsStart: number,
        dnsEnd: number,
        connectStart: number,
        connectEnd: number,
        tlsStart: number,
        requestStart: number,
        responseStart: number,
        responseEnd: number,
    );

    get connectEnd(): number;

    get connectStart(): number;

    get dnsEnd(): number;

    get dnsStart(): number;

    get fetchStart(): number;

    get originTime(): number;

    get redirectEnd(): number;

    get redirectStart(): number;

    get requestStart(): number;

    get requestTime(): number;

    get responseEnd(): number;

    get responseStart(): number;

    get tlsStart(): number;
}

export interface IHeader {
    name: string;
    value: IBytesValue<BytesValueTypeString>;
}

export class Header implements IHeader {
    readonly _name: string;
    readonly _value: BytesValue<BytesValueTypeString>;

    constructor(name: string, value: BytesValue<BytesValueTypeString>);

    get name(): string;

    get value(): BytesValue<BytesValueTypeString>;

    asMap(): MapOf<IHeader>;
}

export interface IInitiator {
    readonly columnNumber: number;
    readonly lineNumber: number;
    readonly request: string;
    readonly stackTrace: string;
    readonly type: string;
}

/**
 * Represents source in the network.
 * Described in https://w3c.github.io/webdriver-bidi/#type-network-Initiator.
 */
declare class Initiator {
    readonly _columnNumber: number;
    readonly _lineNumber: number;
    readonly _request: string;
    readonly _stackTrace: string;
    readonly _type: string;

    constructor(type: string, columnNumber: number, lineNumber: number, stackTrace: string, request: string);

    get columnNumber(): number;

    get lineNumber(): number;

    get request(): string;

    get stackTrace(): string;

    get type(): string;
}

export interface IRequestData {
    readonly bodySize: number;
    readonly cookies: Array<ICookie>;
    readonly headers: Array<IHeader>;
    readonly headersSize: number;
    readonly method: string;
    readonly request: string;
    readonly timings: IFetchTimingInfo;
    readonly url: string;
}

/**
 * Represents the data of a network request.
 * Described in https://w3c.github.io/webdriver-bidi/#type-network-RequestData.
 */
declare class RequestData implements IRequestData {
    readonly _bodySize: number;
    readonly _cookies: Array<ICookie>;
    readonly _headers: Array<IHeader>;
    readonly _headersSize: number;
    readonly _method: string;
    readonly _request: string;
    readonly _timings: FetchTimingInfo;
    readonly _url: string;

    constructor(
        request: string,
        url: string,
        method: string,
        headers: Array<IHeader>,
        cookies: Array<ICookie>,
        headersSize: number,
        bodySize: number,
        timings: IFetchTimingInfo,
    );

    get bodySize(): number;

    get cookies(): Array<Cookie>;

    get headers(): Array<Header>;

    get headersSize(): number;

    get method(): string;

    get request(): string;

    get timings(): FetchTimingInfo;

    get url(): string;
}

export interface IResponseData<T = unknown> {
    readonly bodySize: number;
    readonly bytesReceived: number;
    readonly content: T;
    readonly fromCache: boolean;
    readonly headersSize: number;
    readonly headers: Array<IHeader>;
    readonly mimeType: string;
    readonly protocol: string;
    readonly status: string;
    readonly statusText: string;
    readonly url: string;
}

declare class ResponseData<T = unknown> implements IResponseData<T> {
    readonly _bodySize: number;
    readonly _bytesReceived: number;
    readonly _content: T;
    readonly _fromCache: boolean;
    readonly _headersSize: number;
    readonly _headers: Array<Header>;
    readonly _mimeType: string;
    readonly _protocol: string;
    readonly _status: string;
    readonly _statusText: string;
    readonly _url: string;

    constructor(
        url: string,
        protocol: string,
        status: string,
        statusText: string,
        fromCache: boolean,
        headers: Array<IHeader>,
        mimeType: string,
        bytesReceived: number,
        headersSize: number,
        bodySize: number,
        content: T,
    );

    get bodySize(): number;

    get bytesReceived(): number;

    get content(): T;

    get fromCache(): boolean;

    get headersSize(): number;

    get headers(): Array<Header>;

    get mimeType(): string;

    get protocol(): string;

    get status(): string;

    get statusText(): string;

    get url(): string;
}

export interface IResponseStarted<T extends ResponseData = ResponseData> extends IBaseParameters {
    get response(): T;
}

export class ResponseStarted<T extends ResponseData = ResponseData> extends BaseParameters
    implements IResponseStarted<T> {
    readonly _response: T;

    constructor(
        id: string,
        navigation: Network.Navigation,
        redirectCount: number,
        request: IRequestData,
        timestamp: number,
        response: IResponseData,
    );

    get response(): T;
}

type SameSiteLax = 'lax';
type SameSiteNone = 'none';
type SameSiteStrict = 'strict';
type SameSiteDefault = 'default';
export type SameSite = SuggestedString<SameSiteStrict | SameSiteLax | SameSiteNone | SameSiteDefault>;
export const SameSite: ISameSite;
export interface ISameSite {
    DEFAULT: SameSiteDefault;
    LAX: SameSiteLax;
    NONE: SameSiteNone;
    STRICT: SameSiteStrict;

    findByName(name: string): SameSite | null;
}

export type { FetchTimingInfo };
