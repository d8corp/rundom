# Scrollbar

The `<Scrollbar>` component wraps content and provides controlled scroll behavior.
It supports a stable scrollbar gutter and overflow modes.

| Prop         | Type                                | Description                                                                                                                                                |
|--------------|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **class**    | `string` `ScrollbarStyles`          | Additional CSS class(es) to apply to the root element                                                                                                      |
| [**stable**](#stable-gutter) | `ObservableProp<boolean>`           | Reserves space for the [scrollbar gutter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter) to prevent layout shifts |
| [**overflow**](#overflow) | `ObservableProp<ScrollbarOverflow>` | Sets the CSS [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow) behavior.                                          |

In addition to the props listed above, `<Scrollbar>` accepts all standard `<div>` element attributes such as `id`, `title`, and event handlers.

## Basic usage
---

By default, `<Scrollbar>` renders as a `<div>` with `'auto'` overflow:

```tsx
//! View
//> basic
//! Code
import { rundom, Scrollbar } from 'rundom'
import type { HTMLStyleProp } from 'rundom'

const text = 'Scrollable content goes here Scrollable content goes here Scrollable content goes here Longwordwithoutspace'
const style: HTMLStyleProp = { height: '80px', width: '80px' }

rundom(
  <Scrollbar style={style}>
    {text}
  </Scrollbar>
)
```

## Stable gutter
---

By default, when the scrollbar appears or disappears, the content layout may shift.
Set `stable` to `true` to reserve space for the scrollbar gutter, preventing layout shifts:

```tsx
//! View
//> stable
//! Code
import { rundom, Scrollbar, Flex, Button } from 'rundom'
import type { HTMLStyleProp } from 'rundom'
import { Slot } from 'rune-hub'

const stable = new Slot(() => false)
const scrollbar = new Slot(() => false)

const toggleStable = () => stable.set(!stable.raw)
const toggleScrollbar = () => scrollbar.set(!scrollbar.raw)

rundom(
  <Flex gap={8} vertical>
    <Flex gap={8} wrap>
      <Button onclick={toggleStable} color={() => stable.value ? 'primary' : 'neutral'}>
        Stable
      </Button>
      <Button onclick={toggleScrollbar} color={() => scrollbar.value ? 'primary' : 'neutral'}>
        Scrollbar
      </Button>
    </Flex>
    <Scrollbar
      stable={stable}
      padding={4}
      style={{
        width: '100px',
        height: '80px',
        border: '1px dashed #999',
      }}
    >
      <div
        style={{
          border: '1px dashed #06f',
          height: () => scrollbar.value ? '200%' : 'auto',
        }}
      >
        Scrollable content goes here
      </div>
    </Scrollbar>
  </Flex>
)
```

## Overflow
---

Use the `overflow` prop to control the CSS [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow) behavior:

```tsx
//! View
//> overflow
//! Code
import { rundom, Scrollbar, Flex } from 'rundom'
import type { HTMLStyleProp } from 'rundom'

const text = 'Scrollable content goes here Scrollable content goes here Scrollable content goes here Longwordwithoutspace'
const style: HTMLStyleProp = { height: '80px', width: '80px' }

rundom(
  <Flex gap={16} wrap>
    <Scrollbar overflow='auto' style={style}>
      Auto overflow (default) {text}
    </Scrollbar>
    <Scrollbar overflow='scroll' style={style}>
      Always show scrollbar
    </Scrollbar>
    <Scrollbar overflow='hidden' style={style}>
      Hidden overflow {text}
    </Scrollbar>
    <Scrollbar overflow='auto hidden' style={style}>
      Horizontal only {text}
    </Scrollbar>
    <Scrollbar overflow='hidden auto' style={style}>
      Vertical only {text}
    </Scrollbar>
  </Flex>
)
```

## Theme
---

The default styles of `<Scrollbar>` come from the theme and are configured with environment variables:

| Variable                     | Description                                       |
|------------------------------|---------------------------------------------------|
| `RD_THEME_SCROLLBAR`         | CSS of the component that is added to the page    |
| `RD_THEME_SCROLLBAR__ROOT`   | Class name(s) of the root element, always applied |
| `RD_THEME_SCROLLBAR__STABLE` | Class name(s) applied when `stable` is `true`     |

### Replacing the component

Set `RD_UI_SCROLLBAR` to a module alias, and `<Scrollbar>` will be taken from the `Scrollbar` export of that module:

```tsx
//! .env
RD_UI_SCROLLBAR='@theme/scrollbar'
//! theme/scrollbar.tsx
import { ScrollbarComponent, ScrollbarProps } from 'rundom'

export function Scrollbar (props: ScrollbarProps) {
  return <ScrollbarComponent {...props} data-testid='scrollbar' />
}
```

## What's Next?
---

- Explore the [\<Flex>](/ui/flex) for layout arrangements
- Learn about [\<Card>](/ui/card) for content grouping
- Discover the [\<Flex>](/ui/flex) for spacing
