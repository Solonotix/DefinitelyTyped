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
export interface IErrorCode {
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

/**
 * Enum of legacy error codes.
 * TODO: remove this when all code paths have been switched to the new error
 * types.
 * @deprecated
 */
export const ErrorCode: IErrorCode;
// TODO: The staged declaration reused the legacy numeric ErrorCode union here, but the 4.46.0 W3C encoder and
// decoder use string error names.
export interface IEncodedError {
    error: string;
    message: string;
}
export interface IErrorResponse {
    error: string;
}

/**
 * Checks a legacy response from the Selenium 2.0 wire protocol for an error.
 * @param responseObj the response object to check.
 * @return responseObj the original response if it does not define an error.
 * @throws if the response object defines an error.
 */
export function checkLegacyResponse<T>(response: T): T;
/**
 * @param err The error to encode.
 * @return the encoded error.
 */
export function encodeError(err: unknown): IEncodedError;
/**
 * Tests if the given value is a valid error response object according to the
 * W3C WebDriver spec.
 *
 * @param data The value to test.
 * @return Whether the given value data object is a valid error response.
 * @see https://w3c.github.io/webdriver/webdriver-spec.html#protocol
 */
export function isErrorResponse(data: unknown): data is IErrorResponse;
/**
 * Throws an error coded from the W3C protocol. A generic error will be thrown
 * if the provided `data` is not a valid encoded error.
 *
 * @param data The error data to decode.
 * @throws the decoded error.
 * @see https://w3c.github.io/webdriver/webdriver-spec.html#protocol
 */
export function throwDecodedError(data: IEncodedError): void;

/**
 * The base WebDriver error type. This error type is only used directly when a
 * more appropriate category is not defined for the offending error.
 * @param opt_error the error message, if any.
 */
export class WebDriverError<T extends string = "WebDriverError"> extends Error {
    readonly name: T;
    readonly remoteStacktrace: string;

