import { Hub } from 'rune-hub'

/** Returns the reactive context (`Hub.ctx`) of the current render. */
export function useCtx () {
  return Hub.ctx
}
