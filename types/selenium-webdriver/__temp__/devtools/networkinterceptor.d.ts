interface IHeader {
    name: string;
    value: string;
}

export class HttpResponse<T = string> {
    returnBody: string;
    readonly returnHeaders: Array<IHeader>;
    returnMethod: string;
    returnStatus: number;
    readonly urlToIntercept: T;

    constructor(urlToIntercept?: T);

    addHeaders(header: string, value: string): void;

    get body(): string;
    set body(value: string);
    get headers(): Array<IHeader>;
    get method(): string;
    set method(value: string);
    get status(): number;
    set status(value: number);
}
