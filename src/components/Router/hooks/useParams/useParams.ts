import type { Slot } from 'rune-hub'

import { Context } from '../../../../utils'

/** Context that holds the reactive route params of the current `<Router>`. */
export const paramsContext = new Context<undefined | Slot<Record<string, string>>>(undefined)

/**
 * Returns a reactive slot with all route params of the current route.
 * Throws when called outside of `<Router>`.
 */
export function useParams<T extends Record<string, string>> (): Slot<T> {
  const params = paramsContext.get()

  if (!params) {
    throw Error('useParams must be used in Router')
  }

  return params as Slot<T>
}
