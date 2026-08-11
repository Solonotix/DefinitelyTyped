import type { LocatorArgument } from './by.js';
import type { Alert, Condition, WebElement, WebElementCondition } from './webdriver.js';

export function ableToSwitchToFrame(frame: number | WebElement | LocatorArgument): Condition<boolean>;

export function alertIsPresent(): Condition<Alert>;

export function titleIs(title: string): Condition<boolean>;

export function titleContains(substr: string): Condition<boolean>;

export function titleMatches(regex: RegExp): Condition<boolean>;

export function urlIs(url: string): Condition<boolean>;

export function urlContains(substrUrl: string): Condition<boolean>;

export function urlMatches(regex: RegExp): Condition<boolean>;

export function elementLocated(locator: LocatorArgument): WebElementCondition;

export function elementsLocated(locator: LocatorArgument): Condition<Array<WebElement>>;

export function stalenessOf(element: WebElement): Condition<boolean>;

export function elementIsVisible(element: WebElement): WebElementCondition;

export function elementIsNotVisible(element: WebElement): WebElementCondition;

export function elementIsEnabled(element: WebElement): WebElementCondition;

export function elementIsDisabled(element: WebElement): WebElementCondition;

export function elementIsSelected(element: WebElement): WebElementCondition;

export function elementIsNotSelected(element: WebElement): WebElementCondition;

export function elementTextIs(element: WebElement, text: string): WebElementCondition;

export function elementTextContains(element: WebElement, substr: string): WebElementCondition;

export function elementTextMatches(element: WebElement, regex: RegExp): WebElementCondition;
