// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// 'License'); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview Defines a handful of utility functions to simplify working
 * with promises.
 */
export { isPromise } from './util.js';

export type ArrayMapper<T, U, TSelf = never> = (this: TSelf, item: T, index: number, arr: Array<T>) => U;
export type ArrayFilter<T, TSelf = never> = ArrayMapper<T, boolean, TSelf>;
export type AsyncCallback<T> = (error: null | undefined | Error, result: T) => void;
export type AsyncCallbackArg<T, TArgs extends ReadonlyArray<unknown>> = (args: [...TArgs, AsyncCallback<T>]) => void;
export type FullyResolved<T> = T extends PromiseLike<infer TValue> ? FullyResolved<TValue>
    : T extends ReadonlyArray<unknown> ? { [K in keyof T]: FullyResolved<T[K]> }
    : T extends object ? { [K in keyof T]: FullyResolved<T[K]> }
    : T;

/**
 * Creates a promise that will be resolved at a set time in the future.
 * @param ms The amount of time, in milliseconds, to wait before resolving the promise.
 * @return The promise.
 */
export function delayed(ms: number): Promise<void>;

/**
 * Wraps a function that expects a node-style callback as its final
 * argument. This callback expects two arguments: an error value (which will be
 * null if the call succeeded), and the success value as the second argument.
 * The callback will the resolve or reject the returned promise, based on its
 * arguments.
 * @param fn The function to wrap.
 * @param args The arguments to apply to the function, excluding the final callback.
 * @return A promise that will be resolved with the result of the provided function's callback.
 */
export function checkedNodeCall<T, TArgs extends ReadonlyArray<unknown>>(
    fn: AsyncCallbackArg<T, TArgs>,
    ...args: TArgs
): Promise<T>;

/**
 * Registers a listener to invoke when a promise is resolved, regardless
 * of whether the promise's value was successfully computed. This function
 * is synonymous with the {@code finally} clause in a synchronous API:
 *
 *     // Synchronous API:
 *     try {
 *       doSynchronousWork();
 *     } finally {
 *       cleanUp();
 *     }
 *
 *     // Asynchronous promise API:
 *     doAsynchronousWork().finally(cleanUp);
 *
 * __Note:__ similar to the {@code finally} clause, if the registered
 * callback returns a rejected promise or throws an error, it will silently
 * replace the rejection error (if any) from this promise:
 *
 *     try {
 *       throw Error('one');
 *     } finally {
 *       throw Error('two');  // Hides Error: one
 *     }
 *
 *     let p = Promise.reject(Error('one'));
 *     promise.finally(p, function() {
 *       throw Error('two');  // Hides Error: one
 *     });
 *
 * @param promise The promise to add the listener to.
 * @param callback The function to call when the promise is resolved.
 * @return A promise that will be resolved with the callback result.
 */
declare function thenFinally<T>(promise: PromiseLike<T>, callback: CallableFunction): Promise<T>;
export { thenFinally as finally };

/**
 * Calls a function for each element in an array and inserts the result into a
 * new array, which is used as the fulfillment value of the promise returned
 * by this function.
 *
 * If the return value of the mapping function is a promise, this function
 * will wait for it to be fulfilled before inserting it into the new array.
 *
 * If the mapping function throws or returns a rejected promise, the
 * promise returned by this function will be rejected with the same reason.
 * Only the first failure will be reported; all subsequent errors will be
 * silently ignored.
 *
 * @param array The array to iterate over, or a promise that will resolve to said array.
 * @param fn The function to call for each element in the array. This function should expect three arguments (the element, the index, and the array itself.
 * @param self The object to be used as the value of 'this' within `fn`.
 */
export function map<T, U, TSelf = never>(
    array: Array<T> | PromiseLike<Array<T>>,
    fn: ArrayMapper<T, U, TSelf>,
    self?: TSelf,
): Promise<Array<U>>;

/**
 * Calls a function for each element in an array, and if the function returns
 * true adds the element to a new array.
 *
 * If the return value of the filter function is a promise, this function
 * will wait for it to be fulfilled before determining whether to insert the
 * element into the new array.
 *
 * If the filter function throws or returns a rejected promise, the promise
 * returned by this function will be rejected with the same reason. Only the
 * first failure will be reported; all subsequent errors will be silently
 * ignored.
 *
 * @param array The array to iterate over, or a promise that will resolve to said array.
 * @param fn The function to call for each element in the array.
 * @param self The object to be used as the value of 'this' within `fn`.
 */
export function filter<T, TSelf = never>(
    array: Array<T> | PromiseLike<Array<T>>,
    fn: ArrayFilter<T, TSelf>,
    self?: TSelf,
): Promise<Array<T>>;

/**
 * Returns a promise that will be resolved with the input value in a
 * fully-resolved state. If the value is an array, each element will be fully
 * resolved. Likewise, if the value is an object, all keys will be fully
 * resolved. In both cases, all nested arrays and objects will also be
 * fully resolved.  All fields are resolved in place; the returned promise will
 * resolve on {@code value} and not a copy.
 *
 * Warning: This function makes no checks against objects that contain
 * cyclical references:
 *
 *     var value = {};
 *     value['self'] = value;
 *     promise.fullyResolved(value);  // Stack overflow.
 *
 * @param {*} value The value to fully resolve.
 * @return {!Thenable} A promise for a fully resolved version
 *     of the input value.
 */
export function fullyResolved<T>(value: T): Promise<FullyResolved<T>>;
