export const InterceptPhase: {
    readonly BEFORE_REQUEST_SENT: "beforeRequestSent";
    readonly RESPONSE_STARTED: "responseStarted";
    readonly AUTH_REQUIRED: "authRequired";
};

export type InterceptPhase = (typeof InterceptPhase)[keyof typeof InterceptPhase];
