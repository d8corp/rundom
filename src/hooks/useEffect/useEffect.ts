import { Hub, hub } from 'rune-hub'

import { useClear } from '../useClear'

import { Context } from '../../utils'

export type Effect = () => undefined | (() => void)

/**
 * Runs `effect` once after the current render, inside the same hub and context.
 * The optional returned cleanup runs when the context is cleared.
 */
export function useEffect (effect: Effect) {
  const currentHub = hub()
  const currentContext = Context.current
  const currentSlot = Hub.ctx

  let destroyed = false

  useClear(() => {
    destroyed = true
  })

  const run = () => {
    currentHub.use(() => {
      Context.use(() => {
        const destroy = effect()

        if (destroy) {
          useClear(destroy)
        }
      }, currentContext)
    })
  }

  queueMicrotask(() => {
    if (destroyed) return

    if (currentSlot) {
      currentSlot.use(run)
    } else {
      run()
    }
  })
}
