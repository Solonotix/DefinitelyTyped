import type { ClientWindow } from './_internal.js';

export class ClientWindowInfo implements ClientWindow.Info {
    readonly active: boolean | undefined;
    readonly clientWindow: string | undefined;
    readonly height: number | undefined;
    readonly state: string | undefined;
    readonly width: number | undefined;
    readonly x: number | undefined;
    readonly y: number | undefined;

    constructor(params: Partial<ClientWindow.Info>);

    static fromJson(json: Partial<ClientWindow.Info>): ClientWindowInfo;
}

export const WindowState: ClientWindow.IState;
export type WindowState = ClientWindow.State;
