import { Slot } from 'rune-hub'

import { popoverClickOpenAdapter } from './adapters'
import { Popover } from './Popover'

import { rundom } from '../../../rundom'

const flush = async (time?: number) => {
  await new Promise(resolve => setTimeout(resolve, time))
}

const rect = {
  left: 10,
  top: 20,
  width: 30,
  height: 40,
} as DOMRect

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Popover', () => {
  it('opens and closes on trigger click', async () => {
    const changes: boolean[] = []

    rundom(
      <button>
        Trigger
        <Popover onChangeOpened={value => changes.push(value)}>Content</Popover>
      </button>,
    )

    const trigger = document.querySelector('button')!

    await flush()
    trigger.click()

    expect(changes).toEqual([true])

    trigger.click()

    expect(changes).toEqual([true, false])
  })

  it('updates position from the controlled state', async () => {
    const isOpen = new Slot(() => false)

    rundom(
      <button>
        Trigger
        <Popover opened={isOpen}>Content</Popover>
      </button>,
    )

    await flush()

    const trigger = document.querySelector('button')!

    trigger.getBoundingClientRect = () => rect

    isOpen.value = true

    const popover = document.body.children[1] as HTMLElement

    expect(popover.style.getPropertyValue('--rd-popover-left')).toBe('10px')
    expect(popover.style.getPropertyValue('--rd-popover-top')).toBe('20px')
    expect(popover.style.getPropertyValue('--rd-popover-width')).toBe('30px')
    expect(popover.style.getPropertyValue('--rd-popover-height')).toBe('40px')
  })

  it('the body receives close by click', async () => {
    const changes: boolean[] = []

    rundom(
      <button>
        Trigger
        <Popover onChangeOpened={value => changes.push(value)}>Content</Popover>
      </button>,
    )

    await flush()

    const trigger = document.querySelector('button')!

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await flush()

    expect(changes).toEqual([true])

    document.body.dispatchEvent(new MouseEvent('click'))

    await flush()

    expect(changes).toEqual([true, false])
  })

  it('keeps the click guard until the body receives the same click', async () => {
    const changes: boolean[] = []

    rundom(
      <button>
        Trigger
        <Popover adapter={popoverClickOpenAdapter} onChangeOpened={value => changes.push(value)}>Content</Popover>
      </button>,
    )

    await flush()

    const trigger = document.querySelector('button')!

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await flush()

    expect(changes).toEqual([true])

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await flush()

    expect(changes).toEqual([true])

    document.body.dispatchEvent(new MouseEvent('click'))

    await flush()

    expect(changes).toEqual([true, false])
  })

  it('keeps the click guard after clicking the card', async () => {
    const changes: boolean[] = []

    rundom(
      <button>
        Trigger
        <Popover onChangeOpened={value => changes.push(value)}>Content</Popover>
      </button>,
    )

    await flush()

    const trigger = document.querySelector('button')!

    trigger.click()

    await flush()

    const card = document.body.children[1] as HTMLElement

    card.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await flush()

    expect(changes).toEqual([true])

    await flush()

    document.body.dispatchEvent(new MouseEvent('click'))

    await flush()

    expect(changes).toEqual([true, false])
  })
})
