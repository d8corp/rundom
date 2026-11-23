import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import type { PopoverAdapter } from '../../../../ui'
import {
  Body,
  Button,
  Card, CardTitle, Description,
  Flex, HtmlIcon,
  Popover, popoverClickOpenAdapter,
  popoverContextMenuAdapter, popoverFocusAdapter, popoverHoverAdapter, popoverSelectionAdapter, Preview,
  Text,
  Toggle, usePopoverScrollWindowObserver,
} from '../../../../ui'
import { Ref } from '../../../../utils'
import { MarkdownTemplate } from '../../../templates'
import description from './PopoverPage.md'

const staticPlacements = [
  'top-start',
  'top-center',
  'top-end',
  'left-start',
  'left-center',
  'left-end',
  'right-start',
  'right-center',
  'right-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const

const dynamicPlacements = [
  'auto-auto',
  'vertical-auto',
  'horizontal-auto',
] as const

const controlledOpen = new Slot(() => false)
const controlledAdapterOpen = new Slot(() => false)
const noninteractive = new Slot(() => false)
const resizeWidth = new Slot(() => 250)
const targetRect = new Slot(() => new DOMRect())

const rectSize = new Slot(() => {
  const rect = targetRect.value

  return `${Math.round(rect.width)} × ${Math.round(rect.height)}`
})

const targetRef = new Ref<HTMLButtonElement>()
const triggerRef = new Ref<HTMLButtonElement>()

const scrollAdapter: PopoverAdapter = ({ target, setRect, update, hidden }) => {
  if (!target) return

  new Slot(() => {
    if (!hidden.value) {
      const updatePosition = () => {
        setRect?.(target.getBoundingClientRect())
        update()
      }

      usePopoverScrollWindowObserver(updatePosition)
      updatePosition()
    }
  }).on()
}

const setNoninteractive = (value: boolean) => noninteractive.set(value)
const toggleAdapterOpen = () => controlledAdapterOpen.set(!controlledAdapterOpen.raw)

const resize = () => {
  resizeWidth.set(resizeWidth.raw === 250 ? 300 : 250)
}

export default function PopoverPage () {
  const examples: HighlightExamples = {
    basic: (
      <Button>
        Click me
        <Popover padding={8}>
          Popover content
        </Popover>
      </Button>
    ),
    card: (
      <Button>
        Click Me
        <Popover width={260}>
          <Preview>
            <HtmlIcon size={20} />
          </Preview>
          <Body vertical>
            <CardTitle>Popover title</CardTitle>
            <Description>The card surface accepts size, width, padding and gap.</Description>
          </Body>
        </Popover>
      </Button>
    ),
    nested: (
      <Flex wrap gap={12}>
        <Button>
          Click Me
          <Popover vertical padding={10} gap={8}>
            First popover
            <Button>
              Click Me
              <Popover padding={10}>Second popover</Popover>
            </Button>
          </Popover>
        </Button>
        <Button>
          Hover Me
          <Popover vertical adapter={popoverHoverAdapter} padding={10} gap={8}>
            First popover
            <Button>
              Hover Me
              <Popover adapter={popoverHoverAdapter} padding={10}>Second popover</Popover>
            </Button>
          </Popover>
        </Button>
        <Button>
          Click Me
          <Popover vertical padding={10} gap={8}>
            First popover
            <Button>
              Hover Me
              <Popover adapter={popoverHoverAdapter} padding={10}>Second popover</Popover>
            </Button>
          </Popover>
        </Button>
        <Button>
          Hover Me
          <Popover vertical adapter={popoverHoverAdapter} padding={10} gap={8}>
            First popover
            <Button>
              Click Me
              <Popover padding={10}>Second popover</Popover>
            </Button>
          </Popover>
        </Button>
      </Flex>
    ),
    staticPlacement: (
      <Flex wrap justify='center' gap={16} padding={[48, 64]}>
        {staticPlacements.map(placement => (
          <Button>
            {placement}
            <Popover
              height={100}
              width={200}
              align='center'
              justify='center'
              placement={placement}
              padding={8}
            >
              {placement}
            </Popover>
          </Button>
        ))}
      </Flex>
    ),
    dynamicPlacement: (
      <Flex wrap justify='center' gap={16} padding={26}>
        {dynamicPlacements.map(placement => (
          <Button>
            {placement}
            <Popover
              height={100}
              width={200}
              align='center'
              justify='center'
              placement={placement}
              padding={8}
            >
              {placement}
            </Popover>
          </Button>
        ))}
      </Flex>
    ),
    trigger: (
      <Flex gap={8} wrap>
        <Button>
          click
          <Popover padding={8}>Opens on click</Popover>
        </Button>
        <Button>
          click-open
          <Popover adapter={popoverClickOpenAdapter} padding={8}>Stays until an outside click</Popover>
        </Button>
        <Button>
          hover
          <Popover adapter={popoverHoverAdapter} padding={8}>Opens on hover</Popover>
        </Button>
        <Button>
          focus
          <Popover adapter={popoverFocusAdapter} padding={8}>Opens on focus</Popover>
        </Button>
      </Flex>
    ),
    delay: (
      <Button>
        Hover me
        <Popover adapter={popoverHoverAdapter} delay={500} padding={8}>
          Shown after 500 ms
        </Popover>
      </Button>
    ),
    noninteractive: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Hover me
          <Popover adapter={popoverHoverAdapter} noninteractive={noninteractive} padding={8}>
            Non-interactive hint
          </Popover>
        </Button>
        <Flex element='label' gap={8} align='center'>
          <Toggle checked={noninteractive} onChange={setNoninteractive} />
          <Text cursor='pointer'>noninteractive</Text>
        </Flex>
      </Flex>
    ),
    controlled: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Toggle popover
          <Popover placement='vertical-auto' opened={controlledOpen}>
            <Body>
              The parent keeps the open state
            </Body>
          </Popover>
        </Button>
        Open: {() => String(controlledOpen.value)}
      </Flex>
    ),
    adapter: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Target
          <Popover
            width={100}
            placement='vertical-auto'
            adapter={scrollAdapter}
            opened={controlledAdapterOpen}
          >
            <Body>
              The parent keeps the open state
            </Body>
          </Popover>
        </Button>
        <Button onclick={toggleAdapterOpen}>
          Open: {() => String(controlledAdapterOpen.value)}
        </Button>
      </Flex>
    ),
    updateSize: (
      <Card width={resizeWidth}>
        <Body vertical>
          <Button>
            Click Me
            <Popover
              vertical
              placement='vertical-center'
              padding={8}
              gap={8}
            >
              Popover content
              <Button onclick={resize}>
                Resize
              </Button>
            </Popover>
          </Button>
        </Body>
      </Card>
    ),
    rect: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Open popover
          <Popover rect={targetRect} placement='vertical-auto' padding={8}>
            Positioned from the target rectangle
          </Popover>
        </Button>
        Target size: {rectSize}
      </Flex>
    ),
    target: (
      <>
        <Flex>
          <Button ref={targetRef}>
            Open popover
          </Button>
        </Flex>
        <Popover target={targetRef} padding={8}>
          Positioned near the target
        </Popover>
      </>
    ),
    triggerTarget: (
      <Flex justify='space-around' align='center' gap={16} wrap>
        <Button ref={triggerRef}>Trigger element</Button>
        <Card width={180} padding={10}>
          Popover owner
          <Popover trigger={triggerRef} padding={8}>
            Triggered from the button
          </Popover>
        </Card>
      </Flex>
    ),
    contextMenu: (
      <Card height={300} justify='space-around' align='center' gap={16} wrap>
        Right Click on here
        <Popover adapter={popoverContextMenuAdapter} padding={8}>
          Triggered by right click
        </Popover>
      </Card>
    ),
    selectionAdapter: (
      <Card height={300} justify='space-around' align='center' gap={16} wrap>
        Select this text
        <Popover placement='vertical-center' adapter={popoverSelectionAdapter} padding={8}>
          Triggered by selection: {() => String(window.getSelection())}
        </Popover>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
