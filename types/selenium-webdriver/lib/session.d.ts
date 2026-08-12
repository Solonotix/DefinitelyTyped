import { Capabilities } from './capabilities.js';

/**
 * Contains information about a single WebDriver session.
 */
export class Session {
    /**
     * @param {string} id The session ID.
     * @param {!./capabilities.Capabilities} capabilities
     *     The session capabilities.
     */
    constructor(id: string, capabilities: Capabilities);

    /** The runtime also accepts raw capability maps and objects. */
    constructor(
        id: string,
        capabilities: Map<string, unknown> | Record<string, unknown>,
    );

    /**
     * @return {string} This session's ID.
     */
    getId(): string;

    /**
     * @return {!Capabilities} This session's capabilities.
     */
    getCapabilities(): Capabilities;

    /**
     * Retrieves the value of a specific capability.
     * @param {string} key The capability to retrieve.
     * @return {*} The capability value.
     */
    getCapability<T = unknown>(key: string): T | undefined;

    /**
     * Returns the JSON representation of this object, which is just the string
     * session ID.
     * @return {string} The JSON representation of this Session.
     */
    toJSON(): string;
}
