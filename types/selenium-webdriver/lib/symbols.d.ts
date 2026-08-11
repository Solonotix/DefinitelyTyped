export interface ISymbols {
    /**
     * The serialize symbol specifies a method that returns an object's serialized
     * representation. If an object's serialized form is not immediately
     * available, the serialize method will return a promise that will be resolved
     * with the serialized form.
     *
     * Note that the described method is analogous to objects that define a
     * `toJSON()` method, except the serialized result may be a promise, or
     * another object with a promised property.
     */
    readonly serialize: unique symbol;
}

/** The runtime's named serialization symbol export. */
export const serialize: typeof Symbols.serialize;

// TODO: The existing declaration exposes a synthetic default object, while the
// 4.46.0 CommonJS runtime only exports the named `serialize` property.
declare const Symbols: ISymbols;
export default Symbols;
