import type { SuggestedString } from '../_internal.js';
import type { WebDriver, WebElement } from './webdriver.js';

export type ByCss = 'css selector';
export type ByLinkText = 'link text';
export type ByPartialLinkText = 'partial link text';
export type ByTagName = 'tag name';
export type ByXpath = 'xpath';
export type BySelector = SuggestedString<ByCss | ByLinkText | ByPartialLinkText | ByTagName | ByXpath>;

export type RelativeAbove = 'above';
export type RelativeBelow = 'below';
export type RelativeLeft = 'left';
export type RelativeNear = 'near';
export type RelativeRight = 'right';
export type RelativeStraightAbove = 'straightAbove';
export type RelativeStraightBelow = 'straightBelow';
export type RelativeStraightLeft = 'straightLeft';
export type RelativeStraightRight = 'straightRight';
export type RelativeByKind = SuggestedString<
    | RelativeAbove
    | RelativeBelow
    | RelativeLeft
    | RelativeNear
    | RelativeRight
    | RelativeStraightAbove
    | RelativeStraightBelow
    | RelativeStraightLeft
    | RelativeStraightRight
>;

export type ByHash = Record<BySelector, string>;
export interface RelativeFilter {
    kind: RelativeByKind;
    args: Array<ByHash | WebElement>;
}
export type LocatorValue = By | IBy | ByHash;
export type LocatorFunction = (driver: WebDriver | WebElement) => Promise<WebElement | Array<WebElement>>;
export type LocatorArgument = LocatorValue | LocatorFunction;

export type ScriptFunction<T, A extends Array<unknown>> = (...args: A) => T;

export interface IBy {
    using: BySelector;
    value: string;
}

export class By implements IBy {
    readonly using: BySelector;
    readonly value: string;

    constructor(using: BySelector, value: string);

    static className(name: string): By;

    static css(selector: string): By;

    static id(id: string): By;

    static linkText(text: string): By;

    static js<T, A extends Array<unknown>>(
        script: ScriptFunction<T, A>,
        ...var_args: A
    ): (driver: WebDriver) => Promise<T>;

    static name(name: string): By;

    static partialLinkText(text: string): By;

    static tagName(name: string): By;

    static xpath(xpath: string): By;

    toString(): string;

    toObject(): ByHash;
}

export class RelativeBy {
    readonly root: By;
    readonly filters: Array<RelativeFilter>;

    constructor(findDetails: By, filters?: Array<RelativeFilter>);

    above(locatorOrElement: LocatorValue | WebElement): this;

    below(locatorOrElement: LocatorValue | WebElement): this;

    toLeftOf(locatorOrElement: LocatorValue | WebElement): this;

    toRightOf(locatorOrElement: LocatorValue | WebElement): this;

    straightAbove(locatorOrElement: LocatorValue | WebElement): this;

    straightBelow(locatorOrElement: LocatorValue | WebElement): this;

    straightToLeftOf(locatorOrElement: LocatorValue | WebElement): this;

    straightToRightOf(locatorOrElement: LocatorValue | WebElement): this;

    near(locatorOrElement: LocatorValue | WebElement): this;

    marshall(): IMarshalledRelativeBy;

    toString(): string;
}

export interface IMarshalledRelativeBy {
    relative: {
        root: By;
        filters: Array<RelativeFilter>;
    };
}

export function withTagName(tagName: string): RelativeBy;

export function locateWith(by: IBy): RelativeBy;

export function escapeCss(css: string): string;

export function checkedLocator(locator: By): By;
export function checkedLocator(locator: RelativeBy): RelativeBy;
export function checkedLocator(locator: LocatorFunction): LocatorFunction;
export function checkedLocator(locator: ByHash | IBy): By;
export function checkedLocator(locator: LocatorArgument): By | RelativeBy | LocatorFunction;

export namespace RelativeSelectors {
    type Above = 'above';
    type Below = 'below';
    type Left = 'left';
    type Near = 'near';
    type Right = 'right';
    type StraightAbove = 'straightAbove';
    type StraightBelow = 'straightBelow';
    type StraightLeft = 'straightLeft';
    type StraightRight = 'straightRight';
}

export namespace Selectors {
    type ClassName = 'className' | 'class name';
    type Css = ByCss | 'css';
    type Id = 'id';
    type LinkText = ByLinkText | 'linkText';
    type Name = 'name';
    type PartialLinkText = ByPartialLinkText | 'partialLinkText';
    type Relative = 'relative';
    type TagName = ByTagName | 'tagName';
    type Xpath = ByXpath;
}
