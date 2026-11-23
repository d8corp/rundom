import { parentContext } from '../../constants'
import { useClear } from '../../hooks'
import { promiseCounterContext, rundom } from '../../rundom'
import type { ChildrenProps, JSXElement } from '../../types'
import { append, Content, Context, extract, RDSlot, remove } from '../../utils'

export interface SuspenseProps extends ChildrenProps {
  /** Content rendered while any promise inside `children` is pending. */
  fallback?: JSXElement
}

/**
 * Boundaries async rendering: shows `fallback` while promises inside its subtree
 * are pending and swaps in the resolved content afterwards.
 */
export function Suspense ({ fallback, children }: SuspenseProps) {
  const content = new Content()
  const context = Context.nest()
  const parent = parentContext.get()
  const suspensePromiseCount = () => 0
  const suspenseWaiting = () => Boolean(suspense.value)
  const suspense = new RDSlot(suspensePromiseCount)
  const waiting = new RDSlot(suspenseWaiting)
  let destroy = false

  useClear(() => {
    destroy = true
  })

  parentContext.set(content, context)
  promiseCounterContext.set(suspense, context)

  Context.use(() => {
    rundom(children)
  }, context)

  return () => {
    if (waiting.value) {
      return fallback
    }

    append(parent, content)

    useClear(() => {
      if (destroy) {
        remove(content)
      } else {
        extract(content)
      }
    })
  }
}
