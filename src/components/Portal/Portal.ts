import { parentContext } from '../../constants'
import { rundom } from '../../rundom'
import type { JSXElement, Parent } from '../../types'
import { Context } from '../../utils'

export interface PortalProps {
  /** DOM element or fragment that receives the content. Defaults to `document.body`. */
  to?: Parent
  /** Content rendered outside the current component tree. */
  children?: JSXElement
}

/**
 * Renders `children` into another DOM element while keeping the current reactive context.
 * Useful for modals, tooltips and notifications that must escape their parent layout.
 */
export function Portal ({ to = document.body, children }: PortalProps) {
  const context = Context.nest()
  parentContext.set(to, context)
  Context.use(() => rundom(children), context)
}
