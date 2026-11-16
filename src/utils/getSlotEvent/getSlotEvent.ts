import { Slot } from 'rune-hub'

import type { ObservableProp } from '../../types'

/**
 * Builds an event handler that writes into a `Slot` and/or calls the provided callback.
 * Returns the callback itself when the value is not a `Slot`.
 */
export function getSlotEvent<T, TT extends T> (
  value: ObservableProp<T>,
  slotEvent?: (value: TT) => void,
) {
  return value && value instanceof Slot
    ? (val: TT) => {
        value.set(val)
        slotEvent?.(val)
      }
    : slotEvent
}
