import { Slot } from 'rune-hub'

import { use } from '../use'

import type { ObservableProp, Reactive } from '../../types'

export type InjectCallback <V, R> = (value: V) => R

/**
 * Applies `callback` to a static value once, or returns a reactive function
 * that recomputes the result from a `Slot` or another reactive value.
 */
export function inject <V, R> (value: ObservableProp<V>, callback: InjectCallback<V, R>): R | Reactive<R> {
  if (value instanceof Slot || value instanceof Function) {
    return () => callback(use(value))
  }

  return callback(value)
}
