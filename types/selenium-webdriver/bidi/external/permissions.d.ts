import type { WebDriver } from "../../lib/webdriver";

export const PermissionState: {
    readonly GRANTED: "granted";
    readonly DENIED: "denied";
    readonly PROMPT: "prompt";
};

export type PermissionState = (typeof PermissionState)[keyof typeof PermissionState];

export interface PermissionDescriptor {
    name: string;
}

export interface Permission {
    setPermission(
        permissionDescriptor: PermissionDescriptor,
        state: PermissionState,
        origin: string,
        userContext?: string | null,
    ): Promise<void>;
}

export function getPermissionInstance(driver: WebDriver): Promise<Permission>;
