export type ErrorCodeSuccess = 0;
export type ErrorCodeNoSuchSession = 6;
export type ErrorCodeNoSuchElement = 7;
export type ErrorCodeNoSuchFrame = 8;
export type ErrorCodeUnknownCommand = 9;
export type ErrorCodeUnsupportedOperation = 9;
export type ErrorCodeStaleElementReference = 10;
export type ErrorCodeElementNotVisible = 11;
export type ErrorCodeInvalidElementState = 12;
export type ErrorCodeUnknownError = 13;
export type ErrorCodeElementNotSelectable = 15;
export type ErrorCodeJavaScriptError = 17;
export type ErrorCodeXPathLookupError = 19;
export type ErrorCodeTimeout = 21;
export type ErrorCodeNoSuchWindow = 23;
export type ErrorCodeInvalidCookieDomain = 24;
export type ErrorCodeUnableToSetCookie = 25;
export type ErrorCodeUnexpectedAlertOpen = 26;
export type ErrorCodeNoSuchAlert = 27;
export type ErrorCodeScriptTimeout = 28;
export type ErrorCodeInvalidElementCoordinates = 29;
export type ErrorCodeImeNotAvailable = 30;
export type ErrorCodeImeEngineActivationFailed = 31;
export type ErrorCodeInvalidSelector = 32;
export type ErrorCodeSessionNotCreated = 33;
export type ErrorCodeMoveTargetOutOfBounds = 34;
export type ErrorCodeSqlDatabaseError = 35;
export type ErrorCodeInvalidXpathSelector = 51;
export type ErrorCodeInvalidXpathSelectorReturnType = 52;
export type ErrorCodeElementNotInteractable = 60;
export type ErrorCodeInvalidArgument = 61;
export type ErrorCodeNoSuchCookie = 62;
export type ErrorCodeUnableToCaptureScreen = 63;
export type ErrorCodeElementClickIntercepted = 64;
export type ErrorCodeDetachedShadowRoot = 65;
export type ErrorCodeMethodNotAllowed = 405;
export type ErrorCode =
    | ErrorCodeSuccess
    | ErrorCodeNoSuchSession
    | ErrorCodeNoSuchElement
    | ErrorCodeNoSuchFrame
    | ErrorCodeUnknownCommand
    | ErrorCodeUnsupportedOperation
    | ErrorCodeStaleElementReference
    | ErrorCodeElementNotVisible
    | ErrorCodeInvalidElementState
    | ErrorCodeUnknownError
    | ErrorCodeElementNotSelectable
    | ErrorCodeJavaScriptError
    | ErrorCodeXPathLookupError
    | ErrorCodeTimeout
    | ErrorCodeNoSuchWindow
    | ErrorCodeInvalidCookieDomain
    | ErrorCodeUnableToSetCookie
    | ErrorCodeUnexpectedAlertOpen
    | ErrorCodeNoSuchAlert
    | ErrorCodeScriptTimeout
    | ErrorCodeInvalidElementCoordinates
    | ErrorCodeImeNotAvailable
    | ErrorCodeImeEngineActivationFailed
    | ErrorCodeInvalidSelector
    | ErrorCodeSessionNotCreated
    | ErrorCodeMoveTargetOutOfBounds
    | ErrorCodeSqlDatabaseError
    | ErrorCodeInvalidXpathSelector
    | ErrorCodeInvalidXpathSelectorReturnType
    | ErrorCodeElementNotInteractable
    | ErrorCodeInvalidArgument
    | ErrorCodeNoSuchCookie
    | ErrorCodeUnableToCaptureScreen
    | ErrorCodeElementClickIntercepted
    | ErrorCodeDetachedShadowRoot
    | ErrorCodeMethodNotAllowed;
