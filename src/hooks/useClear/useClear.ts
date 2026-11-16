import type { Listener } from 'rune-hub'

import { useOnce } from '../useOnce'

/**
 * Runs `listener` once, when the current reactive context is cleared.
 * Use it for timers, observers and other cleanup tied to the component.
 */
export function useClear (listener: Listener) {
  useOnce('clear', listener)
}
