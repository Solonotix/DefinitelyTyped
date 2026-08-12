export type EntryOf<T, K extends keyof T = keyof T, V extends T[K] = T[K]> = [K, V];
export type EntriesOf<T> = Array<{ [K in keyof T]: EntryOf<T, K> }[keyof T]>;
export type MapOf<T> = Map<keyof T & string, { [K in keyof T & string]: T[K] }[keyof T & string]>;
export type ObjectLike<T> = { [K in keyof T]?: T[K] | undefined };

/** Preserves literal suggestions while allowing arbitrary numeric values. */
export type SuggestedNumber<T extends number> = T | (number & {});

/** Preserves literal suggestions while allowing arbitrary string values. */
export type SuggestedString<T extends string> = T | (string & {});

/** Describes a callable with an optionally specified readonly argument tuple. */
export type TypedFunction<T = unknown, A extends ReadonlyArray<unknown> = []> = (...args: A) => T;
export type ErrorFirstCallback<A extends ReadonlyArray<unknown> = []> = TypedFunction<void, [Error | null | undefined, ...A]>;
export type EventListener<A extends ReadonlyArray<unknown> = []> = TypedFunction<void, A>;
// eslint-disable-next-line @definitelytyped/no-single-element-tuple-type
export type EventListenerSimple<T> = EventListener<[T]>;

export namespace Internal {
    export { 
        EntriesOf, 
        EntryOf,
        ErrorFirstCallback,
        EventListener, 
        MapOf, 
        ObjectLike, 
        SuggestedNumber, 
        SuggestedString, 
        TypedFunction 
    };
}
