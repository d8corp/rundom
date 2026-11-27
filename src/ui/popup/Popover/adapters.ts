import type { Fn } from 'rune-hub'
import { Slot } from 'rune-hub'

import { getOverflowParents } from './helpers'
import type { PopoverAdapter } from './types'

import { useClear } from '../../../hooks'
import type { DomElement } from '../../../types'
import { RDSlot } from '../../../utils'

export const popoverClickAdapter: PopoverAdapter = (params) => {
  const {
    trigger,
    target,
    card,
    open,
    close,
    hidden,
    update,
    setRect,
    context,
  } = params

  if (!trigger) return

  let stopBodyClose = false

  context?.(params)

  new Slot(() => {
    if (hidden.value) {
      const triggerClickListener = () => {
        stopBodyClose = true
        open()
      }

      trigger.addEventListener('click', triggerClickListener)
      useClear(() => trigger.removeEventListener('click', triggerClickListener))
    } else {
      const cardElement = card.value!

      const bodyClickListener = () => {
        if (!stopBodyClose) close()
        stopBodyClose = false
      }

      const cardClickListener = () => {
        stopBodyClose = true
      }

      document.body.addEventListener('click', bodyClickListener)
      cardElement.addEventListener('click', cardClickListener)

      if (target) {
        usePopoverBaseObserver(target, close, () => {
          setRect?.(target.getBoundingClientRect())
          update()
        })
      }

      useClear(() => {
        document.body.removeEventListener('click', bodyClickListener)
        cardElement.removeEventListener('click', cardClickListener)
      })
    }
  }).on()

  return (childParams) => {
    context?.(childParams)

    new Slot(() => {
      if (!childParams.hidden.value) {
        const cardElement = childParams.card.value!

        const cardClickListener = () => {
          stopBodyClose = true
        }

        cardElement.addEventListener('click', cardClickListener)

        useClear(() => cardElement.removeEventListener('click', cardClickListener))
      }
    }).on()
  }
}

export const popoverClickOpenAdapter: PopoverAdapter = (params) => {
  const {
    trigger,
    target,
    card,
    open,
    close,
    hidden,
    update,
    setRect,
    context,
  } = params

  if (!trigger) return

  let stopBodyClose = false

  context?.(params)

  const triggerClickListener = () => {
    stopBodyClose = true

    if (hidden.raw) {
      open()
    }
  }

  trigger.addEventListener('click', triggerClickListener)
  useClear(() => trigger.removeEventListener('click', triggerClickListener))

  new Slot(() => {
    if (!hidden.value) {
      const cardElement = card.value!

      const bodyClickListener = () => {
        if (!stopBodyClose) close()
        stopBodyClose = false
      }

      const cardClickListener = () => {
        stopBodyClose = true
      }

      document.body.addEventListener('click', bodyClickListener)
      cardElement.addEventListener('click', cardClickListener)

      if (target) {
        usePopoverBaseObserver(target, close, () => {
          if (setRect) {
            setRect(target.getBoundingClientRect())
          }

          update()
        })
      }

      useClear(() => {
        document.body.removeEventListener('click', bodyClickListener)
        cardElement.removeEventListener('click', cardClickListener)
      })
    }
  }).on()

  return (childParams) => {
    context?.(childParams)

    new Slot(() => {
      if (!childParams.hidden.value) {
        const cardElement = childParams.card.value!

        const cardClickListener = () => {
          stopBodyClose = true
        }

        cardElement.addEventListener('click', cardClickListener)

        useClear(() => cardElement.removeEventListener('click', cardClickListener))
      }
    }).on()
  }
}

export const popoverHoverAdapter: PopoverAdapter = (params) => {
  const {
    trigger,
    target,
    card,
    open,
    close,
    hidden,
    update,
    setRect,
    context,
  } = params

  if (!trigger) return

  context?.(params)

  new Slot(() => {
    if (!hidden.value) {
      const cardElement = card.value!

      cardElement.addEventListener('mouseenter', open)
      cardElement.addEventListener('mouseleave', close)

      if (target) {
        usePopoverBaseObserver(target, close, () => {
          if (setRect) {
            setRect(target.getBoundingClientRect())
          }

          update()
        })
      }

      useClear(() => {
        cardElement.removeEventListener('mouseenter', open)
        cardElement.removeEventListener('mouseleave', close)
      })
    }
  }).on()

  trigger.addEventListener('mouseenter', open)
  trigger.addEventListener('mouseleave', close)

  useClear(() => {
    trigger.removeEventListener('mouseenter', open)
    trigger.removeEventListener('mouseleave', close)
  })

  return (childParams) => {
    context?.(childParams)

    new Slot(() => {
      if (!childParams.hidden.value) {
        const cardElement = childParams.card.value!

        cardElement.addEventListener('mouseenter', open)
        cardElement.addEventListener('mouseleave', close)
        cardElement.addEventListener('mouseleave', childParams.close)

        useClear(() => {
          cardElement.removeEventListener('mouseenter', open)
          cardElement.removeEventListener('mouseleave', close)
          cardElement.removeEventListener('mouseleave', childParams.close)
        })
      }
    }).on()
  }
}

