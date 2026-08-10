export type EntryOf<T, K extends keyof T = keyof T, V extends T[K] = T[K]> = [K, V];
export type EntriesOf<T> = Array<{ [K in keyof T]: EntryOf<T, K> }[keyof T]>;
export type MapOf<T> = Map<keyof T & string, { [K in keyof T & string]: T[K] }[keyof T & string]>;
export type ObjectLike<T> = { [K in keyof T]?: T[K] | undefined };

export type TypedFunction<T = unknown, A extends ReadonlyArray<unknown> = ReadonlyArray<unknown>> = (...args: A) => T;

export namespace Internal {
    export { EntryOf, EntriesOf, MapOf, ObjectLike, TypedFunction };
}
