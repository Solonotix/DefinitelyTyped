import type { MapOf } from '../_internal.js';
import { Capabilities, Capability } from './capabilities.js';

export class Session<T extends Record<Capability, unknown> = Record<Capability, unknown>> {
    readonly caps_: Capabilities<T>;
    readonly id_: string;

    constructor(id: string, capabilities: Capabilities<T> | MapOf<T> | T);

    getId(): string;

    getCapabilities(): Capabilities<T>;

    getCapability<K extends Capability>(key: K): T[K];

    toJSON(): string;
}
