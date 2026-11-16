import type { JSXElement, ObservableProp } from '../../types'
import { inject } from '../../utils'

export interface ShowProps {
  /** Condition that controls whether `children` or `fallback` is rendered. */
  when: ObservableProp<any>
  /** Content rendered while the condition is truthy. */
  children?: JSXElement
  /** Content rendered while the condition is falsy. */
  fallback?: JSXElement
}

/**
 * Renders `children` when `when` is truthy and `fallback` otherwise.
 * Accepts static values, functions and `Slot`s as the condition.
 */
export function Show ({ when, children, fallback = null }: ShowProps): JSXElement {
  return inject(when, state => state ? children : fallback)
}
