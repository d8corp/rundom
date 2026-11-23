import { locationSearch } from '../locationSearch'

import { RDSlot } from '../../../RDSlot'

export const urlSearchParams = new RDSlot(function urlSearchParams () {
  return new URLSearchParams(locationSearch.value)
})
