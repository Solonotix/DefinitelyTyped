export interface BinaryPaths {
    browserPath: string;
    driverPath: string;
}

export function binaryPaths(args: ReadonlyArray<string>): BinaryPaths;
