import type { WebDriver } from '../lib/webdriver.js';
import type { InputSourceActions } from './generated/input.js';
import type { ReferenceValue } from './protocolValue.js';

declare function Input(driver: WebDriver): Promise<Input.Instance>;

declare namespace Input {
    interface Instance {
        perform(browsingContextId: string, actions: Array<InputSourceActions>): Promise<unknown>;
        release(browsingContextId: string): Promise<unknown>;
        setFiles(browsingContextId: string, element: string | ReferenceValue, files: string | Array<string>): Promise<void>;
    }
}

export = Input;
