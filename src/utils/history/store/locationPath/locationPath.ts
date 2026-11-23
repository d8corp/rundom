import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

export const locationPath = new RDSlot(function locationPath () {
  return historyState.value && window.location.pathname
})
