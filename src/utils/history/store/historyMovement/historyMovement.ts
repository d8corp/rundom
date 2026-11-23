import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

let _lastLength = 0

export type HistoryMovement = 'back' | 'forward' | 'same'

export const historyMovement = new RDSlot<HistoryMovement>(function historyMovement () {
  const currentLength = historyState.value.steps.length
  const lastLength = _lastLength
  _lastLength = currentLength

  if (currentLength > lastLength) return 'forward'
  if (currentLength < lastLength) return 'back'

  return 'same'
})
