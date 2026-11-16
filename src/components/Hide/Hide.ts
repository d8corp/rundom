import type { ObservableProp } from '../../types'
import { inject } from '../../utils'

export interface HideProps {
  /** Condition that controls whether `children` are hidden. */
  when: ObservableProp<any>
  /** Content rendered while the condition is falsy. */
  children?: JSX.Element
  /** Content rendered while the condition is truthy. */
  fallback?: JSX.Element
}

/**
 * The inverse of `<Show>`: renders `fallback` when `when` is truthy
 * and `children` otherwise.
 */
export function Hide ({ when, children, fallback = null }: HideProps) {
  return inject(when, state => state ? fallback : children)
}
