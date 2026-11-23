import { classes } from 'html-classes'
import { Slot, unwatch } from 'rune-hub'

import {
  popoverBaseObserver,
  popoverClickTrigger,
} from './adapters'
import { getPopoverTarget, getStaticPlacement, popoverTriggerContext, usePopoverHidden } from './helpers'
import type {
  PopoverObserver,
  PopoverPlacement,
  PopoverStaticPlacementPostfix,
  PopoverStaticPlacementPrefix, PopoverTarget, PopoverTrigger,
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
  Ref,
  SystemSlot,
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
  /** Placement relative to the target; dynamic values pick the side with free space. */
  placement?: ObservableProp<PopoverPlacement>
  /** Event on the trigger target that opens and closes the popover. */
  trigger?: PopoverTrigger<any>
  /** Element to position the popover near; defaults to the parent element. */
  target?: PopoverTarget
  /** Element whose events control the popover; defaults to the parent element. */
  triggerTarget?: PopoverTarget
  /** Controlled open state; when omitted, the popover keeps its own state. */
  opened?: ObservableProp<boolean>
  /** Disables pointer events on the card, so hovering it does not keep the popover open. */
  noninteractive?: ObservableProp<boolean>
  /**
   * Delay before the popover becomes visible, in milliseconds.
   * @experimental Can be removed in the future.
   * */
  delay?: ObservableProp<number>
  observer?: PopoverObserver
  /** Called when the open state changes. */
  onChangeOpened?: (opened: boolean) => void
}>

/**
 * Card that appears next to a target element.
 * Renders through `<Portal>`, so it is not clipped by the parent layout, and supports
 * static or automatic placement, click, hover and focus triggers, and controlled state.
 */
export function PopoverComponent<S extends PopoverStyles = PopoverStyles> ({
  ref = new Ref<HTMLDivElement>(),
  placement = 'auto-auto',
  trigger = popoverClickTrigger,
  target = 'parent',
  triggerTarget = target,
  opened = new Slot(() => false),
  noninteractive,
  observer = popoverBaseObserver,
  delay,
  onChangeOpened,
  children,
  style,
  ...props
}: PopoverProps<S>) {
  const context = Context.current
  const styles = useStyles(popoverStyles, props.class)
  const setOpened = getSlotEvent(opened, onChangeOpened)
  const content = new Content()

  const hidden = usePopoverHidden(opened, delay)
  const targetRect = new SystemSlot<DOMRect | undefined>(function popoverTargetRect () {})
  const prefix = new SystemSlot<PopoverStaticPlacementPrefix>(function popoverPrefix () { return 'bottom' })
  const postfix = new SystemSlot<PopoverStaticPlacementPostfix>(function popoverPostfix () { return 'center' })
  const childrenContext = new Ref()
  const clickParentHandler = popoverTriggerContext.get()

  const root = () => classes([
    styles.root,
    styles[prefix.value],
    styles[postfix.value],
    !use(opened) && styles.hidden,
    use(noninteractive) && styles.preventHover,
  ])

  const open = () => setOpened?.(true)
  const close = () => setOpened?.(false)

  useEffect(() => {
    const element = getPopoverTarget(triggerTarget, content)

    if (element) {
      childrenContext.value = trigger({
        card: ref,
        close,
        open,
        hidden,
        opened,
        target: element,
        context: clickParentHandler?.value,
      })
    }
  })

  useEffect(() => {
    const element = getPopoverTarget(target, content)

    if (!element) return

    const update = () => {
      targetRect.set(element.getBoundingClientRect())

      const [pre, post] = getStaticPlacement(unwatch(() => use(placement)), element)

      prefix.set(pre)
      postfix.set(post)
    }

    new Slot(function popoverScrollListenerEffect () {
      if (use(opened)) {
        observer({
          target: element,
          close,
          update,
        })

        update()
      }
    }).on()
  })

  new Slot(function popoverRenderEffect () {
    if (!hidden.value) {
      Context.use(() => {
        rundom(
          <Portal>
            <Card
              interact='none'
              {...props}
              ref={ref}
              style={{
                '--rd-popover-left': () => `${targetRect.value?.left ?? 0}px`,
                '--rd-popover-top': () => `${targetRect.value?.top ?? 0}px`,
                '--rd-popover-width': () => `${targetRect.value?.width ?? 0}px`,
                '--rd-popover-height': () => `${targetRect.value?.height ?? 0}px`,
                ...style,
              }}
              class={{ ...styles, root }}
            >
              <Context.Provider for={popoverTriggerContext} set={childrenContext}>
                {children}
              </Context.Provider>
            </Card>
          </Portal>,
        )
      }, context)
    }
  }).on()

  return triggerTarget instanceof Ref && target instanceof Ref ? undefined : content
}

export const Popover = import.meta.env?.RD_UI_POPOVER
  ? import.meta.require?.(import.meta.env.RD_UI_POPOVER).Popover as typeof PopoverComponent
  : PopoverComponent
