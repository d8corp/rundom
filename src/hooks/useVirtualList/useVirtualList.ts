import { useEffect } from '../useEffect'

import type { ObservableProp } from '../../types'
import { Ref, SystemSlot, use } from '../../utils'

export const documentElementRef = new Ref(document.documentElement)

export interface VirtualListParams<T = any> {
  itemHeight: ObservableProp<number>
  list: ObservableProp<T[]>
  gap?: ObservableProp<number>
  scrollbar?: Ref<HTMLElement>
}

export function useVirtualList<T> ({ scrollbar = documentElementRef, itemHeight, gap = 0, list }: VirtualListParams<T>) {
  const virtualItemSize = () => use(itemHeight) + use(gap)
  const virtualScroll = () => 0
  const virtualHeight = () => 0
  const virtualHeightCount = () => Math.ceil(height.value / itemSize.value) + 1
  const virtualScrollIndex = () => Math.max(0, Math.min((scroll.value / itemSize.value) | 0, use(list).length - heightCount.value))
  const virtualEnd = () => Math.min(use(list).length, scrollIndex.value + heightCount.value)
  const virtualOffsetTop = () => `${scrollIndex.value * itemSize.value}px`
  const virtualOffsetBottom = () => `${(use(list).length - end.value) * itemSize.value}px`

  const itemSize = new SystemSlot(virtualItemSize)
  const scroll = new SystemSlot(virtualScroll)
  const height = new SystemSlot(virtualHeight)
  const heightCount = new SystemSlot(virtualHeightCount)
  const scrollIndex = new SystemSlot(virtualScrollIndex)
  const end = new SystemSlot(virtualEnd)
  const offsetTop = new SystemSlot(virtualOffsetTop)
  const offsetBottom = new SystemSlot(virtualOffsetBottom)

  const virtualList = new SystemSlot(function virtualList () {
    return use(list).slice(scrollIndex.value, end.value)
  })

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      height.set(entry.target.clientHeight)
    }
  })

  useEffect(() => {
    const element = scrollbar.value

    if (!element) return

    const listener = () => {
      scroll.set(element.scrollTop)
    }

    element.addEventListener('scroll', listener)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      element.removeEventListener('scroll', listener)
    }
  })

  return {
    scroll,
    height,
    heightCount,
    scrollIndex,
    end,
    offsetTop,
    offsetBottom,
    virtualList,
    resizeObserver,
  }
}
