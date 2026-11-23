import { catchContext } from '../../constants'
import type { ChildrenProps, JSXElement } from '../../types'
import { JSXNode } from '../../types'
import { Context, RDSlot } from '../../utils'

export interface ErrorProps {
  /** Error thrown while rendering the children. */
  error: unknown
  /** Resets the error and renders the children again. */
  retry: () => void
}

export interface TryProps extends ChildrenProps {
  /** Renders instead of `children` when rendering fails. */
  catch?: (props: ErrorProps) => JSXElement
}

/**
 * Catches rendering errors in its subtree and renders the `catch` handler with the error.
 * Use `retry` from the handler props to render the children again.
 */
export function Try (props: TryProps) {
  const tryError = () => {}
  const errorSlot = new RDSlot<unknown>(tryError)

  const retry = () => {
    errorSlot.set(undefined)
  }

  const tryCatch = () => !errorSlot.value ? props.children : props.catch ? props.catch({ error: errorSlot.value, retry }) : undefined
  const tryCatchSlot = new RDSlot(tryCatch)

  const handleError = (error: unknown) => {
    errorSlot.set(error)
  }

  tryCatchSlot.on('error', () => handleError(tryCatchSlot.err))

  return new JSXNode(Context.Provider, {
    for: catchContext,
    set: handleError,
    children: tryCatchSlot,
  })
}
