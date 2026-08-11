import type { SuggestedString } from '../_internal.js';

export class Command<T extends Record<string, unknown> = Record<string, unknown>> {
    readonly name_: CommandName;

    private parameters_: T;

    constructor(name: CommandName);

    getName(): CommandName;

    getParameter<K extends string & keyof T>(key: K): T[K] | undefined;

    getParameters(): T;

    setParameter<K extends string & keyof T>(key: K, value: T[K]): this;

    setParameters(parameters: T): this;
}

export type CommandName = SuggestedString<Name[keyof Name]>;
export interface Name {
    GET_SERVER_STATUS: 'getStatus';

    NEW_SESSION: 'newSession';
    GET_SESSIONS: 'getSessions';

    CLOSE: 'close';
    QUIT: 'quit';

    GET_CURRENT_URL: 'getCurrentUrl';
    GET: 'get';
    GO_BACK: 'goBack';
    GO_FORWARD: 'goForward';
    REFRESH: 'refresh';

    ADD_COOKIE: 'addCookie';
    GET_COOKIE: 'getCookie';
    GET_ALL_COOKIES: 'getCookies';
    DELETE_COOKIE: 'deleteCookie';
    DELETE_ALL_COOKIES: 'deleteAllCookies';

    GET_ACTIVE_ELEMENT: 'getActiveElement';
    FIND_ELEMENT: 'findElement';
    FIND_ELEMENTS: 'findElements';
    FIND_ELEMENTS_RELATIVE: 'findElementsRelative';
    FIND_CHILD_ELEMENT: 'findChildElement';
    FIND_CHILD_ELEMENTS: 'findChildElements';

    CLEAR_ELEMENT: 'clearElement';
    CLICK_ELEMENT: 'clickElement';
    SEND_KEYS_TO_ELEMENT: 'sendKeysToElement';

    GET_CURRENT_WINDOW_HANDLE: 'getCurrentWindowHandle';
    GET_WINDOW_HANDLES: 'getWindowHandles';
    GET_WINDOW_RECT: 'getWindowRect';
    SET_WINDOW_RECT: 'setWindowRect';
    MAXIMIZE_WINDOW: 'maximizeWindow';
    MINIMIZE_WINDOW: 'minimizeWindow';
    FULLSCREEN_WINDOW: 'fullscreenWindow';

    SWITCH_TO_WINDOW: 'switchToWindow';
    SWITCH_TO_NEW_WINDOW: 'newWindow';
    SWITCH_TO_FRAME: 'switchToFrame';
    SWITCH_TO_FRAME_PARENT: 'switchToFrameParent';
    GET_PAGE_SOURCE: 'getPageSource';
    GET_TITLE: 'getTitle';

    EXECUTE_SCRIPT: 'executeScript';
    EXECUTE_ASYNC_SCRIPT: 'executeAsyncScript';

    GET_ELEMENT_TEXT: 'getElementText';
    GET_COMPUTED_ROLE: 'getAriaRole';
    GET_COMPUTED_LABEL: 'getAccessibleName';
    GET_ELEMENT_TAG_NAME: 'getElementTagName';
    IS_ELEMENT_SELECTED: 'isElementSelected';
    IS_ELEMENT_ENABLED: 'isElementEnabled';
    IS_ELEMENT_DISPLAYED: 'isElementDisplayed';
    GET_ELEMENT_RECT: 'getElementRect';
    GET_ELEMENT_ATTRIBUTE: 'getElementAttribute';
    GET_DOM_ATTRIBUTE: 'getDomAttribute';
    GET_ELEMENT_VALUE_OF_CSS_PROPERTY: 'getElementValueOfCssProperty';
    GET_ELEMENT_PROPERTY: 'getElementProperty';

    SCREENSHOT: 'screenshot';
    TAKE_ELEMENT_SCREENSHOT: 'takeElementScreenshot';

    PRINT_PAGE: 'printPage';

    GET_TIMEOUT: 'getTimeout';
    SET_TIMEOUT: 'setTimeout';

    ACCEPT_ALERT: 'acceptAlert';
    DISMISS_ALERT: 'dismissAlert';
    GET_ALERT_TEXT: 'getAlertText';
    SET_ALERT_TEXT: 'setAlertValue';

    // Shadow DOM Commands
    GET_SHADOW_ROOT: 'getShadowRoot';
    FIND_ELEMENT_FROM_SHADOWROOT: 'findElementFromShadowRoot';
    FIND_ELEMENTS_FROM_SHADOWROOT: 'findElementsFromShadowRoot';

    // Virtual Authenticator Commands
    ADD_VIRTUAL_AUTHENTICATOR: 'addVirtualAuthenticator';
    REMOVE_VIRTUAL_AUTHENTICATOR: 'removeVirtualAuthenticator';
    ADD_CREDENTIAL: 'addCredential';
    GET_CREDENTIALS: 'getCredentials';
    REMOVE_CREDENTIAL: 'removeCredential';
    REMOVE_ALL_CREDENTIALS: 'removeAllCredentials';
    SET_USER_VERIFIED: 'setUserVerified';

    GET_AVAILABLE_LOG_TYPES: 'getAvailableLogTypes';
    GET_LOG: 'getLog';

    // Non-standard commands used by the standalone Selenium server.
    UPLOAD_FILE: 'uploadFile';

    ACTIONS: 'actions';
    CLEAR_ACTIONS: 'clearActions';

    GET_DOWNLOADABLE_FILES: 'getDownloadableFiles';
    DOWNLOAD_FILE: 'downloadFile';
    DELETE_DOWNLOADABLE_FILES: 'deleteDownloadableFiles';

    FIRE_SESSION_EVENT: 'fireSessionEvent';

    // Federated Credential Management API
    // https://www.w3.org/TR/fedcm/#automation
    CANCEL_DIALOG: 'cancelDialog';
    SELECT_ACCOUNT: 'selectAccount';
    GET_ACCOUNTS: 'getAccounts';
    GET_FEDCM_TITLE: 'getFedCmTitle';
    GET_FEDCM_DIALOG_TYPE: 'getFedCmDialogType';
    SET_DELAY_ENABLED: 'setDelayEnabled';
    RESET_COOLDOWN: 'resetCooldown';
    CLICK_DIALOG_BUTTON: 'clickdialogbutton';
}

export const Name: Name;

export class Executor {
    execute<T>(command: Command): Promise<T>;
}
