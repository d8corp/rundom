import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

export const locationURL = new RDSlot(function locationURL () {
  return historyState.value && `${window.location.pathname}${window.location.search}${window.location.hash}`
})
