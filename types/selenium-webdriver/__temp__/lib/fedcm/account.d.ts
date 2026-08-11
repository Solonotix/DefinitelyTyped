// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// 'License'); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

declare class Account {
    readonly _accountId: string;
    readonly _email: string;
    readonly _givenName?: string;
    readonly _idpConfigUrl?: string;
    readonly _loginState?: string;
    readonly _name: string;
    readonly _pictureUrl?: string;
    readonly _privacyPolicyUrl?: string;
    readonly _termsOfServiceUrl?: string;

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

    get givenName(): string | undefined;

    get idpConfigUrl(): string | undefined;

    get loginState(): string | undefined;

    get name(): string;

    get pictureUrl(): string | undefined;

    get privacyPolicyUrl(): string | undefined;

    get termsOfServiceUrl(): string | undefined;
}

export = Account;
