import type { SuggestedNumber, SuggestedString } from '../_internal.js';
import type { Executor } from './command.js';
import type { WebDriver, WebElement } from './webdriver.js';

export { };

type ButtonLeft = 0;
type ButtonMiddle = 1;
type ButtonRight = 2;
type ButtonBack = 3;
type ButtonForward = 4;
export type Button = SuggestedNumber<ButtonLeft | ButtonMiddle | ButtonRight | ButtonBack | ButtonForward>;
interface IButton {
    LEFT: ButtonLeft;
    MIDDLE: ButtonMiddle;
    RIGHT: ButtonRight;
    BACK: ButtonBack;
    FORWARD: ButtonForward;
}
export const Button: IButton;

interface ISpecialKey {
    NULL: '\uE000';
    CANCEL: '\uE001'; // ^break
    HELP: '\uE002';
    BACK_SPACE: '\uE003';
    TAB: '\uE004';
    CLEAR: '\uE005';
    RETURN: '\uE006';
    ENTER: '\uE007';
    SHIFT: '\uE008';
    CONTROL: '\uE009';
    ALT: '\uE00A';
    PAUSE: '\uE00B';
    ESCAPE: '\uE00C';
    SPACE: '\uE00D';
    PAGE_UP: '\uE00E';
    PAGE_DOWN: '\uE00F';
    END: '\uE010';
    HOME: '\uE011';
    ARROW_LEFT: '\uE012';
    LEFT: '\uE012';
    ARROW_UP: '\uE013';
    UP: '\uE013';
    ARROW_RIGHT: '\uE014';
    RIGHT: '\uE014';
    ARROW_DOWN: '\uE015';
    DOWN: '\uE015';
    INSERT: '\uE016';
    DELETE: '\uE017';
    SEMICOLON: '\uE018';
    EQUALS: '\uE019';

    NUMPAD0: '\uE01A'; // number pad keys
    NUMPAD1: '\uE01B';
    NUMPAD2: '\uE01C';
    NUMPAD3: '\uE01D';
    NUMPAD4: '\uE01E';
    NUMPAD5: '\uE01F';
    NUMPAD6: '\uE020';
    NUMPAD7: '\uE021';
    NUMPAD8: '\uE022';
    NUMPAD9: '\uE023';
    MULTIPLY: '\uE024';
    ADD: '\uE025';
    SEPARATOR: '\uE026';
    SUBTRACT: '\uE027';
    DECIMAL: '\uE028';
    DIVIDE: '\uE029';

    F1: '\uE031'; // function keys
    F2: '\uE032';
    F3: '\uE033';
    F4: '\uE034';
    F5: '\uE035';
    F6: '\uE036';
    F7: '\uE037';
    F8: '\uE038';
    F9: '\uE039';
    F10: '\uE03A';
    F11: '\uE03B';
    F12: '\uE03C';

    COMMAND: '\uE03D'; // Apple command key
    META: '\uE03D'; // alias for Windows key

    /**
     * Japanese modifier key for switching between full- and half-width
     * characters.
     * @see <https://en.wikipedia.org/wiki/Language_input_keys>
     */
    ZENKAKU_HANKAKU: '\uE040';
}

export interface IKey extends ISpecialKey {
    chord(...keys: Array<string>): string;
}

export const Key: IKey;
export type Key = SuggestedString<ISpecialKey[keyof ISpecialKey]>;

type ActionTypeDoubleTap = 'doubleTap';
type ActionTypeKeyDown = 'keyDown';
type ActionTypeKeyUp = 'keyUp';
type ActionTypePause = 'pause';
type ActionTypePointerDown = 'pointerDown';
type ActionTypePointerUp = 'pointerUp';
type ActionTypePointerMove = 'pointerMove';
type ActionTypePointerCancel = 'pointerCancel';
type ActionTypeScroll = 'scroll';
type ActionTypeTap = 'tap';
export type ActionType = SuggestedString<
    | ActionTypeDoubleTap
    | ActionTypeKeyDown
    | ActionTypeKeyUp
    | ActionTypePause
    | ActionTypePointerCancel
    | ActionTypePointerDown
    | ActionTypePointerMove
    | ActionTypePointerUp
    | ActionTypeScroll
    | ActionTypeTap
>;

interface IActionType {
    KEY_DOWN: ActionTypeKeyDown;
    KEY_UP: ActionTypeKeyUp;
    PAUSE: ActionTypePause;
    POINTER_DOWN: ActionTypePointerDown;
    POINTER_UP: ActionTypePointerUp;
    POINTER_MOVE: ActionTypePointerMove;
    POINTER_CANCEL: ActionTypePointerCancel;
    SCROLL: ActionTypeScroll;
}

interface IAction<T extends ActionType = ActionType> {
    button?: Button;
    duration?: number;
    type?: T;
    value?: string;
    x?: number;
    y?: number;
}

interface IButtonAction<T extends ActionType = ActionType, B extends Button = ButtonLeft> extends IAction<T> {
    button: B;
}

export class Action<T extends ActionType = ActionType> implements IAction<T> {
    static readonly Type: IActionType;

    button?: Button;
    duration?: number;
    type?: T;
    value?: string;
    x?: number;
    y?: number;
}

export interface IActionsOptions {
    async?: boolean;
}

interface ActionsMoveOptions {
    x: number;
    y: number;
    duration: number;
    origin: Origin;
}

