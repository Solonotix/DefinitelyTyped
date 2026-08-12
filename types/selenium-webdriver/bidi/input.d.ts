import type { IActionsSequence } from '../lib/input.js';
import type { WebDriver } from '../lib/webdriver.js';
import type { InputSourceActions } from './generated/input.js';
import type { ReferenceValue } from './protocolValue.js';

declare function getInputInstance(driver: WebDriver): Promise<getInputInstance.Input>;

declare namespace getInputInstance {
    interface Input {
        perform(
            browsingContextId: string,
            actions: readonly (IActionsSequence | InputSourceActions)[],
        ): Promise<void>;
        release(browsingContextId: string): Promise<void>;
        setFiles(
            browsingContextId: string,
            element: string | ReferenceValue,
            files: string | string[],
        ): Promise<void>;
    }

    /** @deprecated Use {@link Input}. */
    type Instance = Input;
}

export = getInputInstance;
