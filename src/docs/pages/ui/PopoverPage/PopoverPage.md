# Popover

`<Popover>` is a [\<Card>](/ui/card) that appears next to a target element.
It renders through [\<Portal>](/portal) and is positioned from the target's bounding rectangle, so it is not clipped by the parent layout.
While open, it watches the target and by default closes when the page or an overflow parent scrolls and when the target leaves the viewport.

The component inherits all [\<Card>](/ui/card) props, which means it can carry arbitrary content and be shaped with the usual card surface, size, padding and layout options.

| Prop                                | Type                                  | Description                                                                                                     |
|-------------------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| [**children**](#card)               | `JSX.Element`                         | Content of the popover card                                                                                     |
| [**placement**](#placement)         | `ObservableProp<PopoverPlacement>`    | Side and alignment relative to the target. Defaults to `'auto-auto'`                                            |
| [**trigger**](#trigger)             | `PopoverTrigger`                      | Function that connects target events to the popover. Defaults to `popoverClickTrigger`                          |
| [**target**](#target)               | `PopoverTarget`                       | Element to position the card near: a `Ref`, `'parent'`, `'before'` or `'after'`. Defaults to `'parent'`         |
| [**triggerTarget**](#trigger-target) | `PopoverTarget`                     | Element whose events control the popover. Defaults to `target`                                                  |
| [**opened**](#controlled-state)     | `ObservableProp<boolean>`             | Open state. Defaults to an internal `Slot`                                                                      |
| [**onChangeOpened**](#controlled-state) | `(opened: boolean) => void`       | Called when the popover changes its open state                                                                  |
| [**noninteractive**](#noninteractive) | `ObservableProp<boolean>`           | Disables pointer events on the card, so hovering it does not keep the popover open                              |
| [**delay**](#delay)                 | `ObservableProp<number>`              | Delay before the popover becomes visible, in milliseconds                                                       |
| [**observer**](#observer)           | `PopoverObserver`                     | Listens to target changes while open. Defaults to `popoverBaseObserver`                                         |

In addition to the props listed above, `<Popover>` accepts all [\<Card>](/ui/card) props, including `size`, `width`, `height`, `padding`, `gap` and event handlers.

## Basic usage
---

Place `<Popover>` inside the element that should open it. The default `popoverClickTrigger` opens the card on click, keeps it open when the card is clicked, and closes it on an outside click:

```tsx
//! View
//> basic
//! Code
import { rundom, Button, Popover } from 'rundom'

rundom(
  <Button>
    Click me
    <Popover padding={8}>
      Popover content
    </Popover>
  </Button>
)
```

## Card
---

Since `<Popover>` renders a [\<Card>](/ui/card), it accepts the card surface, size, width and layout props.
Compose the content with [\<Preview>](/ui/card#preview), [\<Body>](/ui/card#content), [\<CardTitle>](/ui/card#content) and [\<Description>](/ui/description):

```tsx
//! View
//> card
//! Code
import {
  rundom,
  Body, Button, CardTitle, Description,
  HtmlIcon, Popover, Preview,
} from 'rundom'

rundom(
  <Button>
    Click Me
    <Popover width={260}>
      <Preview>
        <HtmlIcon size={20} />
      </Preview>
      <Body vertical>
        <CardTitle>Popover title</CardTitle>
        <Description>
          The card surface accepts size, width, padding and gap.
        </Description>
      </Body>
    </Popover>
  </Button>
)
```

## Nested popovers
---

Popovers can be nested. The built-in triggers share a context with their child popovers, so clicking inside a child card or moving the pointer into it does not close the parent:

```tsx
//! View
//> nested
//! Code
import { rundom, Button, Flex, Popover, popoverHoverTrigger } from 'rundom'

rundom(
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
          <Popover trigger={popoverHoverTrigger} padding={10}>
            Second popover
          </Popover>
        </Button>
      </Popover>
    </Button>
  </Flex>
)
```

## Placement
---

`placement` is a `side-alignment` pair:

- Static sides (`top`, `bottom`, `left`, `right`) always put the card on that side.
- Dynamic sides (`auto`, `vertical`, `horizontal`) pick the side with the most free space around the target.
- Static alignments (`start`, `center`, `end`) keep the card aligned to that part of the target.
- The `auto` alignment resolves to `start` or `end`, whichever keeps the card inside the viewport.

The side and alignment parts can be mixed, so `vertical-center` resolves the side but keeps the card centered, while `top-auto` fixes the side and resolves only the alignment.
Static sides and alignments are passed to the theme as classes; dynamic values are resolved before rendering, so the card always ends up with a static side and a static alignment.

Static example with every side and alignment:

```tsx
//! View
//> staticPlacement
//! Code
import { rundom, Button, Flex, Popover } from 'rundom'

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

rundom(
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
)
```

Dynamic example:

```tsx
//! View
//> dynamicPlacement
//! Code
import { rundom, Button, Flex, Popover } from 'rundom'

const dynamicPlacements = [
  'auto-auto',
  'vertical-auto',
  'horizontal-auto',
] as const

rundom(
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
)
```

## Trigger
---

`trigger` is a function that receives `{ target, card, open, close, hidden, opened, context }` and connects target events to the popover.
The built-in triggers cover the common cases:

- `popoverClickTrigger` (default) opens on click and closes on the next click on the target or on an outside click.
- `popoverClickOpenTrigger` opens on click and stays open until an outside click; repeated clicks on the target do not close it.
- `popoverHoverTrigger` opens when the pointer enters the target and closes when it leaves; moving into the card keeps it open.
- `popoverFocusTrigger` opens on `focus` and closes on `blur`.

A trigger may return a context value, which is passed to nested popovers; the built-in triggers use it to keep a parent open while a child popover is in use.
An empty trigger such as `trigger={() => {}}` disables event handling entirely, which is useful when the open state is controlled from outside:

```tsx
//! View
//> trigger
//! Code
import {
  rundom,
  Button, Flex, Popover,
  popoverClickOpenTrigger, popoverFocusTrigger, popoverHoverTrigger,
} from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Button>
      click
      <Popover padding={8}>Opens on click</Popover>
    </Button>
    <Button>
      click-open
      <Popover trigger={popoverClickOpenTrigger} padding={8}>
        Stays until an outside click
      </Popover>
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
)
```

## Delay
---

`delay` postpones opening, which is handy for hover tooltips that should not flash on every pointer movement.
It does not postpone closing: the open state changes immediately, and the card stays mounted for a short hide delay so the theme can animate it away.
The hide delay is configured with `RD_UI_POPOVER_HIDE_DELAY` and is 300 ms by default.

`delay` is experimental and may be removed in the future.

```tsx
//! View
//> delay
//! Code
import { rundom, Button, Popover, popoverHoverTrigger } from 'rundom'

rundom(
  <Button>
    Hover me
    <Popover trigger={popoverHoverTrigger} delay={500} padding={8}>
      Shown after 500 ms
    </Popover>
  </Button>
)
```

## Noninteractive
---

By default the card keeps a hover-triggered popover open while the pointer is over the card itself.
`noninteractive` disables pointer events on the card, so it behaves like a non-interactive hint:

```tsx
//! View
//> noninteractive
//! Code
import {
  rundom,
  Button, Flex, Popover, popoverHoverTrigger,
  Text, Toggle,
} from 'rundom'
import { Slot } from 'rune-hub'

const noninteractive = new Slot(() => false)
const setNoninteractive = (value: boolean) => noninteractive.set(value)

rundom(
  <Flex gap={12} align='center' wrap>
    <Button>
      Hover me
      <Popover
        trigger={popoverHoverTrigger}
        noninteractive={noninteractive}
        padding={8}
      >
        Non-interactive hint
      </Popover>
    </Button>
    <Flex element='label' gap={8} align='center'>
      <Toggle checked={noninteractive} onChange={setNoninteractive} />
      <Text cursor='pointer'>noninteractive</Text>
    </Flex>
  </Flex>
)
```

## Controlled state
---

`opened` holds the open state. When it is omitted, `<Popover>` creates its own `Slot`, so the popover works without any setup.
Pass a `Slot` to keep the state in the parent: the popover writes into the same `Slot`, so the value stays in sync in both directions.
If `opened` is a read-only observable instead of a `Slot`, pass `onChangeOpened` to mirror the changes into your state.

```tsx
//! View
//> controlled
//! Code
import { rundom, Body, Button, Flex, Popover } from 'rundom'
import { Slot } from 'rune-hub'

const controlledOpen = new Slot(() => false)

rundom(
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
)
```

Combine a controlled state with an empty trigger to open the popover only from your own controls:

```tsx
//! View
//> controlledTrigger
//! Code
import {
  rundom,
  Body, Button, Flex,
  Popover,
  popoverIntersectionObserver, popoverMutationObserver,
  popoverResizeTargetObserver, popoverResizeWindowObserver,
  popoverScrollParentsObserver, popoverScrollWindowObserver,
  type PopoverObserver,
} from 'rundom'
import { Slot } from 'rune-hub'

const controlledTriggerOpen = new Slot(() => false)

const updateObserver: PopoverObserver = (params) => {
  popoverIntersectionObserver()(params)
  popoverScrollWindowObserver('update')(params)
  popoverScrollParentsObserver('update')(params)
  popoverResizeTargetObserver('update')(params)
  popoverResizeWindowObserver('update')(params)
  popoverMutationObserver('update')(params)
}

const toggleControlledTriggerOpen = () => {
  controlledTriggerOpen.set(!controlledTriggerOpen.raw)
}

rundom(
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
)
```

## Observer
---

While the popover is open, `observer` watches the target and keeps the card in sync. The observer is called with `{ target, close, update }`, where `target` is the positioning element from the `target` prop.

The default `popoverBaseObserver` is composed from the exported helpers:

- `popoverIntersectionObserver()` closes the popover when the target leaves the viewport.
- `popoverScrollWindowObserver(action)` reacts to window scrolling.
- `popoverScrollParentsObserver(action)` reacts to scrolling in the target's overflow parents.
- `popoverResizeTargetObserver(action)` reacts to target resizing.
- `popoverResizeWindowObserver(action)` reacts to window resizing.
- `popoverMutationObserver(action)` reacts to DOM mutations around the target.

`action` is either `'update'` to reposition the card or `'close'` to dismiss it.
The default observer closes on scrolling, updates on resizing and DOM mutations, and always closes when the target becomes invisible.

Build a custom observer by calling the helpers with the action you need. The example below keeps the card next to the target while the page scrolls instead of closing it:

```tsx
//! View
//> action
//! Code
import {
  rundom,
  Button, Popover,
  popoverIntersectionObserver, popoverMutationObserver,
  popoverResizeTargetObserver, popoverResizeWindowObserver,
  popoverScrollParentsObserver, popoverScrollWindowObserver,
  type PopoverObserver,
} from 'rundom'

const updateObserver: PopoverObserver = (params) => {
  popoverIntersectionObserver()(params)
  popoverScrollWindowObserver('update')(params)
  popoverScrollParentsObserver('update')(params)
  popoverResizeTargetObserver('update')(params)
  popoverResizeWindowObserver('update')(params)
  popoverMutationObserver('update')(params)
}

rundom(
  <Button>
    Click Me
    <Popover observer={updateObserver} padding={8}>
      updateObserver
    </Popover>
  </Button>
)
```

## Size changes
---

Target size changes are handled by the same observers. `popoverResizeTargetObserver('update')` repositions the card, while `popoverResizeTargetObserver('close')` dismisses it.
The example switches between both behaviors; the `Resize` button changes the width of the surrounding card, which resizes the target:

```tsx
//! View
//> updateSize
//! Code
import {
  rundom,
  Body, Button, Card, Flex, Popover, Toggle,
  popoverBaseObserver,
  popoverIntersectionObserver, popoverMutationObserver,
  popoverResizeTargetObserver, popoverResizeWindowObserver,
  popoverScrollParentsObserver, popoverScrollWindowObserver,
  type PopoverObserver,
} from 'rundom'
import { Slot } from 'rune-hub'

const resizeWidth = new Slot(() => 250)
const closeOnResize = new Slot(() => false)

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

rundom(
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
)
```

## Target
---

By default the card is positioned near the element that contains `<Popover>`.
`target` accepts a `Ref` to any element, or one of the string values:

- `'parent'` (default) uses the element that contains `<Popover>`.
- `'before'` uses the previous sibling element of `<Popover>`.
- `'after'` uses the next sibling element of `<Popover>`.

The example positions the card near another card while keeping the button as the trigger target:

```tsx
//! View
//> target
//! Code
import { rundom, Button, Card, Flex, Popover, Ref } from 'rundom'

const targetRef = new Ref<HTMLDivElement>()

rundom(
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
)
```

## Trigger target
---

`triggerTarget` separates the element that opens the popover from the element the card is positioned near.
It accepts the same values as `target` and defaults to it:

```tsx
//! View
//> triggerTarget
//! Code
import { rundom, Button, Card, Flex, Popover, Ref } from 'rundom'

const triggerRef = new Ref<HTMLButtonElement>()

rundom(
  <Flex justify='space-around' align='center' gap={16} wrap>
    <Button ref={triggerRef}>Trigger element</Button>
    <Card width={180} padding={10}>
      Popover owner
      <Popover triggerTarget={triggerRef} padding={8}>
        Triggered from the button
      </Popover>
    </Card>
  </Flex>
)
```

## Theme
---

The default styles of `<Popover>` come from the theme and are configured with environment variables:

| Variable                          | Description                                                              |
|-----------------------------------|--------------------------------------------------------------------------|
| `RD_THEME_POPOVER`                | CSS of the component that is added to the page                           |
| `RD_THEME_POPOVER__ROOT`          | Class name(s) of the card, always applied                                |
| `RD_THEME_POPOVER__HIDDEN`        | Class name(s) applied while `opened` is `false`                          |
| `RD_THEME_POPOVER__PREVENT_HOVER` | Class name(s) applied when `noninteractive` is `true`                    |
| `RD_THEME_POPOVER__TOP`           | Class name(s) applied when the card is on top                            |
| `RD_THEME_POPOVER__BOTTOM`        | Class name(s) applied when the card is on the bottom                     |
| `RD_THEME_POPOVER__LEFT`          | Class name(s) applied when the card is on the left                       |
| `RD_THEME_POPOVER__RIGHT`         | Class name(s) applied when the card is on the right                      |
| `RD_THEME_POPOVER__START`         | Class name(s) applied when the card is aligned to start                  |
| `RD_THEME_POPOVER__CENTER`        | Class name(s) applied when the card is centered                          |
| `RD_THEME_POPOVER__END`           | Class name(s) applied when the card is aligned to end                    |

The card also receives the target geometry through the `--rd-popover-left`, `--rd-popover-top`, `--rd-popover-width` and `--rd-popover-height` custom properties.
A custom theme combines them with the side and alignment classes to place the card.

### Replacing the component

Set `RD_UI_POPOVER` to a module alias, and `<Popover>` will be taken from the `Popover` export of that module:

```tsx
//! .env
RD_UI_POPOVER='@theme/popover'
//! theme/popover.tsx
import { PopoverComponent, PopoverProps } from 'rundom'

export function Popover (props: PopoverProps) {
  return <PopoverComponent {...props} data-testid='popover' />
}
```

## What's Next?
---

- Learn about [\<Card>](/ui/card) for the surface and content composition used by popovers
- Explore [\<Portal>](/portal), which keeps popovers outside of the parent layout
- Read about [\<Context>](/context) for the nesting behavior used by parent and child popovers
- Add [\<Button>](/ui/button) as the trigger for popovers
