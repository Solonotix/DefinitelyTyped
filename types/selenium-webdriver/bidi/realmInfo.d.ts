import type { SuggestedString } from '../_internal.js';

export type RealmType = SuggestedString<
    | 'audio-worklet'
    | 'dedicated-worker'
    | 'paint-worklet'
    | 'service-worker'
    | 'shared-worker'
    | 'window'
    | 'worker'
    | 'worklet'
>;

export interface IRealmType {
    AUDIO_WORKLET: 'audio-worklet';
    DEDICATED_WORKER: 'dedicated-worker';
    PAINT_WORKLET: 'paint-worklet';
    SERVICE_WORKED: 'service-worker';
    SHARED_WORKED: 'shared-worker';
    WINDOW: 'window';
    WORKER: 'worker';
    WORKLET: 'worklet';

    findByName(name: string): RealmType | null;
}

export const RealmType: IRealmType;

export interface IRealmInfo<T extends RealmType = RealmType> {
    readonly browsingContext?: string;
    readonly origin: string;
    readonly realmId: string;
    readonly realmType: T;
    readonly sandbox?: string | null;
}

export class RealmInfo<T extends RealmType = RealmType> implements IRealmInfo<T> {
    readonly origin: string;
    readonly realmId: string;
    readonly realmType: T;

    constructor(realmId: string, origin: string, realmType: T);

    static fromJson<T extends RealmType>(input: object): RealmInfo<T> | WindowRealmInfo;
}

export class WindowRealmInfo extends RealmInfo<'window'> {
    readonly browsingContext: string;
    readonly sandbox: string | null;

    constructor(
        realmId: string,
        origin: string,
        realmType: 'window',
        browsingContext: string,
        sandbox?: string | null,
    );
}
