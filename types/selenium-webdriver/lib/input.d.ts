import type { SuggestedNumber, SuggestedString } from '../_internal.js';
import { Executor } from './command.js';
import type { WebDriver, WebElement } from './webdriver.js';

/**
 * Defines the reference point from which to compute offsets for
 * {@linkplain ./input.Pointer#move pointer move} actions.
 */
export type Origin = SuggestedString<'pointer' | 'viewport'>;

export interface IOrigin {
    /** Compute offsets relative to the pointer's current position. */
    readonly POINTER: 'pointer';
    /** Compute offsets relative to the viewport. */
    readonly VIEWPORT: 'viewport';
}

export const Origin: IOrigin;

/**
 * Enumeration of the buttons used in the advanced interactions API.
 */
export type Button = SuggestedNumber<0 | 1 | 2 | 3 | 4>;

export interface IButton {
    readonly LEFT: 0;
    readonly MIDDLE: 1;
    readonly RIGHT: 2;
    readonly BACK: 3;
    readonly FORWARD: 4;
}

export const Button: IButton;

export interface IKey {
    NULL: string;
    CANCEL: string; // ^break
    HELP: string;
    BACK_SPACE: string;
    TAB: string;
    CLEAR: string;
    RETURN: string;
    ENTER: string;
    SHIFT: string;
    CONTROL: string;
    ALT: string;
    PAUSE: string;
    ESCAPE: string;
    SPACE: string;
    PAGE_UP: string;
    PAGE_DOWN: string;
    END: string;
    HOME: string;
    ARROW_LEFT: string;
    LEFT: string;
    ARROW_UP: string;
    UP: string;
    ARROW_RIGHT: string;
    RIGHT: string;
    ARROW_DOWN: string;
    DOWN: string;
    INSERT: string;
    DELETE: string;
    SEMICOLON: string;
    EQUALS: string;

    NUMPAD0: string; // number pad keys
    NUMPAD1: string;
    NUMPAD2: string;
    NUMPAD3: string;
    NUMPAD4: string;
    NUMPAD5: string;
    NUMPAD6: string;
    NUMPAD7: string;
    NUMPAD8: string;
    NUMPAD9: string;
    MULTIPLY: string;
    ADD: string;
    SEPARATOR: string;
    SUBTRACT: string;
    DECIMAL: string;
    DIVIDE: string;

    F1: string; // function keys
    F2: string;
    F3: string;
    F4: string;
    F5: string;
    F6: string;
    F7: string;
    F8: string;
    F9: string;
    F10: string;
    F11: string;
    F12: string;

    COMMAND: string; // Apple command key
    META: string; // alias for Windows key

    /**
     * Simulate pressing many keys at once in a 'chord'. Takes a sequence of
     * keys or strings, appends each of the values to a string,
     * and adds the chord termination key ({@link Key.NULL}) and returns
     * the resulting string.
     *
     * Note: when the low-level webdriver key handlers see Keys.NULL, active
     * modifier keys (CTRL/ALT/SHIFT/etc) release via a keyup event.
     *
     * @param {...string} var_args The key sequence to concatenate.
     * @return {string} The null-terminated key sequence.
     */
    chord(...var_args: Array<string | IKey>): string;
}

/**
 * Representations of pressable keys that aren't text.  These are stored in
 * the Unicode PUA (Private Use Area) code points, 0xE000-0xF8FF.  Refer to
 * http://www.google.com.au/search?&q=unicode+pua&btnG=Search
 */
export const Key: IKey;

export interface IDirection {
    x?: number | undefined;
    y?: number | undefined;
    duration?: number | undefined;
    origin?: Origin | WebElement | undefined;
}

export const INTERNAL_COMPUTE_OFFSET_SCRIPT: string;

/**
 * Used with {@link ./webelement.WebElement#sendKeys WebElement#sendKeys} on
 * file input elements (`<input type='file'>`) to detect when the entered key
 * sequence defines the path to a file.
 *
 * By default, {@linkplain ./webelement.WebElement WebElement's} will enter all
 * key sequences exactly as entered. You may set a
 * {@linkplain ./webdriver.WebDriver#setFileDetector file detector} on the
 * parent WebDriver instance to define custom behavior for handling file
 * elements. Of particular note is the
 * {@link selenium-webdriver/remote.FileDetector}, which should be used when
 * running against a remote
 * [Selenium Server](https://selenium.dev/downloads/).
 */
export class FileDetector {
    /**
     * Handles the file specified by the given path, preparing it for use with
     * the current browser. If the path does not refer to a valid file, it will
     * be returned unchanged, otherwise a path suitable for use with the current
     * browser will be returned.
     *
     * This default implementation is a no-op. Subtypes may override this function
     * for custom tailored file handling.
     *
     * @param {!./webdriver.WebDriver} driver The driver for the current browser.
     * @param {string} path The path to process.
     * @return {!Promise<string>} A promise for the processed file path.
     * @package
     */
    handleFile(driver: WebDriver, path: string): Promise<string>;
}

