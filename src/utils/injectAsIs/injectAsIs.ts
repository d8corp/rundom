import { inject } from '../inject'

import type { ObservableProp, Reactive } from '../../types'

/** Returns its argument unchanged. */
export function asIs<T> (value: T): T {
  return value
}

/** `inject` with an identity callback, keeping values as they are. */
export function injectAsIs<V> (value: ObservableProp<V>): V | Reactive<V> {
  return inject(value, asIs)
}
