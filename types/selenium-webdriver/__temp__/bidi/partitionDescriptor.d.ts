import type { MapOf, SuggestedString } from '../_internal.js';

export {};

type TypeBrowsingContext = 'context';
type TypeStorageKey = 'storageKey';
type Type = SuggestedString<TypeBrowsingContext | TypeStorageKey>;

export interface IPartitionDescriptor<T extends Type> {
    type: T;
}

export interface IBrowsingContextPartitionDescriptor extends IPartitionDescriptor<TypeBrowsingContext> {
    context: string;
}

export interface IStorageKeyPartitionDescriptor extends IPartitionDescriptor<TypeStorageKey> {
    sourceOrigin?: string;
    userContext?: string;
}

export interface PartitionDescriptorBase {}

export class BrowsingContextPartitionDescriptor implements PartitionDescriptorBase {
    constructor(context: string);

    asMap(): MapOf<IBrowsingContextPartitionDescriptor>;
}

export class StorageKeyPartitionDescriptor implements PartitionDescriptorBase {
    constructor();

    sourceOrigin(sourceOrigin: string): this;

    userContext(userContext: string): this;

    asMap(): MapOf<IStorageKeyPartitionDescriptor>;
}

export namespace PartitionDescriptor {
    export type { 
        BrowsingContextPartitionDescriptor,
        IBrowsingContextPartitionDescriptor,
        IPartitionDescriptor,
        IStorageKeyPartitionDescriptor,
        PartitionDescriptorBase as PartitionDescriptor,
        StorageKeyPartitionDescriptor,
        Type, 
        TypeBrowsingContext as TypeContext, 
        TypeStorageKey 
    };
}
