import type { MapOf } from '../_internal.js';
import type { BoxClipRectangle, ElementClipRectangle } from './clipRectangle.js';

export type Origin = 'document' | 'viewport';

export interface IOrigin {
    readonly DOCUMENT: 'document';
    readonly VIEWPORT: 'viewport';
}

export const Origin: IOrigin;

export interface ICaptureScreenshotParameters {
    clip?: ReturnType<BoxClipRectangle['asMap']> | ReturnType<ElementClipRectangle['asMap']>;
    origin?: Origin;
    quality?: number;
    type?: string;
}

export class CaptureScreenshotParameters {
    origin(origin: Origin): this;

    imageFormat(type: string, quality?: number): this;

    clipRectangle(clipRectangle: BoxClipRectangle | ElementClipRectangle): this;

    asMap(): MapOf<ICaptureScreenshotParameters>;
}
