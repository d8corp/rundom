import SyncTimer from 'sync-timer'

import { useClear } from '../useClear'

import type { ObservableProp } from '../../types'
import { getSlotEvent, use } from '../../utils'

export type ObservableDebounce = ObservableProp<boolean | number>

/**
 * Creates an event handler that writes a debounced value into a `Slot` and/or calls `slotEvent`.
 * `debounce` accepts `true` for the default delay or a number of milliseconds.
 * Returns `undefined` when there is nothing writable to update.
 */
export function useDebounceSlotEvent<T> (
  value: ObservableProp<T>,
  slotEvent?: (value: T) => void,
  debounce?: ObservableDebounce,
) {
  let timer: SyncTimer
  const setValue = getSlotEvent(value, slotEvent)

  if (!setValue) return

  useClear(() => {
    timer?.cancel()
  })

  return (newValue: T) => {
    timer?.cancel()
    const debouncedValue = use(debounce)

    if (debouncedValue) {
      timer = new SyncTimer(() => {
        setValue(newValue)
      }, debouncedValue === true ? 300 : debouncedValue)
    }
  }
}
