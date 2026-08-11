declare class Account {
    constructor(
        accountId: string,
        email: string,
        name: string,
        givenName?: string,
        pictureUrl?: string,
        idpConfigUrl?: string,
        loginState?: string,
        termsOfServiceUrl?: string,
        privacyPolicyUrl?: string,
    );

    get accountId(): string;
    get email(): string;
    get name(): string;
    get givenName(): string | undefined;
    get pictureUrl(): string | undefined;
    get idpConfigUrl(): string | undefined;
    get loginState(): string | undefined;
    get termsOfServiceUrl(): string | undefined;
    get privacyPolicyUrl(): string | undefined;
}

export = Account;
