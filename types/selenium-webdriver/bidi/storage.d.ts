import type { WebDriver } from "../lib/webdriver";
import type { CookieFilter } from "./cookieFilter";
import type { Cookie } from "./networkTypes";
import type { PartialCookie } from "./partialCookie";
import type { BrowsingContextPartitionDescriptor, StorageKeyPartitionDescriptor } from "./partitionDescriptor";
import type { PartitionKey } from "./partitionKey";

declare function getStorageInstance(driver: WebDriver): Promise<getStorageInstance.Instance>;

declare namespace getStorageInstance {
    type PartitionDescriptor = BrowsingContextPartitionDescriptor | StorageKeyPartitionDescriptor;

    interface GetCookiesResult {
        cookies: Cookie[];
        partitionKey?: PartitionKey;
    }

    interface Instance {
        getCookies(
            filter?: CookieFilter,
            partition?: PartitionDescriptor,
        ): Promise<GetCookiesResult | undefined>;
        setCookie(cookie: PartialCookie, partition?: PartitionDescriptor): Promise<PartitionKey | undefined>;
        // TODO: The staged declaration returns Promise<void>, but the 4.46.0 runtime
        // returns a PartitionKey when the remote response includes one.
        deleteCookies(
            cookieFilter?: CookieFilter,
            partition?: PartitionDescriptor,
        ): Promise<PartitionKey | undefined>;
    }
}

export = getStorageInstance;
