import type { WebDriver } from '../lib/webdriver.js';
import type { CookieFilter } from './cookieFilter.js';
import type { Cookie } from './networkTypes.js';
import type { PartialCookie } from './partialCookie.js';
import type { BrowsingContextPartitionDescriptor, StorageKeyPartitionDescriptor } from './partitionDescriptor.js';
import type { PartitionKey } from './partitionKey.js';

declare function getStorageInstance(driver: WebDriver): Promise<getStorageInstance.Storage>;

declare namespace getStorageInstance {
    type PartitionDescriptor = BrowsingContextPartitionDescriptor | StorageKeyPartitionDescriptor;

    interface GetCookiesResult {
        cookies: Cookie[];
        partitionKey?: PartitionKey;
    }

    interface Storage {
        getCookies(
            filter?: CookieFilter,
            partition?: PartitionDescriptor,
        ): Promise<GetCookiesResult | undefined>;
        setCookie(cookie: PartialCookie, partition?: PartitionDescriptor): Promise<PartitionKey | undefined>;
        deleteCookies(
            cookieFilter?: CookieFilter,
            partition?: PartitionDescriptor,
        ): Promise<PartitionKey | undefined>;
    }

    /** @deprecated Use {@link Storage}. */
    type Instance = Storage;
}

export = getStorageInstance;
