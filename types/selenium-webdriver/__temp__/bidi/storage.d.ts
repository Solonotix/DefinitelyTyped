import type { WebDriver } from '../lib/webdriver.js';
import type { CookieFilter } from './cookieFilter.js';
import type { Cookie } from './networkTypes.js';
import type { PartialCookie } from './partialCookie.js';
import type { BrowsingContextPartitionDescriptor, StorageKeyPartitionDescriptor } from './partitionDescriptor.js';
import type { PartitionKey } from './partitionKey.js';

type PartitionDescriptor = BrowsingContextPartitionDescriptor | StorageKeyPartitionDescriptor;

declare function Storage(driver: WebDriver): Promise<Storage.Instance>;

declare namespace Storage {
    interface GetCookiesResult {
        cookies: Array<Cookie>;
        partitionKey?: PartitionKey;
    }

    interface Instance {
        getCookies(filter?: CookieFilter, partition?: PartitionDescriptor): Promise<GetCookiesResult | undefined>;
        setCookie(cookie: PartialCookie, partition?: PartitionDescriptor): Promise<PartitionKey | undefined>;
        deleteCookies(cookieFilter?: CookieFilter, partition?: PartitionDescriptor): Promise<PartitionKey | undefined>;
    }
}

export = Storage;
