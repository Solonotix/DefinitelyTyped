import type { MapOf } from '../_internal.js';

export type PartitionDescriptorType = 'context' | 'storageKey';

export interface IPartitionDescriptor<T extends PartitionDescriptorType> {
    type: T;
}

export interface IBrowsingContextPartitionDescriptor extends IPartitionDescriptor<'context'> {
    context: string;
}

export interface IStorageKeyPartitionDescriptor extends IPartitionDescriptor<'storageKey'> {
    sourceOrigin?: string;
    userContext?: string;
}

export class BrowsingContextPartitionDescriptor {
    constructor(context: string);

    asMap(): MapOf<IBrowsingContextPartitionDescriptor>;
}

export class StorageKeyPartitionDescriptor {
    userContext(userContext: string): this;
    sourceOrigin(sourceOrigin: string): this;
    asMap(): MapOf<IStorageKeyPartitionDescriptor>;
}
