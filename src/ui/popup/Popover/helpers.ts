import { unwatch } from 'rune-hub'

import { POPOVER_STATIC_PLACEMENT_PREFIX, POPOVER_STATIC_POSTFIX } from './constants'
import type {
  PopoverAdapter,
  PopoverDynamicPlacementPrefix,
  PopoverPlacement,
  PopoverPlacementPostfix,
  PopoverPlacementPrefix,
  PopoverStaticPlacementPostfix,
  PopoverStaticPlacementPrefix,
  PopoverStaticSplitPlacement,
  PopoverTarget,
} from './types'

import { useClear } from '../../../hooks'
import type { DomElement, ObservableProp } from '../../../types'
import type { Content } from '../../../utils'
import { Context, getNextDomElement, getParentElement, getPrevDomElement, RDSlot, Ref, use } from '../../../utils'

/** Checks whether an element clips its content with an overflow value. */
export function isOverflowElement (element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element)

  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !['inline', 'contents'].includes(display)
  )
}

/** Finds the nearest parent that clips its content, falling back to `document.body`. */
export function getOverflowParent (node: Node): HTMLElement {
  const parentNode = node.parentNode

  if (node === document.body || !parentNode) return document.body

  if (parentNode instanceof HTMLElement && isOverflowElement(parentNode)) {
    return parentNode
  }

  return getOverflowParent(parentNode)
}

export function getOverflowParents (node: Node): HTMLElement[] {
  let parent = getOverflowParent(node)
  const parents: HTMLElement[] = [parent]

  while (parent !== document.body) {
    parent = getOverflowParent(parent)
    parents.push(parent)
  }

  return parents
}

/** Resolves a placement into a static side and alignment. */
export function getStaticPlacement (
  placement: PopoverPlacement,
  targetRect: DOMRect,
): PopoverStaticSplitPlacement {
  const [prefix, postfix] = placement.split('-') as [PopoverPlacementPrefix, PopoverPlacementPostfix]

  const isStaticPrefix = POPOVER_STATIC_PLACEMENT_PREFIX.includes(prefix as PopoverStaticPlacementPrefix)
  const isStaticPostfix = POPOVER_STATIC_POSTFIX.includes(postfix as PopoverStaticPlacementPostfix)

  if (isStaticPrefix && isStaticPostfix) return [prefix, postfix] as PopoverStaticSplitPlacement

  const staticPrefix = isStaticPrefix
    ? prefix as PopoverStaticPlacementPrefix
    : getStaticPrefixPlacement(prefix as PopoverDynamicPlacementPrefix, targetRect)

  const staticPostfix = isStaticPostfix
    ? postfix as PopoverStaticPlacementPostfix
    : getStaticPostfixPlacement(staticPrefix, targetRect)

  return [staticPrefix, staticPostfix]
}

/** Picks the alignment that keeps the popover inside the viewport. */
export function getStaticPostfixPlacement (
  prefix: PopoverStaticPlacementPrefix,
  targetRect: DOMRect,
): PopoverStaticPlacementPostfix {
  if (prefix === 'top' || prefix === 'bottom') {
    const leftDif = targetRect.left
    const rightDif = window.innerWidth - targetRect.right

    return leftDif > rightDif ? 'end' : 'start'
  }

  const topDif = targetRect.top
  const bottomDif = window.innerHeight - targetRect.bottom

  return topDif > bottomDif ? 'end' : 'start'
}

/** Picks the side with the most free space around the target. */
export function getStaticPrefixPlacement (
  prefix: PopoverDynamicPlacementPrefix,
  targetRect: DOMRect,
): PopoverStaticPlacementPrefix {
  const leftDif = targetRect.left
  const rightDif = window.innerWidth - targetRect.right

  if (prefix === 'horizontal') {
    return leftDif > rightDif ? 'left' : 'right'
  }

  const topDif = targetRect.top
  const bottomDif = window.innerHeight - targetRect.bottom

  if (prefix === 'vertical' || leftDif === rightDif) {
    return topDif > bottomDif ? 'top' : 'bottom'
  }

  const maxDif = Math.max(leftDif, rightDif, topDif, bottomDif)

  if (maxDif === bottomDif || topDif < 0) {
    return 'bottom'
  }

  if (maxDif === topDif || bottomDif < 0) {
    return 'top'
  }

  if (maxDif === leftDif) {
    return 'left'
  }

  if (maxDif === rightDif) {
    return 'right'
  }

  return 'bottom'
}

export const getPopoverTarget = (target: PopoverTarget, content: Content): DomElement | undefined => {
  if (target instanceof Ref) {
    return target.value
  }

  if (target === 'parent') {
    const parent = getParentElement(content)

    if (parent instanceof DocumentFragment) return undefined

    return parent
  }

  if (target === 'before') {
    return getPrevDomElement(content)
  }

  if (target === 'after') {
    return getNextDomElement(content)
  }
}

export function usePopoverHidden (opened: ObservableProp<boolean>, showDelay: ObservableProp<number> | undefined) {
  const hidden = new RDSlot(function popoverHidden () { return true })

  new RDSlot(function popoverBindHidden () {
    if (use(opened)) {
      if (showDelay) {
        const delay = unwatch(() => use(showDelay))

        const timer = setTimeout(() => {
          hidden.set(false)
        }, delay)

        useClear(() => {
          clearTimeout(timer)
        })
      } else {
        hidden.set(false)
      }
    } else if (!hidden.raw) {
      const timer = setTimeout(() => {
        hidden.set(true)
      }, Number(import.meta.env?.RD_UI_POPOVER_HIDE_DELAY || 300))

      useClear(() => {
        clearTimeout(timer)
      })
    }
  }).on()

  return hidden
}

export const popoverAdapterContext = new Context<Ref<PopoverAdapter | undefined> | undefined>(undefined)
