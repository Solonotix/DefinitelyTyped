export type EntryOf<T, K extends keyof T = keyof T, V extends T[K] = T[K]> = [K, V];
export type EntriesOf<T> = Array<{ [K in keyof T]: EntryOf<T, K> }[keyof T]>;
export type MapOf<T> = Map<keyof T & string, { [K in keyof T & string]: T[K] }[keyof T & string]>;
export type ObjectLike<T> = { [K in keyof T]?: T[K] | undefined };

/** Preserves literal suggestions while allowing arbitrary numeric values. */
export type SuggestedNumber<T extends number> = T | (number & {});

/** Preserves literal suggestions while allowing arbitrary string values. */
export type SuggestedString<T extends string> = T | (string & {});

// TODO: The staged declaration defaults the argument tuple to `[]`, while the
// existing declaration accepts an arbitrary readonly argument list by default.
export type TypedFunction<T = unknown, A extends ReadonlyArray<unknown> = ReadonlyArray<unknown>> = (...args: A) => T;

export namespace Internal {
    export { EntriesOf, EntryOf, MapOf, ObjectLike, SuggestedNumber, SuggestedString, TypedFunction };
}
