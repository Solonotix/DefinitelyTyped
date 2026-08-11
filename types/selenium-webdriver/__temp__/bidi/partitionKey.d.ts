export class PartitionKey {
    constructor(userContext: string, sourceOrigin: string);

    get sourceOrigin(): string;

    get userContext(): string;
}
