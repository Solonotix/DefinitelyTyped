import type { SuggestedString } from '../../_internal.js';
import type { WebDriver } from '../../lib/webdriver.js';
import type { Bidi } from '../_internal.js';

export {};

export interface IPermissionDescriptor {
    name: string;
}

declare class Permission {
    private _driver: WebDriver;
    private bidi: Bidi;

    constructor(driver: WebDriver);

    init(): Promise<void>;

    // https://www.w3.org/TR/permissions/#webdriver-command-set-permission
    setPermission(
        permissionDescriptor: IPermissionDescriptor,
        state: PermissionState,
        origin: string,
        userContext?: string,
    ): Promise<void>;
}

type PermissionStateGranted = 'granted';
type PermissionStateDenied = 'denied';
type PermissionStatePrompt = 'prompt';
export type PermissionState = SuggestedString<PermissionStateGranted | PermissionStateDenied | PermissionStatePrompt>;
export const PermissionState: IPermissionState;
interface IPermissionState {
    DENIED: PermissionStateDenied;
    GRANTED: PermissionStateGranted;
    PROMPT: PermissionStatePrompt;
}

export function getPermissionInstance(driver: WebDriver): Promise<Permission>;
