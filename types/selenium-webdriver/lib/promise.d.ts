export { isPromise } from './util.js';

export type ArrayMapper<T, U, TSelf = undefined> = (
    this: TSelf,
    item: T,
    index: number,
    array: T[],
) => U | PromiseLike<U>;
export type ArrayFilter<T, TSelf = undefined> = ArrayMapper<T, boolean, TSelf>;
export type AsyncCallback<T> = (error: Error | null | undefined, result: T) => void;
export type AsyncCallbackFunction<T, TArgs extends readonly unknown[]> = (
    ...args: [...TArgs, AsyncCallback<T>]
) => void;
export type FullyResolved<T> = T extends PromiseLike<infer TValue> ? FullyResolved<TValue>
    : T extends readonly unknown[] ? { [K in keyof T]: FullyResolved<T[K]> }
    : T extends object ? { [K in keyof T]: FullyResolved<T[K]> }
    : T;

/** Creates a promise that resolves after the specified delay. */
export function delayed(ms: number): Promise<void>;

/** Wraps a function whose final argument is a Node-style callback. */
export function checkedNodeCall<T, TArgs extends readonly unknown[]>(
    fn: AsyncCallbackFunction<T, TArgs>,
    ...args: TArgs
): Promise<T>;

/** Invokes a callback when a promise settles and preserves its original value. */
declare function thenFinally<T>(promise: PromiseLike<T>, callback: () => unknown): Promise<T>;
export { thenFinally as finally };

/** Resolves the result of applying a mapper to every array element. */
export function map<T, U, TSelf = undefined>(
    array: T[] | PromiseLike<T[]>,
    fn: ArrayMapper<T, U, TSelf>,
    self?: TSelf,
): Promise<U[]>;

/** Resolves the elements for which the asynchronous predicate is true. */
export function filter<T, TSelf = undefined>(
    array: T[] | PromiseLike<T[]>,
    fn: ArrayFilter<T, TSelf>,
    self?: TSelf,
): Promise<T[]>;

/** Recursively resolves promise-valued properties in place. */
export function fullyResolved<T>(value: T): Promise<FullyResolved<T>>;
