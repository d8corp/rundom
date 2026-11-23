import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

export const locationHref = new RDSlot(function locationHref () {
  return historyState.value && window.location.href
})
