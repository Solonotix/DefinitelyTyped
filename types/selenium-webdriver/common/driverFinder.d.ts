import type { Capabilities } from '../lib/capabilities.js';
import type { BinaryPaths } from './seleniumManager.js';

/**
 * Resolves the browser and driver paths for the supplied capabilities.
 * This internal API is still marked beta by Selenium.
 */
export function getBinaryPaths(capabilities: Capabilities): BinaryPaths;
