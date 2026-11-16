import type { Component, JSXElement, Props } from '../../types'
import { JSXNode } from '../../types'

/** Creates a `JSXNode` from a component, its props and children. */
export function createElement (type: Component, props: Props, children: JSXElement[]) {
  if (!children?.length && !props) return new JSXNode(type, {})

  props = props ?? {}

  if (children?.length) {
    props.children = children
  }

  return new JSXNode(type, props)
}
