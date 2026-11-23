import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import {
  Body,
  Button,
  Card, CardTitle, Description,
  Flex, HtmlIcon,
  Popover, popoverBaseObserver, popoverClickOpenTrigger, popoverFocusTrigger, popoverHoverTrigger,
  popoverIntersectionObserver, popoverMutationObserver, type PopoverObserver,
  popoverResizeTargetObserver,
  popoverResizeWindowObserver, popoverScrollParentsObserver, popoverScrollWindowObserver, Preview,
  Text,
  Toggle,
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
const controlledTriggerOpen = new Slot(() => false)
const noninteractive = new Slot(() => false)
const resizeWidth = new Slot(() => 250)
const closeOnResize = new Slot(() => false)
const targetRef = new Ref<HTMLDivElement>()
const triggerRef = new Ref<HTMLButtonElement>()

const setNoninteractive = (value: boolean) => noninteractive.set(value)
const toggleControlledTriggerOpen = () => controlledTriggerOpen.set(!controlledTriggerOpen.raw)

const resize = () => {
  resizeWidth.set(resizeWidth.raw === 250 ? 300 : 250)
}

const updateObserver: PopoverObserver = (params) => {
  popoverIntersectionObserver()(params)
  popoverScrollWindowObserver('update')(params)
  popoverScrollParentsObserver('update')(params)
  popoverResizeTargetObserver('update')(params)
  popoverResizeWindowObserver('update')(params)
  popoverMutationObserver('update')(params)
}

const closeObserver: PopoverObserver = (params) => {
  popoverIntersectionObserver()(params)
  popoverScrollWindowObserver('close')(params)
  popoverScrollParentsObserver('close')(params)
  popoverResizeTargetObserver('close')(params)
  popoverResizeWindowObserver('close')(params)
  popoverMutationObserver('close')(params)
}

const resizeObserver: PopoverObserver = (params) => {
  if (closeOnResize.value) {
    closeObserver(params)

    return
  }

  popoverBaseObserver(params)
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
              Open second
              <Popover padding={10}>Second popover</Popover>
            </Button>
          </Popover>
        </Button>
        <Button>
          Hover Me
          <Popover vertical trigger={popoverHoverTrigger} padding={10} gap={8}>
            First popover
            <Button>
              Open second
              <Popover trigger={popoverHoverTrigger} padding={10}>Second popover</Popover>
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
          <Popover trigger={popoverClickOpenTrigger} padding={8}>Stays until an outside click</Popover>
        </Button>
        <Button>
          hover
          <Popover trigger={popoverHoverTrigger} padding={8}>Opens on hover</Popover>
        </Button>
        <Button>
          focus
          <Popover trigger={popoverFocusTrigger} padding={8}>Opens on focus</Popover>
        </Button>
      </Flex>
    ),
    delay: (
      <Button>
        Hover me
        <Popover trigger={popoverHoverTrigger} delay={500} padding={8}>
          Shown after 500 ms
        </Popover>
      </Button>
    ),
    noninteractive: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Hover me
          <Popover trigger={popoverHoverTrigger} noninteractive={noninteractive} padding={8}>
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
    controlledTrigger: (
      <Flex gap={12} align='center' wrap>
        <Button>
          Target
          <Popover
            width={100}
            placement='vertical-auto'
            trigger={() => {}}
            observer={updateObserver}
            opened={controlledTriggerOpen}
          >
            <Body>
              The parent keeps the open state
            </Body>
          </Popover>
        </Button>
        <Button onclick={toggleControlledTriggerOpen}>
          Open: {() => String(controlledTriggerOpen.value)}
        </Button>
      </Flex>
    ),
    action: (
      <Button>
        Click Me
        <Popover observer={updateObserver} padding={8}>
          updateObserver
        </Popover>
      </Button>
    ),
    updateSize: (
      <Card width={resizeWidth}>
        <Body vertical>
          <Flex element='label' gap={8} align='center'>
            <Toggle checked={closeOnResize} /> Close on resize
          </Flex>
          <Button>
            Click Me
            <Popover
              observer={resizeObserver}
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
    target: (
      <Flex justify='space-around' align='center' gap={16} wrap>
        <Button>
          Open popover
          <Popover target={targetRef} triggerTarget='parent' padding={8}>
            Positioned near the target
          </Popover>
        </Button>
        <Card ref={targetRef} width={160} padding={10}>
          Target element
        </Card>
      </Flex>
    ),
    triggerTarget: (
      <Flex justify='space-around' align='center' gap={16} wrap>
        <Button ref={triggerRef}>Trigger element</Button>
        <Card width={180} padding={10}>
          Popover owner
          <Popover triggerTarget={triggerRef} padding={8}>
            Triggered from the button
          </Popover>
        </Card>
      </Flex>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
