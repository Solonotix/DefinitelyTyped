import type { SuggestedString } from '../../_internal.js';
import type { WebDriver } from '../webdriver.js';
import Account = require('./account.js');

export { };

type DialogTypeAutoReauthenticate = 'AutoReauthn';
type DialogTypeAccountChooser = 'AccountChooser';
type DialogTypeIdentityProviderConfirmation = 'ConfirmIdpLogin';
type DialogType = SuggestedString<
    DialogTypeAutoReauthenticate | DialogTypeAccountChooser | DialogTypeIdentityProviderConfirmation
>;

// https://www.w3.org/TR/fedcm/#fetch-accounts
interface IFederatedCredentialManagementIdentityProviderAccount {
    id: string;
    name: string;
    email: string;
    given_name?: string;
    picture?: string;
    approved_clients?: Array<string>;
    login_hints?: Array<string>;
    domain_hints?: Array<string>;
}

interface IFederatedCredentialManagementAccountResult {
    accountId: string;
    email: string;
    name: string;
    givenName?: string;
    pictureUrl?: string;
    idpConfigUrl?: string;
    loginState?: string;
    termsOfServiceUrl?: string;
    privacyPolicyUrl?: string;
}

interface FederatedCredentialManagementTitleResult {
    subtitle?: string;
    title: string;
}

declare class Dialog {
    readonly _driver: WebDriver;

    constructor(driver: WebDriver);

    title(): Promise<string>;

    subtitle(): Promise<FederatedCredentialManagementTitleResult>;

    type(): Promise<DialogType>;

    accounts(): Promise<Array<Account>>;

    selectAccount(index: number): Promise<void>;

    accept(): Promise<void>;

    dismiss(): Promise<void>;
}

declare namespace Dialog {
    export type { DialogType, FederatedCredentialManagementTitleResult, IFederatedCredentialManagementAccountResult };
}

export = Dialog;
