import { classes } from 'html-classes'
import { unwatch } from 'rune-hub'

import {
  popoverClickAdapter,
} from './adapters'
import { getPopoverTarget, getStaticPlacement, popoverAdapterContext, usePopoverHidden } from './helpers'
import type {
  PopoverAdapter,
  PopoverPlacement,
  PopoverStaticPlacementPostfix,
  PopoverStaticPlacementPrefix, PopoverTarget,
} from './types'

import { Portal } from '../../../components'
import { useEffect, useStyles } from '../../../hooks'
import { rundom } from '../../../rundom'
import type { Merge, ObservableProp } from '../../../types'
import {
  addUiCSS,
  Content,
  Context,
  getSlotEvent,
  RDSlot,
  Ref,
  use,
} from '../../../utils'
import type { CardProps, CardStyles } from '../../layout'
import { Card } from '../../layout'

if (import.meta.env?.RD_THEME_POPOVER) {
  addUiCSS(import.meta.env.RD_THEME_POPOVER, 'popover')
}

export const popoverStyles = {
  root: import.meta.env?.RD_THEME_POPOVER__ROOT,
  hidden: import.meta.env?.RD_THEME_POPOVER__HIDDEN,
  preventHover: import.meta.env?.RD_THEME_POPOVER__PREVENT_HOVER,
  top: import.meta.env?.RD_THEME_POPOVER__TOP,
  bottom: import.meta.env?.RD_THEME_POPOVER__BOTTOM,
  left: import.meta.env?.RD_THEME_POPOVER__LEFT,
  right: import.meta.env?.RD_THEME_POPOVER__RIGHT,
  start: import.meta.env?.RD_THEME_POPOVER__START,
  center: import.meta.env?.RD_THEME_POPOVER__CENTER,
  end: import.meta.env?.RD_THEME_POPOVER__END,
}

export type PopoverStyles = typeof popoverStyles & CardStyles

/** Props for `<Popover>`: card props plus positioning and trigger behavior. */
export type PopoverProps<S extends PopoverStyles = PopoverStyles> = Merge<CardProps<'div', S>, {
  /** Adapter that connects trigger events and keeps the card in sync. */
  adapter?: PopoverAdapter
  /**
   * Delay before the popover becomes visible, in milliseconds.
   * @experimental Can be removed in the future.
   * */
  delay?: ObservableProp<number>
  /** Disables pointer events on the card, so hovering it does not keep the popover open. */
  noninteractive?: ObservableProp<boolean>
  /** Controlled open state; when omitted, the popover keeps its own state. */
  opened?: ObservableProp<boolean>
  /** Placement relative to the target; dynamic values pick the side with free space. */
  placement?: ObservableProp<PopoverPlacement>
  /** Target rectangle used for positioning. */
  rect?: ObservableProp<DOMRect>
  /** Element to position the popover near; defaults to the parent element. */
  target?: PopoverTarget
  /** Element whose events control the popover; defaults to the parent element. */
  trigger?: PopoverTarget
  /** Called when the open state changes. */
  onChangeOpened?: (opened: boolean) => void
  onChangeRect?: (rect: DOMRect) => void
}>

/**
 * Card that appears next to a target element.
 * Renders through `<Portal>`, so it is not clipped by the parent layout, and supports
 * static or automatic placement, click, hover and focus triggers, and controlled state.
 */
export function PopoverComponent<S extends PopoverStyles = PopoverStyles> ({
  ref = new Ref<HTMLDivElement>(),
  placement = 'auto-auto',
  adapter = popoverClickAdapter,
  target = 'parent',
  trigger = target,
  opened = new RDSlot(() => false),
  rect = new RDSlot<DOMRect>(function popoverTargetRect () { return new DOMRect() }),
  noninteractive,
  delay,
  onChangeOpened,
  onChangeRect,
  children,
  style,
  ...props
}: PopoverProps<S>) {
  const context = Context.current
  const styles = useStyles(popoverStyles, props.class)
  const setOpened = getSlotEvent(opened, onChangeOpened)
  const setRect = getSlotEvent(rect, onChangeRect)
  const content = new Content()

  const hidden = usePopoverHidden(opened, delay)
  const prefix = new RDSlot<PopoverStaticPlacementPrefix>(function popoverPrefix () { return 'bottom' })
  const postfix = new RDSlot<PopoverStaticPlacementPostfix>(function popoverPostfix () { return 'center' })
  const adapterContext = new Ref<PopoverAdapter | undefined>()
  const parentAdapter = popoverAdapterContext.get()

  const root = () => classes([
    styles.root,
    styles[prefix.value],
    styles[postfix.value],
    !use(opened) && styles.hidden,
    use(noninteractive) && styles.preventHover,
  ])

  const open = () => setOpened?.(true)
  const close = () => setOpened?.(false)

  const update = () => {
    const [pre, post] = unwatch(() => getStaticPlacement(use(placement), use(rect)))

    prefix.set(pre)
    postfix.set(post)
  }

  useEffect(() => {
    const triggerElement = getPopoverTarget(trigger, content)
    const targetElement = getPopoverTarget(target, content)

    const childAdapter = adapter({
      card: ref,
      close,
      open,
      hidden,
      opened,
      rect,
      setRect,
      update,
      target: targetElement,
      trigger: triggerElement,
      context: parentAdapter?.value,
    })

    if (childAdapter) {
      adapterContext.value = childAdapter
    }
  })

  new RDSlot(function popoverRenderEffect () {
    if (!hidden.value) {
      Context.use(() => {
        rundom(
          <Portal>
            <Card
              interact='none'
              {...props}
              ref={ref}
              style={{
                '--rd-popover-left': () => `${use(rect)?.left ?? 0}px`,
                '--rd-popover-top': () => `${use(rect)?.top ?? 0}px`,
                '--rd-popover-width': () => `${use(rect)?.width ?? 0}px`,
                '--rd-popover-height': () => `${use(rect)?.height ?? 0}px`,
                ...style,
              }}
              class={{ ...styles, root }}
            >
              <Context.Provider for={popoverAdapterContext} set={adapterContext}>
                {children}
              </Context.Provider>
            </Card>
          </Portal>,
        )
      }, context)
    }
  }).on()

  return trigger instanceof Ref && target instanceof Ref ? undefined : content
}

export const Popover = import.meta.env?.RD_UI_POPOVER
  ? import.meta.require?.(import.meta.env.RD_UI_POPOVER).Popover as typeof PopoverComponent
  : PopoverComponent