export type ActionType =
    | 'keyDown'
    | 'keyUp'
    | 'pause'
    | 'pointerDown'
    | 'pointerUp'
    | 'pointerMove'
    | 'pointerCancel'
    | 'scroll';

export interface IActionType {
    readonly KEY_DOWN: 'keyDown';
    readonly KEY_UP: 'keyUp';
    readonly PAUSE: 'pause';
    readonly POINTER_DOWN: 'pointerDown';
    readonly POINTER_UP: 'pointerUp';
    readonly POINTER_MOVE: 'pointerMove';
    readonly POINTER_CANCEL: 'pointerCancel';
    readonly SCROLL: 'scroll';
}

export interface IAction<T extends ActionType = ActionType> {
    type?: T;
    duration?: number;
    value?: string;
    button?: Button;
    x?: number;
    y?: number;
}

/** A single low-level action exported by the 4.46.0 runtime. */
export class Action<T extends ActionType = ActionType> implements IAction<T> {
    static readonly Type: IActionType;

    type?: T;
    duration?: number;
    value?: string;
    button?: Button;
    x?: number;
    y?: number;
}

export type DeviceType = SuggestedString<'key' | 'none' | 'pointer' | 'wheel'>;

export interface IDeviceType {
    readonly KEY: 'key';
    readonly NONE: 'none';
    readonly POINTER: 'pointer';
    readonly WHEEL: 'wheel';
}

export interface IDeviceJSON<T extends DeviceType = DeviceType> {
    type: T;
    id: string;
}

export class Device<T extends DeviceType = DeviceType> {
    static readonly Type: IDeviceType;

    constructor(type: T, id: string);

    toJSON(): IDeviceJSON<T>;
}

export class Keyboard extends Device<'key'> {
    constructor(id: string);

    keyDown(key: string | number): IAction<'keyDown'>;

    keyUp(key: string | number): IAction<'keyUp'>;
}

export type PointerType = SuggestedString<'mouse' | 'pen' | 'touch'>;

export interface IPointerType {
    readonly MOUSE: 'mouse';
    readonly PEN: 'pen';
    readonly TOUCH: 'touch';
}

export interface IButtonAction<T extends ActionType, B extends Button = 0> extends IAction<T> {
    button: B;
}

export interface IPointerAction<T extends ActionType> extends IAction<T> {
    altitudeAngle: number;
    azimuthAngle: number;
    height: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    width: number;
}

export interface IPointerButtonAction<B extends Button = 0> extends IPointerAction<'pointerDown'> {
    button: B;
}

export interface IPointerMoveOptions<O extends Origin | WebElement = Origin | WebElement> {
    x?: number;
    y?: number;
    duration?: number;
    origin?: O;
    width?: number;
    height?: number;
    pressure?: number;
    tangentialPressure?: number;
    tiltX?: number;
    tiltY?: number;
    twist?: number;
    altitudeAngle?: number;
    azimuthAngle?: number;
}

export interface IPointerMoveAction<O extends Origin | WebElement = Origin | WebElement>
    extends IPointerAction<'pointerMove'> {
    type: 'pointerMove';
    origin: O;
    duration: number;
    x: number;
    y: number;
}

export class Pointer<T extends PointerType = PointerType> {
    static readonly Type: IPointerType;

    constructor(id: string, type: T);

    toJSON(): IDeviceJSON<'pointer'> & {
        parameters: {
            pointerType: T;
        };
    };

    cancel(): IAction<'pointerCancel'>;

    press<B extends Button = 0>(
        button?: B,
        width?: number,
        height?: number,
        pressure?: number,
        tangentialPressure?: number,
        tiltX?: number,
        tiltY?: number,
        twist?: number,
        altitudeAngle?: number,
        azimuthAngle?: number,
    ): IPointerButtonAction<B>;

    release<B extends Button = 0>(button?: B): IButtonAction<'pointerUp', B>;

    move<O extends Origin | WebElement = Origin | WebElement>(
        options: IPointerMoveOptions<O>,
    ): IPointerMoveAction<O>;
}

/** The wheel device exposed by {@link Actions.wheel}. */
export interface Wheel extends Device<'wheel'> {
    scroll(
        x: number,
        y: number,
        deltaX: number,
        deltaY: number,
        origin: Origin | WebElement,
        duration: number,
    ): IAction<'scroll'>;
}

export interface IActionsSequence extends IDeviceJSON {
    actions: IAction[];
}

export interface IActionsOptions {
    async?: boolean;
}

