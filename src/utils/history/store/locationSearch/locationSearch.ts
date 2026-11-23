import { historyState } from '../historyState'

import { RDSlot } from '../../../RDSlot'

export const locationSearch = new RDSlot(function locationSearch () {
  return historyState.value && window.location.search
})
