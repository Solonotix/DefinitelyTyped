import type { WebDriver } from '../webdriver.js';
import Account = require('./account.js');

type DialogType = 'AutoReauthn' | 'AccountChooser' | 'ConfirmIdpLogin' | (string & {});

interface TitleResult {
    title: string;
    subtitle?: string;
}

declare class Dialog {
    constructor(driver: WebDriver);

    title(): Promise<string>;
    subtitle(): Promise<TitleResult>;
    type(): Promise<DialogType>;
    accounts(): Promise<Account[]>;
    selectAccount(index: number): Promise<void>;
    accept(): Promise<void>;
    dismiss(): Promise<void>;
}

declare namespace Dialog {
    export { DialogType, TitleResult };
}

export = Dialog;
