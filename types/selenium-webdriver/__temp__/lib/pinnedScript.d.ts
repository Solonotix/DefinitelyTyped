export class PinnedScript {
    readonly scriptSource_: string | CallableFunction;
    readonly scriptHandle_: string;
    private scriptId_?: string;

    constructor(script: string | CallableFunction);

    get handle(): string;

    get source(): string | CallableFunction;

    get scriptId(): string | undefined;

    set scriptId(id: string);

    creationScript(): string;

    executionScript(): string;

    removalScript(): string;
}
