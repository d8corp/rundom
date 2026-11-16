import Timer from 'sync-timer'

import { useClear } from '../useClear'

import { SystemSlot } from '../../utils'

/**
 * Returns a slot that becomes `true` after `delay` milliseconds.
 * Useful for deferring the display of loading indicators.
 */
export function useShow (delay: number = 100) {
  const useShowState = () => false
  const show = new SystemSlot(useShowState)

  const timer = new Timer(() => {
    show.value = true
  }, delay)

  useClear(() => {
    timer.cancel()
  })

  return show
}
