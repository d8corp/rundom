import type { Event, Listener } from 'rune-hub'

import { useCtx } from '../useCtx'

/** Subscribes `listener` to a context event for the lifetime of the current context. */
export function useOn (event: Event, listener: Listener) {
  useCtx()?.on(event, listener)
}
