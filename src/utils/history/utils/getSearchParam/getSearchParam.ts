import type { Slot } from 'rune-hub'

import { RDSlot } from '../../../RDSlot'
import { urlSearchParams } from '../../store'

const cache: Record<string, Slot<string>> = Object.create(null)

/**
 * Returns a cached reactive slot with the value of a URL search param.
 * The slot updates whenever the URL changes.
 */
export function getSearchParam (key: string) {
  if (key in cache) return cache[key]

  return (cache[key] = new RDSlot(function getSearchParam () {
    return urlSearchParams.value.get(key) || ''
  }))
}
