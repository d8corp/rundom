import { Slot } from 'rune-hub'

import { popoverClickOpenTrigger } from './adapters'
import { Popover } from './Popover'

import { rundom } from '../../../rundom'

const flush = async () => {
  for (let i = 0; i < 10; i++) await Promise.resolve()
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

    const clone = document.body.children[1] as HTMLElement

    expect(clone.style.left).toBe('10px')
    expect(clone.style.top).toBe('20px')
    expect(clone.style.width).toBe('30px')
    expect(clone.style.height).toBe('40px')
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

    trigger.dispatchEvent(new MouseEvent('click'))

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
        <Popover trigger={popoverClickOpenTrigger} onChangeOpened={value => changes.push(value)}>Content</Popover>
      </button>,
    )

    await flush()

    const trigger = document.querySelector('button')!

    trigger.dispatchEvent(new MouseEvent('click'))

    await flush()

    expect(changes).toEqual([true])

    trigger.dispatchEvent(new MouseEvent('click'))

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

    const card = (document.body.children[1] as HTMLElement).firstElementChild as HTMLElement
    card.dispatchEvent(new MouseEvent('click'))
    await flush()

    expect(changes).toEqual([true])

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flush()

    expect(changes).toEqual([true, false])
  })
})
