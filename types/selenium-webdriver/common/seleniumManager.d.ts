/** Paths returned by the bundled Selenium Manager executable. */
export interface BinaryPaths {
    browserPath: string;
    driverPath: string;
}

/**
 * Invokes Selenium Manager. This internal API is still marked beta by Selenium.
 */
export function binaryPaths(args: readonly string[]): BinaryPaths;
