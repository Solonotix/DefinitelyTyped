/** Color parsing and formatting utility. */
export class Color {
    readonly alpha: number;
    readonly blue: number;
    readonly green: number;
    readonly red: number;

    constructor(red: number, green: number, blue: number, alpha?: number);

    static fromString(value: string): Color;

    setOpacity(alpha: number): void;
    asRgb(): string;
    asRgba(): string;
    asHex(): string;
    toString(): string;
    equals(other: unknown): boolean;
}

/** W3C/CSS named colors keyed by their lowercase names. */
export const Colors: Readonly<Record<string, Color>>;