/**
 * Class for defining sequences of complex user interactions. Each sequence
 * will not be executed until {@link #perform} is called.
 *
 * Example:
 *
 *     new Actions(driver).
 *         keyDown(Key.SHIFT).
 *         click(element1).
 *         click(element2).
 *         dragAndDrop(element3, element4).
 *         keyUp(Key.SHIFT).
 *         perform();
 */
export class Actions {
    // region Constructors

    constructor(executor: Executor, options?: IActionsOptions);

    // endregion

    // region Methods
    keyboard(): Keyboard;
    mouse(): Pointer;
    wheel(): Wheel;

    insert<T extends DeviceType>(device: Device<T>, ...actions: IAction[]): this;

    synchronize(...devices: Device[]): this;
    /**
     * Executes this action sequence.
     * @return {!Promise} A promise that will be resolved once
     *     this sequence has completed.
     */
    clear(): Promise<void>;

    /**
     * Executes this action sequence.
     * @return {!Promise} A promise that will be resolved once
     *     this sequence has completed.
     */
    perform(): Promise<void>;

    pause(duration?: number | Device, ...devices: Device[]): this;

    /**
     * Inserts an action to press a mouse button at the mouse's current location.
     * Defaults to `LEFT`.
     */
    press(button?: Button): this;

    /**
     * Inserts an action to release a mouse button at the mouse's current
     * location.  Defaults to `LEFT`.
     */
    release(button?: Button): this;

    /** Adds a wheel scroll action. */
    scroll(
        x: number,
        y: number,
        targetDeltaX: number,
        targetDeltaY: number,
        origin: Origin | WebElement,
        duration: number,
    ): this;

    /**
     * Inserts an action for moving the mouse `x` and `y` pixels relative to the
     * specified `origin`. The `origin` may be defined as the mouse's
     * {@linkplain ./input.Origin.POINTER current position}, the
     * {@linkplain ./input.Origin.VIEWPORT viewport}, or the center of a specific
     * {@linkplain ./webdriver.WebElement WebElement}.
     *
     * You may adjust how long the remote end should take, in milliseconds, to
     * perform the move using the `duration` parameter (defaults to 100 ms).
     * The number of incremental move events generated over this duration is an
     * implementation detail for the remote end.
     *
     * Defaults to moving the mouse to the top-left
     *     corner of the viewport over 100ms.
     */
    move(direction?: IDirection): this;

    /**
     * Convenience function for performing a 'drag and drop' manuever. The target
     * element may be moved to the location of another element, or by an offset (in
     * pixels).
     */
    dragAndDrop(
        from: WebElement,
        to: WebElement | { x: number; y: number },
    ): this;

    /**
     * Short-hand for performing a simple left-click (down/up) with the mouse.
     *
     * @param {./WebElement=} element If specified, the mouse will
     *     first be moved to the center of the element before performing the
     *     click.
     * @return {!Actions} a self reference.
     */
    click(element?: WebElement): this;

    /**
     * Short-hand for performing a double left-click with the mouse.
     *
     * @param {./WebElement=} element If specified, the mouse will
     *     first be moved to the center of the element before performing the
     *     click.
     * @return {!Actions} a self reference.
     */
    doubleClick(element?: WebElement): this;

    /**
     * Short-hand for performing a simple right-click (down/up) with the mouse.
     *
     * @param {./WebElement=} element If specified, the mouse will
     *     first be moved to the center of the element before performing the
     *     click.
     * @return {!Actions} a self reference.
     */
    contextClick(element?: WebElement): this;

    /**
     * Performs a modifier key press. The modifier key is <em>not released</em>
     * until {@link #keyUp} or {@link #sendKeys} is called. The key press will be
     * targetted at the currently focused element.
     * @param {!Key} key The modifier key to push. Must be one of
     *     {ALT, CONTROL, SHIFT, COMMAND, META}.
     * @return {!Actions} A self reference.
     * @throws {Error} If the key is not a valid modifier key.
     */
    keyDown(key: string | number): this;

    /**
     * Performs a modifier key release. The release is targetted at the currently
     * focused element.
     * @param {!Key} key The modifier key to release. Must be one of
     *     {ALT, CONTROL, SHIFT, COMMAND, META}.
     * @return {!Actions} A self reference.
     * @throws {Error} If the key is not a valid modifier key.
     */
    keyUp(key: string | number): this;

    /**
     * Simulates typing multiple keys. Each modifier key encountered in the
     * sequence will not be released until it is encountered again. All key events
     * will be targeted at the currently focused element.
     *
     * @param {...(string|!input.Key|!Array<(string|!input.Key)>)} var_args
     *     The keys to type.
     * @return {!Actions} A self reference.
     * @throws {Error} If the key is not a valid modifier key.
     */
    sendKeys(...var_args: Array<string | number | WebElement>): this;

    /** Returns the non-idle action sequences currently configured. */
    getSequences(): IActionsSequence[];

    // endregion
}
