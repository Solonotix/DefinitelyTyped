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
    origin: string;
    realmId: string;
    realmType: T;
}

export class RealmInfo<T extends RealmType = RealmType> implements IRealmInfo<T> {
    origin: string;
    realmId: string;
    realmType: T;

    constructor(realmId: string, origin: string, realmType: T);

    static fromJson(input: Record<string, unknown>): RealmInfo | WindowRealmInfo;
}

export class WindowRealmInfo extends RealmInfo<'window'> {
    browsingContext: string;
    sandbox: string | null;

    constructor(
        realmId: string,
        origin: string,
        realmType: 'window',
        browsingContext: string,
        sandbox?: string | null,
    );
}
