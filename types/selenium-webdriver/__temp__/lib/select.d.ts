import type { WebElement } from './webdriver.js';

export function escapeQuotes(toEscape: string): string;

export interface ISelect {
    deselectAll(): Promise<void>;

    deselectByVisibleText(text: string): Promise<void>;

    deselectByValue(value: string): Promise<void>;

    deselectByIndex(index: number): Promise<void>;

    getOptions(): Promise<Array<WebElement>>;

    getAllSelectedOptions(): Promise<Array<WebElement>>;

    getFirstSelectedOption(): Promise<WebElement>;

    isMultiple(): Promise<boolean>;

    selectByIndex(index: number): Promise<void>;

    selectByValue(value: string): Promise<void>;

    selectByVisibleText(text: string): Promise<void>;

    setSelected(option: WebElement): Promise<void>;
}

export class Select implements ISelect {
    readonly element: WebElement;
    readonly multiple: boolean;

    constructor(element: WebElement);

    deselectAll(): Promise<void>;

    deselectByVisibleText(text: string): Promise<void>;

    deselectByValue(value: string): Promise<void>;

    deselectByIndex(index: number): Promise<void>;

    getOptions(): Promise<Array<WebElement>>;

    getAllSelectedOptions(): Promise<Array<WebElement>>;

    getFirstSelectedOption(): Promise<WebElement>;

    isMultiple(): Promise<boolean>;

    selectByIndex(index: number): Promise<void>;

    selectByValue(value: string): Promise<void>;

    selectByVisibleText(text: string): Promise<void>;

    setSelected(option: WebElement): Promise<void>;
}