interface IErrorCode {
    SUCCESS: ErrorCodeSuccess;
    NO_SUCH_SESSION: ErrorCodeNoSuchSession;
    NO_SUCH_ELEMENT: ErrorCodeNoSuchElement;
    NO_SUCH_FRAME: ErrorCodeNoSuchFrame;
    UNKNOWN_COMMAND: ErrorCodeUnknownCommand;
    UNSUPPORTED_OPERATION: ErrorCodeUnsupportedOperation;
    STALE_ELEMENT_REFERENCE: ErrorCodeStaleElementReference;
    ELEMENT_NOT_VISIBLE: ErrorCodeElementNotVisible;
    INVALID_ELEMENT_STATE: ErrorCodeInvalidElementState;
    UNKNOWN_ERROR: ErrorCodeUnknownError;
    ELEMENT_NOT_SELECTABLE: ErrorCodeElementNotSelectable;
    JAVASCRIPT_ERROR: ErrorCodeJavaScriptError;
    XPATH_LOOKUP_ERROR: ErrorCodeXPathLookupError;
    TIMEOUT: ErrorCodeTimeout;
    NO_SUCH_WINDOW: ErrorCodeNoSuchWindow;
    INVALID_COOKIE_DOMAIN: ErrorCodeInvalidCookieDomain;
    UNABLE_TO_SET_COOKIE: ErrorCodeUnableToSetCookie;
    UNEXPECTED_ALERT_OPEN: ErrorCodeUnexpectedAlertOpen;
    NO_SUCH_ALERT: ErrorCodeNoSuchAlert;
    SCRIPT_TIMEOUT: ErrorCodeScriptTimeout;
    INVALID_ELEMENT_COORDINATES: ErrorCodeInvalidElementCoordinates;
    IME_NOT_AVAILABLE: ErrorCodeImeNotAvailable;
    IME_ENGINE_ACTIVATION_FAILED: ErrorCodeImeEngineActivationFailed;
    INVALID_SELECTOR_ERROR: ErrorCodeInvalidSelector;
    SESSION_NOT_CREATED: ErrorCodeSessionNotCreated;
    MOVE_TARGET_OUT_OF_BOUNDS: ErrorCodeMoveTargetOutOfBounds;
    SQL_DATABASE_ERROR: ErrorCodeSqlDatabaseError;
    INVALID_XPATH_SELECTOR: ErrorCodeInvalidXpathSelector;
    INVALID_XPATH_SELECTOR_RETURN_TYPE: ErrorCodeInvalidXpathSelectorReturnType;
    ELEMENT_NOT_INTERACTABLE: ErrorCodeElementNotInteractable;
    INVALID_ARGUMENT: ErrorCodeInvalidArgument;
    NO_SUCH_COOKIE: ErrorCodeNoSuchCookie;
    UNABLE_TO_CAPTURE_SCREEN: ErrorCodeUnableToCaptureScreen;
    ELEMENT_CLICK_INTERCEPTED: ErrorCodeElementClickIntercepted;
    DETACHED_SHADOW_ROOT: ErrorCodeDetachedShadowRoot;
    METHOD_NOT_ALLOWED: ErrorCodeMethodNotAllowed;
}
export const ErrorCode: IErrorCode;
export interface IEncodedError {
    error: ErrorCode;
    message: string;
}
export interface IErrorResponse {
    error: string;
}

export function checkLegacyResponse<T>(response: T): T;
export function encodeError(err: unknown): IEncodedError;
export function isErrorResponse(data: unknown): data is IErrorResponse;
export function throwDecodedError(data: IEncodedError): void;

export class WebDriverError extends Error {
    readonly name: string;
    readonly remoteStacktrace: string;
}

export class DetachedShadowRootError extends WebDriverError {}
export class ElementClickInterceptedError extends WebDriverError {}
export class ElementNotInteractableError extends WebDriverError {}
export class ElementNotSelectableError extends WebDriverError {}
export class InsecureCertificateError extends WebDriverError {}
export class InvalidArgumentError extends WebDriverError {}
export class InvalidCookieDomainError extends WebDriverError {}
export class InvalidCoordinatesError extends WebDriverError {}
export class InvalidElementStateError extends WebDriverError {}
export class InvalidSelectorError extends WebDriverError {}
export class JavascriptError extends WebDriverError {}
export class MoveTargetOutOfBoundsError extends WebDriverError {}
export class NoSuchAlertError extends WebDriverError {}
export class NoSuchCookieError extends WebDriverError {}
export class NoSuchElementError extends WebDriverError {}
export class NoSuchFrameError extends WebDriverError {}
export class NoSuchShadowRootError extends WebDriverError {}
export class NoSuchSessionError extends WebDriverError {}
export class NoSuchWindowError extends WebDriverError {}
export class ScriptTimeoutError extends WebDriverError {}
export class SessionNotCreatedError extends WebDriverError {}
export class StaleElementReferenceError extends WebDriverError {}
export class TimeoutError extends WebDriverError {}
export class UnableToSetCookieError extends WebDriverError {}
export class UnableToCaptureScreenError extends WebDriverError {}
export class UnexpectedAlertOpenError extends WebDriverError {
    constructor(error?: string, text?: string);

    getAlertText(): string | undefined;
}
export class UnknownCommandError extends WebDriverError {}
export class UnknownMethodError extends WebDriverError {}
export class UnsupportedOperationError extends WebDriverError {}
