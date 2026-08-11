export class BrowsingContextPartitionDescriptor {
    constructor(context: string);

    asMap(): Map<string, unknown>;
}

export class StorageKeyPartitionDescriptor {
    userContext(userContext: string): this;
    sourceOrigin(sourceOrigin: string): this;
    asMap(): Map<string, unknown>;
}
