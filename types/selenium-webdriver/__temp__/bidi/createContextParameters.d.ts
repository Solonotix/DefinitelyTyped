import type { MapOf } from '../_internal.js';
import type { CreateContext } from './_internal.js';

export class CreateContextParameters implements CreateContext.Parameters {
    referenceContext(id: string): this;

    background(background: boolean): this;

    userContext(userContext: string): this;

    asMap(): MapOf<CreateContext.IParameters>;
}
