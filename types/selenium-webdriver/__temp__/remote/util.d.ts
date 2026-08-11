export function getJavaPath(): string;

export function isSelenium3x(seleniumStandalonePath: string): boolean;

export function formatSpawnArgs(seleniumStandalonePath: string, args: ReadonlyArray<string>): Array<string>;
