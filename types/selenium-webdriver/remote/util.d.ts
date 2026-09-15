/** Internal Selenium Server process helpers shipped by selenium-webdriver. */
/**
 * returns path to java or 'java' string if JAVA_HOME does not exist in env obj
 */
export function getJavaPath(): string;

/**
 * @param seleniumStandalonePath path to standalone server
 */
export function isSelenium3x(seleniumStandalonePath: string): boolean;

/**
 * @param seleniumStandalonePath path to standalone server
 * @param args spawn arguments array returns formatted args based on selenium standalone server version
 */
export function formatSpawnArgs(seleniumStandalonePath: string, args: Array<string>): Array<string>;
