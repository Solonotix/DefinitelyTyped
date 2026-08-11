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
import type { BrowsingContext } from './_internal.js';

/**
 * Represents information about a browsing context.
 * Described in https://w3c.github.io/webdriver-bidi/#type-browsingContext-Info
 */
export class BrowsingContextInfo implements BrowsingContext.Info {
    readonly _children: Array<BrowsingContextInfo>;
    readonly _id: string;
    readonly _parentBrowsingContext: BrowsingContextInfo;
    readonly _url: string;

    constructor(
        id: string,
        url: string,
        children: null | Array<BrowsingContextInfo>,
        parentBrowsingContext: null | BrowsingContextInfo,
    );

    get children(): null | Array<BrowsingContextInfo>;

    get id(): string;

    get parentBrowsingContext(): null | BrowsingContextInfo;

    get url(): string;
}

/**
 * Represents information about a navigation.
 * Described in https://w3c.github.io/webdriver-bidi/#type-browsingContext-NavigationInfo.
 */
export class NavigationInfo {
    readonly browsingContextId: string;
    readonly navigationId: string;
    readonly timestamp: number;
    readonly url: string;

    /**
     * Constructs a new NavigationInfo object.
     * @param {string} browsingContextId - The ID of the browsing context.
     * @param {string} navigationId - The ID of the navigation.
     * @param {number} timestamp - The timestamp of the navigation.
     * @param {string} url - The URL of the page navigated to.
     */
    constructor(browsingContextId: string, navigationId: string, timestamp: number, url: string);
}

export class UserPromptOpened<T> {
    readonly browsingContextId: string;
    readonly type: T;
    readonly message: string;

    constructor(browsingContextId: string, type: T, message: string);
}

export class UserPromptClosed {
    readonly browsingContextId: string;
    readonly accepted: boolean;
    readonly userText?: string;

    constructor(browsingContextId: string, accepted: boolean, userText?: string);
}
