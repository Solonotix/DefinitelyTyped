export interface ClipRectangle {
    readonly type: 'box' | 'element';
    asMap(): Map<string, unknown>;
}

export class ElementClipRectangle implements ClipRectangle {
    #sharedId: string;
    #handleId?: string;
    readonly type: 'element';
    constructor(sharedId: string, handleId?: string);
    asMap(): Map<string, unknown>;
}

export class BoxClipRectangle implements ClipRectangle {
    #x: number;
    #y: number;
    #width: number;
    #height: number;
    readonly type: 'box';
    constructor(x: number, y: number, width: number, height: number);
    asMap(): Map<string, unknown>;
}
