# Popover

`<Popover>` is a [\<Card>](/ui/card) that appears next to a target element.
It renders through [\<Portal>](/portal) and is positioned from the target's bounding rectangle, so it is not clipped by the parent layout.

The card is rendered only while it is visible. An [adapter](#adapter) connects the trigger events to the open state and keeps the card in sync with the target.

The component inherits all [\<Card>](/ui/card) props, which means it can carry arbitrary content and be shaped with the usual card surface, size, padding and layout options.

| Prop                                | Type                                  | Description                                                                                                     |
|-------------------------------------|---------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| [**adapter**](#adapter)             | `PopoverAdapter`                      | Connects trigger events to the popover and keeps the card in sync. Defaults to `popoverClickAdapter`            |
| [**delay**](#delay)                 | `ObservableProp<number>`              | Delay before the popover becomes visible, in milliseconds                                                       |
| [**noninteractive**](#noninteractive) | `ObservableProp<boolean>`           | Disables pointer events on the card, so hovering it does not keep the popover open                              |
| [**opened**](#controlled-state)     | `ObservableProp<boolean>`             | Open state. Defaults to an internal `Slot`                                                                      |
| [**placement**](#placement)         | `ObservableProp<PopoverPlacement>`    | Side and alignment relative to the target. Defaults to `'auto-auto'`                                            |
| [**rect**](#rect)                   | `ObservableProp<DOMRect>`             | Target rectangle used for positioning. Defaults to an empty `DOMRect`                                           |
| [**target**](#target)               | `PopoverTarget`                       | Element to position the card near: a `Ref`, `'parent'`, `'before'` or `'after'`. Defaults to `'parent'`         |
| [**trigger**](#trigger)             | `PopoverTarget`                       | Element whose events control the popover. Defaults to `target`                                                  |
| [**onChangeOpened**](#controlled-state) | `(opened: boolean) => void`       | Called when the popover changes its open state                                                                  |
| [**onChangeRect**](#rect)           | `(rect: DOMRect) => void`             | Called when an adapter writes a new target rectangle                                                            |

In addition to the props listed above, `<Popover>` accepts all [\<Card>](/ui/card) props, including `size`, `width`, `height`, `padding`, `gap` and event handlers.

## Basic usage
---

Place `<Popover>` inside the element that should open it. The default `popoverClickAdapter` opens the card on click, keeps it open when the card is clicked, and closes it on an outside click:

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

Adapters can return another adapter, which becomes the context of nested popovers.
The built-in click and hover adapters use it to keep the parent open while a child card is in use, so clicking inside a child or moving the pointer into it does not close the parent:

```tsx
//! View
//> nested
//! Code
import { rundom, Button, Flex, Popover, popoverHoverAdapter } from 'rundom'

rundom(
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
          <Popover adapter={popoverHoverAdapter} padding={10}>
            Second popover
          </Popover>
        </Button>
      </Popover>
    </Button>
    <Button>
      Click Me
      <Popover vertical padding={10} gap={8}>
        First popover
        <Button>
          Hover Me
          <Popover adapter={popoverHoverAdapter} padding={10}>
            Second popover
          </Popover>
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
Static sides and alignments are passed to the theme as classes; dynamic values are resolved from `rect` whenever the adapter calls `update()`, so the card always ends up with a static side and a static alignment.

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

## Target
---

By default the card is positioned near the element that contains `<Popover>`.
`target` accepts a `Ref` to any element, or one of the string values:

- `'parent'` (default) uses the element that contains `<Popover>`.
- `'before'` uses the previous sibling element of `<Popover>`.
- `'after'` uses the next sibling element of `<Popover>`.

The example positions the card near another card while keeping the button as the trigger element:

```tsx
//! View
//> target
//! Code
import { rundom, Button, Flex, Popover, Ref } from 'rundom'

const targetRef = new Ref<HTMLButtonElement>()

rundom(
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
)
```

## Trigger
---

`trigger` separates the element whose events control the popover from the element the card is positioned near.
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
      <Popover trigger={triggerRef} padding={8}>
        Triggered from the button
      </Popover>
    </Card>
  </Flex>
)
```

## Controlled state
---

`opened` holds the open state. When it is omitted, `<Popover>` creates its own `Slot`, so the popover works without any setup.
Pass a `Slot` to keep the state in the parent: adapters write into the same `Slot`, so the value stays in sync in both directions.
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

## Rect
---

`rect` holds the target rectangle used for positioning. The card receives it through the `--rd-popover-left`, `--rd-popover-top`, `--rd-popover-width` and `--rd-popover-height` custom properties.

Adapters write new geometry with `setRect` and then call `update` to re-resolve the placement.
When `rect` is a `Slot`, adapters write into it and a computed `Slot` can derive UI from the geometry. When `rect` is a read-only observable, pass `onChangeRect` to receive the changes.

The example keeps the target rectangle in a `Slot` and derives the size label from it with a computed `Slot`:

```tsx
//! View
//> rect
//! Code
import { rundom, Button, Flex, Popover } from 'rundom'
import { Slot } from 'rune-hub'

const targetRect = new Slot(() => new DOMRect())

const rectSize = new Slot(() => {
  const rect = targetRect.value

  return `${Math.round(rect.width)} × ${Math.round(rect.height)}`
})

rundom(
  <Flex gap={12} align='center' wrap>
    <Button>
      Open popover
      <Popover rect={targetRect} placement='vertical-auto' padding={8}>
        Positioned from the target rectangle
      </Popover>
    </Button>
    Target size: {rectSize}
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
import { rundom, Button, Popover, popoverHoverAdapter } from 'rundom'

rundom(
  <Button>
    Hover me
    <Popover adapter={popoverHoverAdapter} delay={500} padding={8}>
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
  Button, Flex, Popover, popoverHoverAdapter,
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
        adapter={popoverHoverAdapter}
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

## Adapter
---

`adapter` is a function that connects the popover to the DOM. It receives `PopoverAdapterParams`:

- `target`, `trigger` — the resolved elements from the props of the same name.
- `card` — a `Ref` to the card element.
- `open`, `close` — change the open state.
- `rect`, `setRect` — the current target rectangle and a writer (when available) that also calls `onChangeRect`.
- `update` — re-resolves the side and alignment from `rect`.
- `hidden`, `opened` — the rendered visibility (respects `delay` and the hide delay) and the open state.
- `context` — the adapter of the parent popover, if any.

The adapter is responsible for both the trigger behavior and keeping the card in sync. A custom adapter replaces the default behavior entirely, so it must add every listener it needs, including outside clicks and target tracking. The package ships with these adapters:

- `popoverClickAdapter` (default) — opens on trigger click, keeps the card open on card clicks and closes on the next trigger click or an outside click.
- `popoverClickOpenAdapter` — opens on trigger click and stays open until an outside click; repeated clicks on the trigger do not close it.
- `popoverHoverAdapter` — opens when the pointer enters the trigger and closes when it leaves; moving into the card keeps it open.
- `popoverFocusAdapter` — opens on `focus` and closes on `blur`. Experimental.
- `popoverContextMenuAdapter` — opens at the pointer on `contextmenu` and closes on scroll or an outside click. Experimental.
- `popoverSelectionAdapter` — opens next to the current text selection on `mouseup`, tracks it while scrolling and closes on `mousedown`. Experimental.

An adapter may return another adapter. The returned adapter receives the params of nested popovers and is passed to children as `context`; the built-in click and hover adapters use it to keep a parent open while a child popover is in use.

### Built-in adapters

The example switches between the click, click-open, hover and focus adapters:

```tsx
//! View
//> trigger
//! Code
import {
  rundom,
  Button, Flex, Popover,
  popoverClickOpenAdapter, popoverFocusAdapter, popoverHoverAdapter,
} from 'rundom'

rundom(
  <Flex gap={8} wrap>
    <Button>
      click
      <Popover padding={8}>Opens on click</Popover>
    </Button>
    <Button>
      click-open
      <Popover adapter={popoverClickOpenAdapter} padding={8}>
        Stays until an outside click
      </Popover>
    </Button>
    <Button>
      hover
      <Popover adapter={popoverHoverAdapter} padding={8}>
        Opens on hover
      </Popover>
    </Button>
    <Button>
      focus
      <Popover adapter={popoverFocusAdapter} padding={8}>
        Opens on focus
      </Popover>
    </Button>
  </Flex>
)
```

### Size changes

The click and hover adapters observe the target size and call `update` when it changes, so the card follows a resizing target without extra setup. The example changes the width of the surrounding card with the `Resize` button:

```tsx
//! View
//> updateSize
//! Code
import { rundom, Body, Button, Card, Popover } from 'rundom'
import { Slot } from 'rune-hub'

const resizeWidth = new Slot(() => 250)

const resize = () => {
  resizeWidth.set(resizeWidth.raw === 250 ? 300 : 250)
}

rundom(
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
)
```

### Custom adapter

Build a custom adapter when the built-in behavior does not fit. The example keeps the card next to the target while the page scrolls instead of closing it, and leaves opening to a separate button. The card stays open until the button is pressed again:

```tsx
//! View
//> adapter
//! Code
import {
  rundom,
  Body, Button, Flex,
  Popover,
  usePopoverScrollWindowObserver,
  type PopoverAdapter,
} from 'rundom'
import { Slot } from 'rune-hub'

const controlledAdapterOpen = new Slot(() => false)

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

const toggleAdapterOpen = () => {
  controlledAdapterOpen.set(!controlledAdapterOpen.raw)
}

rundom(
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
)
```

The reactive block re-runs when `hidden` changes. Observer helpers register listeners for the visible lifetime of the card and clean them up automatically inside a reactive scope such as `new Slot(...).on()`.

The click and hover adapters use `usePopoverBaseObserver(target, close, update)`, which closes the card on page and overflow-parent scroll, and calls `update` on target resize, window resize and DOM mutations around the target. The smaller helpers can be combined for a different behavior:

- `usePopoverIntersectionObserver(target, close)` — closes when the target leaves the viewport.
- `usePopoverScrollWindowObserver(action)` — reacts to page scroll.
- `usePopoverScrollParentsObserver(target, action)` — reacts to scroll in the target's overflow parents.
- `usePopoverResizeTargetObserver(target, action)` — reacts to target resizing.
- `usePopoverResizeWindowObserver(action)` — reacts to window resizing.
- `usePopoverMutationObserver(target, action)` — reacts to DOM mutations around the target.

Pass a function that refreshes `rect` and calls `update` to reposition the card, or `close` to dismiss it.

### Context menu

`popoverContextMenuAdapter` opens the card at the pointer on right click and closes it on scroll or an outside click. It is experimental:

```tsx
//! View
//> contextMenu
//! Code
import { rundom, Card, Popover, popoverContextMenuAdapter } from 'rundom'

rundom(
  <Card height={300} justify='space-around' align='center' gap={16} wrap>
    Right Click on here
    <Popover adapter={popoverContextMenuAdapter} padding={8}>
      Triggered by right click
    </Popover>
  </Card>
)
```

### Selection

`popoverSelectionAdapter` opens the card next to the current text selection on `mouseup`, tracks the selection while scrolling and closes it on `mousedown`. It is experimental:

```tsx
//! View
//> selectionAdapter
//! Code
import { rundom, Card, Popover, popoverSelectionAdapter } from 'rundom'

rundom(
  <Card height={300} justify='space-around' align='center' gap={16} wrap>
    Select this text
    <Popover
      placement='vertical-center'
      adapter={popoverSelectionAdapter}
      padding={8}
    >
      Triggered by selection: {() => String(window.getSelection())}
    </Popover>
  </Card>
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
