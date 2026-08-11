export interface InterceptPhase {
    AUTH_REQUIRED: 'authRequired';
    BEFORE_REQUEST_SENT: 'beforeRequestSent';
    RESPONSE_STARTED: 'responseStarted';
}

export const InterceptPhase: InterceptPhase;
