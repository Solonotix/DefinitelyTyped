import type { ClientWindow } from './_internal.js';

export const WindowState: ClientWindow.StateEnum;

export type WindowState = ClientWindow.State;
export interface ClientWindowInfoAttributes extends ClientWindow.Info { }

export class ClientWindowInfo implements ClientWindowInfoAttributes {
    /** Window identifier */
    clientWindow: string;
    /** Window state from WindowState */
    state: WindowState;
    /** Window width */
    width: number;
    /** Window height */
    height: number;
    /** Window x coordinate */
    x: number;
    /** Window y coordinate */
    y: number;
    /** Whether window is active and can receive keyboard input */
    active: boolean;
    /**
     * @param {Object} params Window information parameters
     * @param {string} params.clientWindow Window identifier
     * @param {string} params.state Window state from WindowState
     * @param {number} params.width Window width
     * @param {number} params.height Window height
     * @param {number} params.x Window x coordinate
     * @param {number} params.y Window y coordinate
     * @param {boolean} params.active Whether window is active and can receive keyboard input
     */
    constructor(params: ClientWindowInfoAttributes);

    static fromJson(json: ClientWindowInfoAttributes): ClientWindowInfo;
}
