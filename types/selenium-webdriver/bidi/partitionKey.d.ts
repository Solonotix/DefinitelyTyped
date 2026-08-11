export class PartitionKey {
    constructor(userContext: string, sourceOrigin: string);

    get userContext(): string;
    get sourceOrigin(): string;
}
