import type { Slot } from 'rune-hub'

import { useParams } from '../useParams'

import { SystemSlot } from '../../../../utils'

/**
 * Returns a reactive slot with the value of a single route parameter.
 * @param name - Dynamic segment name from the route path, without the `:`.
 */
export function useParam<T extends string | undefined> (name: string): Slot<T> {
  const params = useParams()
  const routeParameter = () => params.value[name] as T

  return new SystemSlot<T>(routeParameter)
}
