import { type LazyFn } from '../lazy'

import { LAZY } from '../../constants'

/** Checks whether a value was created by the `lazy()` utility. */
export function isLazy (value: any): value is LazyFn {
  return LAZY in value
}
