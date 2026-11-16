import type { Event, Listener } from 'rune-hub'

import { useCtx } from '../useCtx'

/** Listens to a context event once and then unsubscribes automatically. */
export function useOnce (event: Event, listener: Listener) {
  const stop = useCtx()?.on(event, () => {
    stop?.()
    listener()
  })
}
