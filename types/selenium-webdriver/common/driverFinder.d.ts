import type { Capabilities } from "../lib/capabilities";
import type { BinaryPaths } from "./seleniumManager";

/**
 * Resolves the browser and driver paths for the supplied capabilities.
 * This internal API is still marked beta by Selenium.
 */
export function getBinaryPaths(capabilities: Capabilities): BinaryPaths;
