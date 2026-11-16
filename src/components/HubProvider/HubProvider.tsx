import type { Hub } from 'rune-hub'

import { rundom } from '../../rundom'
import type { JSXElement } from '../../types'

export interface HubProviderProps {
  /** Hub instance that owns the reactive context of the children. */
  hub: Hub
  /** Content rendered inside the hub context. */
  children: JSXElement
}

/**
 * Runs its children in the context of the provided `hub`,
 * so all reactive updates inside them belong to that hub.
 */
export function HubProvider ({ hub, children }: HubProviderProps) {
  hub.use(() => rundom(children))
}
