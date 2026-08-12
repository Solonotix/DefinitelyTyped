import type { SuggestedString } from '../_internal.js';

export type ElementIdKey = 'element-6066-11e4-a52e-4f735466cecf';
export type LegacyElementIdKey = 'ELEMENT';
export type ShadowRootIdKey = 'shadow-root-6066-11e4-a52e-4f735466cecf';
export type ElementKey = SuggestedString<ElementIdKey | LegacyElementIdKey | ShadowRootIdKey>;

export type WebElementBuildId = Record<ElementIdKey, string>;
export type WebElementBuildLegacyId = WebElementBuildId & Record<LegacyElementIdKey, string>;
export type WebElementBuildObject = WebElementBuildId | WebElementBuildLegacyId;

export type WebElementAsyncAttribute = 'async';
export type WebElementAutofocusAttribute = 'autofocus';
export type WebElementAutoplayAttribute = 'autoplay';
export type WebElementCheckedAttribute = 'checked';
export type WebElementCompactAttribute = 'compact';
export type WebElementCompleteAttribute = 'complete';
export type WebElementControlsAttribute = 'controls';
export type WebElementDeclareAttribute = 'declare';
export type WebElementDefaultCheckedAttribute = 'defaultchecked';
export type WebElementDefaultSelectedAttribute = 'defaultselected';
export type WebElementDeferAttribute = 'defer';
export type WebElementDisabledAttribute = 'disabled';
export type WebElementDraggableAttribute = 'draggable';
export type WebElementEndedAttribute = 'ended';
export type WebElementFormNoValidateAttribute = 'formnovalidate';
export type WebElementHiddenAttribute = 'hidden';
export type WebElementIndeterminateAttribute = 'indeterminate';
export type WebElementIsContentEditableAttribute = 'iscontenteditable';
export type WebElementIsMapAttribute = 'ismap';
export type WebElementItemscopeAttribute = 'itemscope';
export type WebElementLoopAttribute = 'loop';
export type WebElementMultipleAttribute = 'multiple';
export type WebElementMutedAttribute = 'muted';
export type WebElementNoHrefAttribute = 'nohref';
export type WebElementNoResizeAttribute = 'noresize';
export type WebElementNoshadeAttribute = 'noshade';
export type WebElementNoValidateAttribute = 'novalidate';
export type WebElementNowrapAttribute = 'nowrap';
export type WebElementOpenAttribute = 'open';
export type WebElementPausedAttribute = 'paused';
export type WebElementPubDateAttribute = 'pubdate';
export type WebElementReadonlyAttribute = 'readonly';
export type WebElementRequiredAttribute = 'required';
export type WebElementReversedAttribute = 'reversed';
export type WebElementScopedAttribute = 'scoped';
export type WebElementSeamlessAttribute = 'seamless';
export type WebElementSeekingAttribute = 'seeking';
export type WebElementSelectedAttribute = 'selected';
export type WebElementSpellcheckAttribute = 'spellcheck';
export type WebElementTrueSpeedAttribute = 'truespeed';
export type WebElementWillValidateAttribute = 'willvalidate';

export type WebElementBooleanAttribute = SuggestedString<
    | WebElementAsyncAttribute
    | WebElementAutofocusAttribute
    | WebElementAutoplayAttribute
    | WebElementCheckedAttribute
    | WebElementCompactAttribute
    | WebElementCompleteAttribute
    | WebElementControlsAttribute
    | WebElementDeclareAttribute
    | WebElementDefaultCheckedAttribute
    | WebElementDefaultSelectedAttribute
    | WebElementDeferAttribute
    | WebElementDisabledAttribute
    | WebElementDraggableAttribute
    | WebElementEndedAttribute
    | WebElementFormNoValidateAttribute
    | WebElementHiddenAttribute
    | WebElementIndeterminateAttribute
    | WebElementIsContentEditableAttribute
    | WebElementIsMapAttribute
    | WebElementItemscopeAttribute
    | WebElementLoopAttribute
    | WebElementMultipleAttribute
    | WebElementMutedAttribute
    | WebElementNoHrefAttribute
    | WebElementNoResizeAttribute
    | WebElementNoshadeAttribute
    | WebElementNoValidateAttribute
    | WebElementNowrapAttribute
    | WebElementOpenAttribute
    | WebElementPausedAttribute
    | WebElementPubDateAttribute
    | WebElementReadonlyAttribute
    | WebElementRequiredAttribute
    | WebElementReversedAttribute
    | WebElementScopedAttribute
    | WebElementSeamlessAttribute
    | WebElementSeekingAttribute
    | WebElementSelectedAttribute
    | WebElementSpellcheckAttribute
    | WebElementTrueSpeedAttribute
    | WebElementWillValidateAttribute
>;

/**
 * @param {?} obj the object to test.
 * @return {boolean} whether the object is a valid encoded WebElement ID.
 */
export function isId(obj: unknown): obj is WebElementBuildObject;

/**
 * Extracts the encoded WebElement ID from the object.
 *
 * @param {?} obj The object to extract the ID from.
 * @return {string} the extracted ID.
 * @throws {TypeError} if the object is not a valid encoded ID.
 */
export function extractId(obj: unknown): string;
