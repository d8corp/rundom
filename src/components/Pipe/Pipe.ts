import { JSXNode } from '../../types'

export interface PipeProps {
  /** Current nesting depth, starting at `0`. */
  deep?: number
  /** Render function that receives the next `<Pipe>` element and the current depth. */
  children: (children: JSX.Element, deep: number) => JSX.Element
}

/**
 * Renders its `children` render function recursively, incrementing `deep` on every pass.
 * Useful for building index-based lists of sibling components, such as router segments.
 */
export function Pipe ({ deep = 0, children }: PipeProps) {
  return children(new JSXNode(Pipe, { deep: deep + 1, children }), deep)
}