    constructor(opt_error?: string);
}

/**
 * Indicates the shadow root is no longer attached to the DOM
 *  @param opt_error the error message, if any.
 */
export class DetachedShadowRootError extends WebDriverError<"DetachedShadowRootError"> {}
/**
 * Indicates a {@linkplain ./webdriver.WebElement#click click command} could not
 * completed because the click target is obscured by other elements on the
 * page.
 * @param opt_error the error message, if any.
 */
export class ElementClickInterceptedError extends WebDriverError<"ElementClickInterceptedError"> {}
/**
 * Indicates a command could not be completed because the target element is
 * not pointer or keyboard interactable. This will often occur if an element
 * is present in the DOM, but not rendered (i.e. its CSS style has
 * "display: none").
 * @param opt_error the error message, if any.
 */
export class ElementNotInteractableError extends WebDriverError<"ElementNotInteractableError"> {}
/**
 * An attempt was made to select an element that cannot be selected.
 * @param opt_error the error message, if any.
 */
export class ElementNotSelectableError extends WebDriverError<"ElementNotSelectableError"> {}
/**
 * Indicates a navigation event caused the browser to generate a certificate
 * warning. This is usually caused by an expired or invalid TLS certificate.
 * @param opt_error the error message, if any.
 */
export class InsecureCertificateError extends WebDriverError<"InsecureCertificateError"> {}
/**
 * The arguments passed to a command are either invalid or malformed.
 * @param opt_error the error message, if any.
 */
export class InvalidArgumentError extends WebDriverError<"InvalidArgumentError"> {}
/**
 * An illegal attempt was made to set a cookie under a different domain than
 * the current page.
 * @param opt_error the error message, if any.
 */
export class InvalidCookieDomainError extends WebDriverError<"InvalidCookieDomainError"> {}
/**
 * The coordinates provided to an interactions operation are invalid.
 * @param opt_error the error message, if any.
 */
export class InvalidCoordinatesError extends WebDriverError<"InvalidCoordinatesError"> {}
/**
 * An element command could not be completed because the element is in an
 * invalid state, e.g. attempting to click an element that is no longer attached
 * to the document.
 * @param opt_error the error message, if any.
 */
export class InvalidElementStateError extends WebDriverError<"InvalidElementStateError"> {}
/**
 * Argument was an invalid selector.
 * @param opt_error the error message, if any.
 */
export class InvalidSelectorError extends WebDriverError<"InvalidSelectorError"> {}
/**
 * An error occurred while executing JavaScript supplied by the user.
 * @param opt_error the error message, if any.
 */
export class JavascriptError extends WebDriverError<"JavascriptError"> {}
/**
 * The target for mouse interaction is not in the browser’s viewport and cannot
 * be brought into that viewport.
 * @param opt_error the error message, if any.
 */
export class MoveTargetOutOfBoundsError extends WebDriverError<"MoveTargetOutOfBoundsError"> {}
/**
 * An attempt was made to operate on a modal dialog when one was not open.
 * @param opt_error the error message, if any.
 */
export class NoSuchAlertError extends WebDriverError<"NoSuchAlertError"> {}
/**
 * Indicates a named cookie could not be found in the cookie jar for the
 * currently selected document.
 * @param opt_error the error message, if any.
 */
export class NoSuchCookieError extends WebDriverError<"NoSuchCookieError"> {}
/**
 * An element could not be located on the page using the given search
 * parameters.
 * @param opt_error the error message, if any.
 */
export class NoSuchElementError extends WebDriverError<"NoSuchElementError"> {}
/**
 * A request to switch to a frame could not be satisfied because the frame
 * could not be found.
 * @param opt_error the error message, if any.
 */
export class NoSuchFrameError extends WebDriverError<"NoSuchFrameError"> {}
/**
 * A ShadowRoot could not be located on the element
 * @param opt_error the error message, if any.
 */
export class NoSuchShadowRootError extends WebDriverError<"NoSuchShadowRootError"> {}
/**
 * Occurs when a command is directed to a session that does not exist.
 * @param opt_error the error message, if any.
 */
export class NoSuchSessionError extends WebDriverError<"NoSuchSessionError"> {}
/**
 * A request to switch to a window could not be satisfied because the window
 * could not be found.
 * @param opt_error the error message, if any.
 */
export class NoSuchWindowError extends WebDriverError<"NoSuchWindowError"> {}
/**
 * A script did not complete before its timeout expired.
 * @param opt_error the error message, if any.
 */
export class ScriptTimeoutError extends WebDriverError<"ScriptTimeoutError"> {}
/**
 * A new session could not be created.
 * @param opt_error the error message, if any.
 */
export class SessionNotCreatedError extends WebDriverError<"SessionNotCreatedError"> {}
/**
 * An element command failed because the referenced element is no longer
 * attached to the DOM.
 * @param opt_error the error message, if any.
 */
export class StaleElementReferenceError extends WebDriverError<"StaleElementReferenceError"> {}
/**
 * An operation did not complete before its timeout expired.
 * @param opt_error the error message, if any.
 */
export class TimeoutError extends WebDriverError<"TimeoutError"> {}
/**
 * A screen capture operation was not possible.
 * @param opt_error the error message, if any.
 */
export class UnableToCaptureScreenError extends WebDriverError<"UnableToCaptureScreenError"> {}
/**
 * A request to set a cookie’s value could not be satisfied.
 * @param opt_error the error message, if any.
 */
export class UnableToSetCookieError extends WebDriverError<"UnableToSetCookieError"> {}
/**
 * A modal dialog was open, blocking this operation.
 * @param opt_error the error message, if any.
 * @param opt_text the text of the open dialog, if available.
 */
export class UnexpectedAlertOpenError extends WebDriverError<"UnexpectedAlertOpenError"> {
    readonly text_: string | undefined;

    constructor(opt_error?: string, opt_text?: string);

    getAlertText(): string | undefined;
}
/**
 * A command could not be executed because the remote end is not aware of it.
 * @param opt_error the error message, if any.
 */
export class UnknownCommandError extends WebDriverError<"UnknownCommandError"> {}
/**
 * The requested command matched a known URL but did not match an method for
 * that URL.
 * @param opt_error the error message, if any.
 */
export class UnknownMethodError extends WebDriverError<"UnknownMethodError"> {}
/**
 * Reports an unsupported operation.
 * @param opt_error the error message, if any.
 */
export class UnsupportedOperationError extends WebDriverError<"UnsupportedOperationError"> {}
