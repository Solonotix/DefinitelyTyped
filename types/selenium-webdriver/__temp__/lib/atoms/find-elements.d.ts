import type { TypedFunction } from '../../_internal.js';
import type { BySelector, RelativeBy } from '../by.js';

type Target = Record<BySelector, string> | RelativeBy;
type TargetFunction = TypedFunction<Target>;

declare function findElements(target: Target | TargetFunction, root?: ParentNode): Array<Element>;

export = findElements;
