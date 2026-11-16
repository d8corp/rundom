import type { JSXSource, JSXType, JSXTypeProps } from '../../types'
import { JSXNode } from '../../types'

/** JSX runtime factory that creates a `JSXNode` for a tag or component. */
export function jsx <T extends JSXType> (
  type: T,
  props: JSXTypeProps<T>,
  key?: string,
  isStatic?: boolean,
  source?: JSXSource,
): JSXNode<T> {
  if (key !== undefined) {
    props.key = key
  }

  return new JSXNode(type, props, source)
}

export const jsxs = jsx
export const jsxDEV = jsx
export const Fragment = undefined
