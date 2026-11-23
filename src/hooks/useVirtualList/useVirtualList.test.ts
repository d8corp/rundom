import { useVirtualList } from './useVirtualList'

import { Ref } from '../../utils'

class MockResizeObserver {
  static instances: MockResizeObserver[] = []
  callback: ResizeObserverCallback
  targets: Element[] = []

  constructor (callback: ResizeObserverCallback) {
    this.callback = callback
    MockResizeObserver.instances.push(this)
  }

  observe (target: Element) {
    this.targets.push(target)
    this.callback([{ target } as ResizeObserverEntry], this as any)
  }

  disconnect () {
    this.targets = []
  }
}

const flush = async () => {
  for (let i = 0; i < 10; i++) {
    await Promise.resolve()
  }
}

describe('useVirtualList', () => {
  beforeEach(() => {
    ;(globalThis as any).ResizeObserver = MockResizeObserver
  })

  it('updates on scroll', async () => {
    const el = document.createElement('div')

    Object.defineProperty(el, 'clientHeight', { value: 100 })
    const ref = new Ref<HTMLElement>(el)
    const list = Array.from({ length: 20 }, (_, i) => i)

    const { virtualList, scroll, height, heightCount, scrollIndex, offsetTop, offsetBottom } = useVirtualList({
      list,
      itemHeight: 20,
      gap: 0,
      scrollbar: ref,
    })

    await flush()

    expect(height.raw).toBe(100)
    expect(heightCount.raw).toBe(6)
    expect(scrollIndex.raw).toBe(0)
    expect(virtualList.raw).toEqual([0, 1, 2, 3, 4, 5])
    expect(offsetTop.raw).toBe('0px')
    expect(offsetBottom.raw).toBe('280px')

    el.scrollTop = 60
    el.dispatchEvent(new Event('scroll'))

    await flush()

    expect(scroll.raw).toBe(60)
    expect(scrollIndex.raw).toBe(3)
    expect(virtualList.raw).toEqual([3, 4, 5, 6, 7, 8])
    expect(offsetTop.raw).toBe('60px')
    expect(offsetBottom.raw).toBe('220px')
  })

  it('initial scroll position is ignored', async () => {
    const el = document.createElement('div')

    Object.defineProperty(el, 'clientHeight', { value: 100 })
    Object.defineProperty(el, 'scrollTop', { value: 60, writable: true })
    const ref = new Ref<HTMLElement>(el)
    const list = Array.from({ length: 20 }, (_, i) => i)
    const { virtualList, scrollIndex } = useVirtualList({ list, itemHeight: 20, scrollbar: ref })

    await flush()

    expect(scrollIndex.raw).toBe(0)
    expect(virtualList.raw).toEqual([0, 1, 2, 3, 4, 5])
  })
})
