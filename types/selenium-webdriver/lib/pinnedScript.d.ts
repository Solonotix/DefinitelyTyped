export type ScriptSource = string | ((...args: never[]) => unknown);

export class PinnedScript {
    constructor(script: ScriptSource);

    get handle(): string;
    get source(): ScriptSource;
    get scriptId(): string | undefined;
    set scriptId(id: string);

    creationScript(): string;
    executionScript(): string;
    removalScript(): string;
}
