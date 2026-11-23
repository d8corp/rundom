import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

export const locationHash = new RDSlot(function locationHash () {
  return historyState.value && window.location.hash
})