/** @experimental */
export const popoverFocusAdapter: PopoverAdapter = ({
  trigger,
  open,
  close,
  setRect,
  target,
  update,
}) => {
  if (!trigger || !target) return

  const updateOpen = () => {
    setRect?.(target.getBoundingClientRect())
    update()
    open()
  }

  trigger.addEventListener('focus', updateOpen)
  trigger.addEventListener('blur', close)

  useClear(() => {
    trigger.removeEventListener('focus', updateOpen)
    trigger.removeEventListener('blur', close)
  })
}

/** @experimental */
export const popoverContextMenuAdapter: PopoverAdapter = ({
  trigger,
  open,
  close,
  hidden,
  update,
  setRect,
}) => {
  if (!trigger) return

  const listener = (e: Event) => {
    const event = e as PointerEvent
    e.preventDefault()
    setRect?.(new DOMRect(event.clientX, event.clientY))
    update()
    open()
  }

  new RDSlot(function popoverContextMenuAdapter () {
    if (hidden.value) {
      trigger.addEventListener('contextmenu', listener)

      useClear(() => {
        trigger.removeEventListener('contextmenu', listener)
      })
    } else {
      usePopoverScrollWindowObserver(close)
      document.body.addEventListener('click', close, true)

      useClear(() => {
        document.body.removeEventListener('click', close, true)
      })
    }
  }).on()
}

/** @experimental */
export const popoverSelectionAdapter: PopoverAdapter = ({
  trigger,
  hidden,
  update,
  open,
  close,
  setRect,
}) => {
  if (!trigger) return

  const customUpdate = () => {
    const selectionInstance = window.getSelection()

    if (!selectionInstance || !selectionInstance.rangeCount) return

    const range = selectionInstance.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    if (rect.width && rect.height) {
      setRect?.(range.getBoundingClientRect())
      update()
      open()
    }
  }

  const handleMouseUp = () => {
    setTimeout(customUpdate)
  }

  trigger.addEventListener('mouseup', handleMouseUp)

  useClear(() => {
    trigger.removeEventListener('mouseup', handleMouseUp)
  })

  new RDSlot(function popoverSelectionAdapter () {
    if (!hidden.value) {
      usePopoverScrollWindowObserver(customUpdate)
      document.body.addEventListener('mousedown', close)

      useClear(() => {
        document.body.removeEventListener('mousedown', close)
      })
    }
  }).on()
}

/** @experimental */
export function usePopoverIntersectionObserver (target: DomElement, close: Fn) {
  let initIntersection = false

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (!initIntersection) {
      initIntersection = true

      return
    }

    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        close()
      }
    })
  }, { threshold: 0 })

  intersectionObserver.observe(target)

  useClear(() => intersectionObserver.disconnect())
}

export function usePopoverResizeTargetObserver (target: DomElement, action: Fn) {
  let initResize = false

  const resizeObserver = new ResizeObserver(() => {
    if (!initResize) {
      initResize = true

      return
    }

    action()
  })

  resizeObserver.observe(target)

  useClear(() => resizeObserver.disconnect())
}

export function usePopoverResizeWindowObserver (action: Fn) {
  window.addEventListener('resize', action)

  useClear(() => window.removeEventListener('resize', action))
}

export function usePopoverScrollWindowObserver (action: Fn) {
  window.addEventListener('scroll', action)

  useClear(() => window.removeEventListener('scroll', action))
}

export function usePopoverScrollParentsObserver (target: DomElement, action: Fn) {
  const parents = getOverflowParents(target)

  parents.forEach(parent => {
    parent.addEventListener('scroll', action)
  })

  useClear(() => {
    parents.forEach(parent => {
      parent.removeEventListener('scroll', action)
    })
  })
}

export function usePopoverMutationObserver (target: DomElement, action: Fn) {
  let mutationScheduled = false
  let init = false

  const mutationObserver = new MutationObserver(() => {
    if (!init) {
      init = true

      return
    }

    if (mutationScheduled) return
    mutationScheduled = true

    requestAnimationFrame(() => {
      mutationScheduled = false
      action()
    })
  })

  // @ts-expect-error Support offsetParent
  const mutationScope = (target.offsetParent as HTMLElement | null) ?? document.body

  mutationObserver.observe(mutationScope, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'hidden'],
  })

  useClear(() => mutationObserver.disconnect())
}

export function usePopoverBaseObserver (target: DomElement, close: Fn, update: Fn) {
  usePopoverResizeTargetObserver(target, update)
  usePopoverResizeWindowObserver(update)
  usePopoverScrollWindowObserver(close)
  usePopoverScrollParentsObserver(target, close)
  usePopoverMutationObserver(target, update)

  update()
}
