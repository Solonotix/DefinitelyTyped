export type ElementIdKey = "element-6066-11e4-a52e-4f735466cecf";
export type LegacyElementIdKey = "ELEMENT";

export type WebElementId = Record<ElementIdKey, string> | Record<LegacyElementIdKey, string>;

/** Tests whether an object is a valid encoded WebElement ID. */
export function isId(obj: unknown): obj is WebElementId;

/** Extracts an encoded WebElement ID, throwing if the object is not valid. */
export function extractId(obj: unknown): string;
