import type { WebDriver } from "../lib/webdriver";
import type { ReferenceValue } from "./protocolValue";

declare function getInputInstance(driver: WebDriver): Promise<getInputInstance.Instance>;

declare namespace getInputInstance {
    interface Instance {
        perform(browsingContextId: string, actions: readonly unknown[]): Promise<unknown>;
        release(browsingContextId: string): Promise<unknown>;
        setFiles(
            browsingContextId: string,
            element: string | ReferenceValue,
            files: string | string[],
        ): Promise<void>;
    }
}

export = getInputInstance;