interface Coordinates {
    x: number;
    y: number;
}

interface ActionsSequences extends IDeviceJSON {
    actions: Array<IAction>;
}

export class Actions {
    readonly executor_: Executor;
    readonly sync_: boolean;
    readonly keyboard_: Keyboard;
    readonly mouse_: Pointer<PointerTypeMouse>;
    readonly wheel_: Wheel;
    readonly sequences_: Map<Device<DeviceType>, Array<Action>>;

    constructor(executor: Executor, options?: IActionsOptions);

    keyboard(): Keyboard;

    mouse(): Pointer<PointerTypeMouse>;

    wheel(): Wheel;

    sequence_<T extends DeviceType>(device: Device<T>): Array<IAction>;

    insert<T extends DeviceType>(device: Device<T>, ...actions: Array<IAction>): this;

    synchronize(...devices: Array<Device<DeviceType>>): this;

    pause(duration: number | Device<DeviceType>, ...devices: Array<Device<DeviceType>>): this;

    keyDown(key: Key | string | number): this;

    keyUp(key: Key | string | number): this;

    sendKeys(...keys: Array<Key | string | number>): this;

    press(button?: Button): this;

    release(button?: Button): this;

    scroll(
        x: number,
        y: number,
        targetDeltaX: number,
        targetDeltaY: number,
        origin: WebElement,
        duration: number,
    ): this;

    move(options?: Partial<ActionsMoveOptions>): this;

    click(element: WebElement): this;

    contextClick(element: WebElement): this;

    doubleClick(element: WebElement): this;

    dragAndDrop(from: WebElement, to: WebElement | Coordinates): this;

    clear(): Promise<void>;

    perform(): Promise<void>;

    getSequences(): Array<ActionsSequences>;
}

type DeviceTypeKey = 'key';
type DeviceTypeNone = 'none';
type DeviceTypePointer = 'pointer';
type DeviceTypeWheel = 'wheel';
export type DeviceType = SuggestedString<DeviceTypeKey | DeviceTypeNone | DeviceTypePointer | DeviceTypeWheel>;

interface IDeviceType {
    KEY: DeviceTypeKey;
    NONE: DeviceTypeNone;
    POINTER: DeviceTypePointer;
    WHEEL: DeviceTypeWheel;
}

interface IDeviceJSON {
    type: DeviceType;
    id: string;
}

declare class DeviceBase<T extends DeviceType> {
    readonly id_: string;
    readonly type_: T;

    constructor(type: T, id: string);

    toJSON(): IDeviceJSON;
}

export class Device<T extends DeviceType> extends DeviceBase<T> {
    static readonly Type: IDeviceType;
}

export type { DeviceBase };

export class Keyboard extends Device<DeviceTypeKey> {
    constructor(id: string);

    keyDown(key: Key | string | number): IAction;

    keyUp(key: Key | string | number): IAction;
}

export class FileDetector {
    handleFile(driver: WebDriver, path: string): Promise<void>;
}

type OriginPointer = 'pointer';
type OriginViewport = 'viewport';
export type Origin = SuggestedString<OriginPointer | OriginViewport>;

interface IOrigin {
    POINTER: OriginPointer;
    VIEWPORT: OriginViewport;
}

export const Origin: IOrigin;

type PointerTypeMouse = 'mouse';
type PointerTypePen = 'pen';
type PointerTypeTouch = 'touch';
export type PointerType = SuggestedString<PointerTypeMouse | PointerTypePen | PointerTypeTouch>;

interface IPointerType {
    MOUSE: PointerTypeMouse;
    PEN: PointerTypePen;
    TOUCH: PointerTypeTouch;
}

interface IPointerAction<T extends ActionType> extends IAction<T> {
    altitudeAngle: number;
    azimuthAngle: number;
    height: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    type: T;
    width: number;
    x: number;
    y: number;
}

interface IPointerButtonAction<T extends ActionType, B extends Button = ButtonLeft> extends IPointerAction<T> {
    button: B;
}

interface IPointerMoveAction<T extends ActionType, O extends Origin = OriginViewport> extends IPointerAction<T> {
    origin: O;
}

export class Pointer<T extends PointerType> extends DeviceBase<DeviceTypePointer> {
    readonly pointerType_: T;
    static readonly Type: IPointerType;

    constructor(id: string, type: T);

    cancel(): IAction<ActionTypePointerCancel>;

    move<O extends Origin = OriginViewport>(
        action: Partial<IPointerMoveAction<ActionTypePointerMove, O>>,
    ): IPointerMoveAction<ActionTypePointerMove, O>;

    press<B extends Button = ButtonLeft>(
        button?: B,
        width?: number,
        height?: number,
        pressure?: number,
        tangentialPressure?: number,
        tiltX?: number,
        tilyY?: number,
        twist?: number,
        altitudeAngle?: number,
        azimuthAngle?: number,
    ): IPointerButtonAction<ActionTypePointerDown, B>;

    release<B extends Button = ButtonLeft>(button?: B): IButtonAction<ActionTypePointerUp, B>;
}

declare class Wheel extends Device<DeviceTypeWheel> {
    constructor(id: string);

    scroll(
        x: number,
        y: number,
        deltaX: number,
        deltaY: number,
        origin: WebElement,
        duration: number,
    ): IAction<ActionTypeScroll>;
}

export const INTERNAL_COMPUTE_OFFSET_SCRIPT: string;
