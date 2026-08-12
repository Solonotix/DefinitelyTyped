declare class HttpResponse {
    /**
     * Creates a HTTP Response that will be used to
     * mock out network interceptions.
     * @param {*} urlToIntercept
     */
    constructor(urlToIntercept?: string);
    returnBody: string;
    returnHeaders: Array<{ name: string; value: string }>;
    returnMethod: string;
    returnStatus: number;
    urlToIntercept: string;
    /**
     * Add headers that will be returned when we intercept
     * a HTTP Request
     * @param {*} header
     * @param {*} value
     */
    addHeaders(header: string, value: string): void;
    get headers(): Array<{ name: string; value: string }>;
    /**
     * Set the STATUS value of the returned HTTP Request
     * @param {*} value
     */
    set status(arg: number);
    get status(): number;
    /**
     * Sets the value of the body of the HTTP Request that
     * will be returned.
     * @param {*} value
     */
    set body(arg: string);
    get body(): string;
    /**
     * Sets the method of the HTTP Request
     * @param {*} value the method of the request.
     */
    set method(arg: string);
    /**
     * Returns the Method to be used in the intercept
     */
    get method(): string;
}
export { HttpResponse };
