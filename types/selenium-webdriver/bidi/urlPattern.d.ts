/**
 * Represents a URL pattern to intercept.
 * Described in network.UrlPatternPattern https://w3c.github.io/webdriver-bidi/#type-network-UrlPattern
 */
declare class UrlPattern {
    /**
     * Sets the protocol for the URL pattern.
     * @param protocol - The protocol to set.
     * @returns Returns the updated instance of the URL pattern for chaining.
     */
    protocol(protocol: string): this;

    /**
     * Sets the hostname for the URL pattern.
     * @param hostname - The hostname to set.
     * @returns Returns the updated instance of the URL pattern for chaining.
     */
    hostname(hostname: string): this;

    /**
     * Sets the port for the URL pattern.
     * @param port - The port number to set.
     * @returns Returns the updated instance of the URL pattern for chaining.
     * @throws Throws an error if the port is not a number.
     */
    port(port: number): this;

    /**
     * Sets the pathname for the URL pattern.
     * @param pathname - The pathname to set.
     * @returns Returns the updated instance of the URL pattern for chaining.
     */
    pathname(pathname: string): this;

    /**
     * Sets the search parameter in the URL pattern.
     * @param search - The search parameter to be set.
     * @returns Returns the updated instance of the URL pattern for chaining.
     */
    search(search: string): this;

    asMap(): Map<string, string>;
}

export { UrlPattern };
