import type { SuggestedString } from '../_internal.js';

export { };

type ProtocolCtap2 = 'ctap2';
type ProtocolU2f = 'ctap1/u2f';
export type Protocol = SuggestedString<ProtocolCtap2 | ProtocolU2f>;
export const Protocol: IProtocol;
export interface IProtocol {
    CTAP2: ProtocolCtap2;
    U2F: ProtocolU2f;
}

type TransportBle = 'ble';
type TransportInternal = 'internal';
type TransportNfc = 'nfc';
type TransportUsb = 'usb';
export type Transport = SuggestedString<TransportBle | TransportInternal | TransportNfc | TransportUsb>;
export const Transport: ITransport;
export interface ITransport {
    BLE: TransportBle;
    INTERNAL: TransportInternal;
    NFC: TransportNfc;
    USB: TransportUsb;
}

interface IVirtualAuthenticatorOptions {
    readonly hasResidentKey: boolean;
    readonly hasUserVerification: boolean;
    readonly isUserConsenting: boolean;
    readonly isUserVerified: boolean;
    readonly protocol: Protocol;
    readonly transport: Transport;
}

/**
 * Options for the creation of virtual authenticators.
 * @see http://w3c.github.io/webauthn/#sctn-automation
 */
export class VirtualAuthenticatorOptions {
    private _hasResidentKey: boolean;
    private _hasUserVerification: boolean;
    private _isUserConsenting: boolean;
    private _isUserVerified: boolean;
    private _protocol: Protocol;
    private _transport: Transport;

    /**
     * Constructor to initialise VirtualAuthenticatorOptions object.
     */
    constructor();

    getProtocol(): Protocol;

    setProtocol(protocol: Protocol): void;

    getTransport(): Transport;

    setTransport(transport: Transport): void;

    getHasResidentKey(): boolean;

    setHasResidentKey(value: boolean): void;

    getHasUserVerification(): boolean;

    setHasUserVerification(value: boolean): void;

    getIsUserConsenting(): boolean;

    setIsUserConsenting(value: boolean): void;

    getIsUserVerified(): boolean;

    setIsUserVerified(value: boolean): void;

    toDict(): IVirtualAuthenticatorOptions;
}

export interface ICredentialDictionary {
    credentialId: string;
    isResidentCredential: boolean;
    rpId: string;
    privateKey: string;
    signCount: number;
    userHandle?: string;
}

/**
 * A credential stored in a virtual authenticator.
 * @see https://w3c.github.io/webauthn/#credential-parameters
 */
export class Credential {
    private _id: Uint8Array;
    private _isResidentCredential: boolean;
    private _privateKey: string;
    private _rpId: string;
    private _signCount: number;
    private _userHandle: Uint8Array | null;

    constructor(
        credentialId: Uint8Array,
        isResidentCredential: boolean,
        rpId: string,
        userHandle: Uint8Array | null,
        privateKey: string,
        signCount: number,
    );

    createResidentCredential(
        id: Uint8Array,
        rpId: string,
        userHandle: Uint8Array | null,
        privateKey: string,
        signCount: number,
    ): Credential;

    static createResidentCredential(
        id: Uint8Array,
        rpId: unknown,
        userHandle: string | null,
        privateKey: string,
        signCount: unknown,
    ): Credential;

    createNonResidentCredential(id: Uint8Array, rpId: string, privateKey: string, signCount: number): Credential;

    static createNonResidentCredential(id: Uint8Array, rpId: string, privateKey: string, signCount: number): Credential;

    id(): Uint8Array;

    isResidentCredential(): boolean;

    rpId(): string;

    userHandle(): Uint8Array | null;

    privateKey(): string;

    signCount(): number;

    toDict(): ICredentialDictionary;

    fromDict(data: ICredentialDictionary): Credential;
}
