import type { MapOf, SuggestedString } from '../_internal.js';

export { };

type ClipTypeBox = 'box';
type ClipTypeElement = 'element';
export type ClipType = SuggestedString<ClipTypeBox | ClipTypeElement>;

declare class ClipRectangle<T extends ClipType> {
    readonly clipType: T;

    constructor(clipType: T);

    get type(): T;
}

export interface IBoxClipRectangle {
    height: number;
    width: number;
    x: number;
    y: number;
    type: ClipTypeBox;
}

export class BoxClipRectangle extends ClipRectangle<ClipTypeBox> {
    constructor(x: number, y: number, width: number, height: number);

    asMap(): MapOf<IBoxClipRectangle>;
}

export interface IElementClipRectangle {
    handleId?: string;
    sharedId: string;
    type: ClipTypeElement;
}

export class ElementClipRectangle extends ClipRectangle<ClipTypeElement> {
    constructor(sharedId: string, handleId?: string);

    asMap(): MapOf<IElementClipRectangle>;
}
