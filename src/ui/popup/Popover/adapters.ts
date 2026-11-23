import type { Fn } from 'rune-hub'
import { Slot } from 'rune-hub'

import { getOverflowParents } from './helpers'
import type {
  PopoverAction, PopoverObserver,
  PopoverTrigger,
} from './types'

import { useClear } from '../../../hooks'
import { use } from '../../../utils'

export const popoverClickTrigger: PopoverTrigger<Fn> = ({
  target,
  card,
  open,
  close,
  hidden,
  context,
}) => {
  const handleCardClick = () => {
    open()
    context?.()
  }

  new Slot(() => {
    if (hidden.value) {
      target.addEventListener('click', open)
      useClear(() => target.removeEventListener('click', open))
    } else {
      const cardElement = card.value!

      document.body.addEventListener('click', close, true)
      cardElement.addEventListener('click', handleCardClick)

      useClear(() => {
        document.body.removeEventListener('click', close, true)
        cardElement.removeEventListener('click', handleCardClick)
      })
    }
  }).on()

  return () => {
    open()
    context?.()
  }
}

export const popoverClickOpenTrigger: PopoverTrigger<Fn> = ({
  target,
  card,
  open,
  close,
  hidden,
  context,
}) => {
  const handleCardClick = () => {
    open()
    context?.()
  }

  target.addEventListener('click', open)
  useClear(() => target.removeEventListener('click', open))

  new Slot(() => {
    if (!hidden.value) {
      const cardElement = card.value!

      document.body.addEventListener('click', close, true)
      cardElement.addEventListener('click', handleCardClick)

      useClear(() => {
        document.body.removeEventListener('click', close, true)
        cardElement.removeEventListener('click', handleCardClick)
      })
    }
  }).on()

  return () => {
    open()
    context?.()
  }
}

interface PopoverHoverTriggerContext {
  open: Fn
  close: Fn
}

export const popoverHoverTrigger: PopoverTrigger<PopoverHoverTriggerContext> = ({
  target,
  card,
  open,
  close,
  hidden,
  context,
}) => {
  const contextOpen = () => {
    open()
    context?.open()
  }

  const contextClose = () => {
    close()
    context?.close()
  }

  new Slot(() => {
    if (!use(hidden)) {
      const cardElement = card.value!

      cardElement.addEventListener('mouseenter', contextOpen)
      cardElement.addEventListener('mouseleave', contextClose)

      useClear(() => {
        cardElement.removeEventListener('mouseenter', open)
        cardElement.removeEventListener('mouseleave', close)
      })
    }
  }).on()

  target.addEventListener('mouseenter', open)
  target.addEventListener('mouseleave', close)

  useClear(() => {
    target.removeEventListener('mouseenter', open)
    target.removeEventListener('mouseleave', close)
  })

  return {
    open: contextOpen,
    close: contextClose,
  }
}

export const popoverFocusTrigger: PopoverTrigger = ({
  target,
  open,
  close,
}) => {
  target.addEventListener('focus', open)
  target.addEventListener('blur', close)

  useClear(() => {
    target.removeEventListener('focus', open)
    target.removeEventListener('blur', close)
  })
}

export function popoverIntersectionObserver (): PopoverObserver {
  return (params) => {
    let initIntersection = false

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (!initIntersection) {
        initIntersection = true

        return
      }

      entries.forEach(entry => {
        // @ts-expect-error New API IntersectionObserver V2
        if (entry.isVisible === false) {
          params.close()
        }
      })
      // @ts-expect-error New API IntersectionObserver V2
    }, { trackVisibility: true, delay: 100 })

    intersectionObserver.observe(params.target)

    useClear(() => intersectionObserver.disconnect())
  }
}

export function popoverResizeTargetObserver (action: PopoverAction): PopoverObserver {
  return (params) => {
    let initResize = false

    const resizeObserver = new ResizeObserver(() => {
      if (!initResize) {
        initResize = true

        return
      }

      params[action]()
    })

    resizeObserver.observe(params.target)

    useClear(() => resizeObserver.disconnect())
  }
}

export function popoverResizeWindowObserver (action: PopoverAction): PopoverObserver {
  return (params) => {
    const listener = () => params[action]()
    window.addEventListener('resize', listener)

    useClear(() => window.removeEventListener('resize', listener))
  }
}

export function popoverScrollWindowObserver (action: PopoverAction): PopoverObserver {
  return (params) => {
    const listener = () => params[action]()
    window.addEventListener('scroll', listener)

    useClear(() => window.removeEventListener('scroll', listener))
  }
}

export function popoverScrollParentsObserver (action: PopoverAction): PopoverObserver {
  return (params) => {
    const parents = getOverflowParents(params.target)
    const listener = () => params[action]()

    parents.forEach(parent => {
      parent.addEventListener('scroll', listener)
    })

    useClear(() => {
      parents.forEach(parent => {
        parent.removeEventListener('scroll', listener)
      })
    })
  }
}

export function popoverMutationObserver (action: PopoverAction): PopoverObserver {
  return (params) => {
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
        params[action]()
      })
    })

    // @ts-expect-error Support offsetParent
    const mutationScope = (params.target.offsetParent as HTMLElement | null) ?? document.body

    mutationObserver.observe(mutationScope, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'hidden'],
    })

    useClear(() => mutationObserver.disconnect())
  }
}

export const popoverBaseObserver: PopoverObserver = (params) => {
  popoverIntersectionObserver()(params)
  popoverScrollWindowObserver('close')(params)
  popoverScrollParentsObserver('close')(params)
  popoverResizeTargetObserver('update')(params)
  popoverResizeWindowObserver('update')(params)
  popoverMutationObserver('update')(params)
}
