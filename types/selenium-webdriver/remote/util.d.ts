/** Internal Selenium Server process helpers shipped by selenium-webdriver. */
export function getJavaPath(): string;

export function isSelenium3x(seleniumStandalonePath: string): boolean;

export function formatSpawnArgs(seleniumStandalonePath: string, args: readonly string[]): string[];
