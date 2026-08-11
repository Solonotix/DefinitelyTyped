export class Color {
    readonly alpha: number;
    readonly blue: number;
    readonly green: number;
    readonly red: number;

    constructor(red: number, green: number, blue: number, alpha?: number);

    static fromString(value: string): Color;

    setOpacity(alpha: number): Color;

    asRgb(): string;

    asRgba(): string;

    asHex(): string;

    toString(): string;

    equals(other: unknown): other is Color;
}

export const Colors: Readonly<Record<string, Color>>;
