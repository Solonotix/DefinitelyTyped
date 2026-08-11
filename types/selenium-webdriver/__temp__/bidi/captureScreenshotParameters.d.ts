// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// 'License'); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import type { MapOf } from '../_internal.js';
import type {
    BoxClipRectangle,
    ElementClipRectangle,
    IBoxClipRectangle,
    IElementClipRectangle,
} from './clipRectangle.js';

export { };

type OriginDocument = 'document';
type OriginViewport = 'viewport';
export type Origin = OriginDocument | OriginViewport;
export interface IOrigin extends Record<Uppercase<Origin>, Origin> {
    DOCUMENT: OriginDocument;
    VIEWPORT: OriginViewport;
}
/**
 * Defines the reference point from which to compute offsets for capturing screenshot.
 */
export const Origin: IOrigin;

export interface ICaptureScreenshotParameters {
    clip?: MapOf<IBoxClipRectangle> | MapOf<IElementClipRectangle>;
    origin?: Origin;
    quality?: number;
    type?: string;
}

/**
 * Represents the optional parameters for capturing a screenshot.
 * Described in https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot.
 */
export class CaptureScreenshotParameters {
    asMap(): MapOf<ICaptureScreenshotParameters>;

    /**
     * Sets the clip rectangle for capturing a screenshot.
     *
     * @param clipRectangle - The clip rectangle to set.
     * @throws If the clipRectangle is not an instance of ClipRectangle.
     * @returns The current instance of the CaptureScreenshotParameters for chaining.
     */
    clipRectangle(clipRectangle: BoxClipRectangle | ElementClipRectangle): this;

    /**
     * Sets the image format and quality for capturing a screenshot.
     *
     * @param type - The image format type.
     * @param quality - The image quality (optional).
     * @throws If the type is not a string or if the quality is not a number.
     * @returns The current instance of the CaptureScreenshotParameters for chaining.
     */
    imageFormat(type: string, quality?: number): this;

    /**
     * Sets the origin for capturing the screenshot.
     *
     * @param origin - The origin for capturing the screenshot. Must be one of `Origin.VIEWPORT` or `Origin.DOCUMENT`.
     * @returns The current instance of the CaptureScreenshotParameters for chaining.
     * @throws If the provided origin is not valid.
     */
    origin(origin: Origin): this;
}
