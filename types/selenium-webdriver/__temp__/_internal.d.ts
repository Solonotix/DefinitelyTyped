export type EntryOf<T, K extends keyof T = keyof T, V extends T[K] = T[K]> = [K, V];
export type EntriesOf<T> = Array<{ [K in keyof T]: EntryOf<T, K> }[keyof T]>;
export type MapOf<T> = Map<keyof T & string, { [K in keyof T & string]: T[K] }[keyof T & string]>;
export type ObjectLike<T> = { [K in keyof T]?: T[K] | undefined };
// See GitHub issue for why this pattern is used https://github.com/microsoft/TypeScript/issues/29729
export type SuggestedNumber<T extends number> = T | (number & {});
export type SuggestedString<T extends string> = T | (string & {});
export type TypedFunction<T = unknown, A extends ReadonlyArray<unknown> = []> = (...args: A) => T;

export namespace Internal {
    export type { EntriesOf, EntryOf, MapOf, ObjectLike, TypedFunction };
}
