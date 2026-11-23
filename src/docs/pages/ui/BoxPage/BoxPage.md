# Box

The `<Box>` component renders a small block or inline element with a filled, soft, surface, dashed, or ghost view.
It supports multiple semantic colors, sizes, views, shapes, and interactive states.

| Prop         | Type                                           | Description                                                                                                                        |
|--------------|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **class**    | `string \| BoxStyles`                          | Additional CSS class(es) to apply to the root element                                                                              |
| [**color**](#color) | `ObservableProp<BoxColor>`                     | Sets the box color. Available: `'primary'` (default), `'accent'`, `'neutral'`, `'info'`, `'success'`, `'warning'`, `'danger'`      |
| [**size**](#size) | `ObservableProp<BoxSize>`                      | Sets the box size. Available: `'xxs'`, `'xs'`, `'s'`, `'m'` (default), `'l'`, `'xl'`, `'xxl'`                                      |
| [**view**](#view) | `ObservableProp<BoxView>`                      | Sets the visual style. Available: `'filled'` (default), `'soft'`, `'surface'`, `'dashed'`, `'ghost'`                               |
| [**square**](#square) | `ObservableProp<boolean \| 'left' \| 'right'>` | Renders a square instead of the default rounded shape. `'left'` or `'right'` rounds only one side                                  |
| [**circle**](#circle) | `ObservableProp<boolean>`                      | Renders a circle                                                                                                                   |
| [**interact**](#interact) | `ObservableProp<BoxInteract \| undefined>`     | Enables an interactive state. Available: `'hoverable'`, `'clickable'`, `'disabled'`                                               |

In addition to the props listed above, `<Box>` accepts all standard element attributes such as `id`, `title`, and event handlers, as well as the layout props inherited from `<Flex>`.

## Basic usage
---

By default, `<Box>` renders with the `filled` view, the `primary` color, and the `'m'` size:

```tsx
//! View
//> basic
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Box />
    <Box>
      Default box
    </Box>
  </Flex>
)
```

## View
---

Use the `view` prop to change the visual style of the box:

- `'filled'` (default): a solid semantic background.
- `'soft'`: a tinted background with a matching border and text.
- `'surface'`: a neutral background with a subtle border, intended for cards and inputs.
- `'dashed'`: a transparent background with a dashed border.
- `'ghost'`: a transparent background with no visible border.

```tsx
//! View
//> view
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Box view='filled'>filled</Box>
    <Box view='soft'>soft</Box>
    <Box view='surface'>surface</Box>
    <Box view='dashed'>dashed</Box>
    <Box view='ghost'>ghost</Box>
  </Flex>
)
```

The `surface` view ignores the background of the semantic color and only uses the color for hover and focus borders.
It is the view used by inputs and other neutral containers.

## Interact
---

Set `interact` to add a hover or click effect to the box, or to disable it:

```tsx
//! View
//> interact
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Flex gap={8} wrap>
      hoverable:
      <Box interact='hoverable' view='filled'>filled</Box>
      <Box interact='hoverable' view='soft'>soft</Box>
      <Box interact='hoverable' view='surface'>surface</Box>
      <Box interact='hoverable' view='dashed'>dashed</Box>
      <Box interact='hoverable' view='ghost'>ghost</Box>
    </Flex>
    <Flex gap={8} wrap>
      clickable:
      <Box interact='clickable' view='filled'>filled</Box>
      <Box interact='clickable' view='soft'>soft</Box>
      <Box interact='clickable' view='surface'>surface</Box>
      <Box interact='clickable' view='dashed'>dashed</Box>
      <Box interact='clickable' view='ghost'>ghost</Box>
    </Flex>
    <Flex gap={8} wrap>
      disabled:
      <Box interact='disabled' view='filled'>filled</Box>
      <Box interact='disabled' view='soft'>soft</Box>
      <Box interact='disabled' view='surface'>surface</Box>
      <Box interact='disabled' view='dashed'>dashed</Box>
      <Box interact='disabled' view='ghost'>ghost</Box>
    </Flex>
  </Flex>
)
```

The `disabled` state blocks pointer interaction and fades the box while keeping its shape and view.

## Color
---

Use the `color` prop to set the semantic color of the box:

```tsx
//! View
//> color
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex vertical gap={8}>
    <Flex gap={8} wrap>
      filled:
      <Box view='filled' interact='clickable' color='primary'>primary</Box>
      <Box view='filled' interact='clickable' color='accent'>accent</Box>
      <Box view='filled' interact='clickable' color='neutral'>neutral</Box>
      <Box view='filled' interact='clickable' color='info'>info</Box>
      <Box view='filled' interact='clickable' color='success'>success</Box>
      <Box view='filled' interact='clickable' color='warning'>warning</Box>
      <Box view='filled' interact='clickable' color='danger'>danger</Box>
    </Flex>
    <Flex gap={8} wrap>
      soft:
      <Box view='soft' interact='clickable' color='primary'>primary</Box>
      <Box view='soft' interact='clickable' color='accent'>accent</Box>
      <Box view='soft' interact='clickable' color='neutral'>neutral</Box>
      <Box view='soft' interact='clickable' color='info'>info</Box>
      <Box view='soft' interact='clickable' color='success'>success</Box>
      <Box view='soft' interact='clickable' color='warning'>warning</Box>
      <Box view='soft' interact='clickable' color='danger'>danger</Box>
    </Flex>
    <Flex gap={8} wrap>
      dashed:
      <Box view='dashed' interact='clickable' color='primary'>primary</Box>
      <Box view='dashed' interact='clickable' color='accent'>accent</Box>
      <Box view='dashed' interact='clickable' color='neutral'>neutral</Box>
      <Box view='dashed' interact='clickable' color='info'>info</Box>
      <Box view='dashed' interact='clickable' color='success'>success</Box>
      <Box view='dashed' interact='clickable' color='warning'>warning</Box>
      <Box view='dashed' interact='clickable' color='danger'>danger</Box>
    </Flex>
    <Flex gap={8} wrap>
      ghost:
      <Box view='ghost' interact='clickable' color='primary'>primary</Box>
      <Box view='ghost' interact='clickable' color='accent'>accent</Box>
      <Box view='ghost' interact='clickable' color='neutral'>neutral</Box>
      <Box view='ghost' interact='clickable' color='info'>info</Box>
      <Box view='ghost' interact='clickable' color='success'>success</Box>
      <Box view='ghost' interact='clickable' color='warning'>warning</Box>
      <Box view='ghost' interact='clickable' color='danger'>danger</Box>
    </Flex>
  </Flex>
)
```

## Size
---

Use the `size` prop to control the box size:

```tsx
//! View
//> size
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={16} align='center' wrap>
    <Box size='xxs'>xxs</Box>
    <Box size='xs'>xs</Box>
    <Box size='s'>s</Box>
    <Box size='m'>m</Box>
    <Box size='l'>l</Box>
    <Box size='xl'>xl</Box>
    <Box size='xxl'>xxl</Box>
  </Flex>
)
```

## Square
---

Set `square` to `true` to render a square instead of the default rounded shape:

```tsx
//! View
//> square
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={16} align='center' wrap>
    <Box square size='xxs'>1</Box>
    <Box square size='xs'>1</Box>
    <Box square size='s'>1</Box>
    <Box square size='m'>1</Box>
    <Box square size='l'>1</Box>
    <Box square size='xl'>1</Box>
    <Box square size='xxl'>1</Box>
  </Flex>
)
```

## Circle
---

Set `circle` to `true` to render a circle:

```tsx
//! View
//> circle
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={16} align='center' wrap>
    <Box circle square size='xxs'>1</Box>
    <Box circle square size='xs'>1</Box>
    <Box circle square size='s'>1</Box>
    <Box circle square size='m'>1</Box>
    <Box circle square size='l'>1</Box>
    <Box circle square size='xl'>1</Box>
    <Box circle square size='xxl'>1</Box>
  </Flex>
)
```

## Radiobox
---

Combine `circle` with `view='soft'` to create a radiobutton-like element. Nest a smaller circle inside to show a selected state:

```tsx
//! View
//> radiobox
//! Code
import { rundom, Box, Flex } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Box interact='clickable' circle view='soft' size='s' />
    <Box interact='clickable' circle view='soft' size='s'>
      <Box circle size='xxs' />
    </Box>
  </Flex>
)
```

## Checkbox
---

Use a soft box to create a checkbox-like element. Add an icon or a filled inner box to represent checked states:

```tsx
//! View
//> checkbox
//! Code
import { rundom, Box, Flex, CheckIcon } from 'rundom'

rundom(
  <Flex gap={8} align='center'>
    <Box interact='clickable' view='soft' size='s' />
    <Box interact='clickable' view='soft' size='s'>
      <Box size='xxs' />
    </Box>
    <Box interact='clickable' view='soft' square size='s'>
      <CheckIcon stroke-width='4' />
    </Box>
    <Box interact='clickable' square size='s'>
      <CheckIcon stroke-width='4' />
    </Box>
  </Flex>
)
```

## Toggle
---

Use a rounded box with two nested circles to build a toggle switch. Alternate a filled inner circle with a ghost one to represent the off and on states:

```tsx
//! View
//> toggle
//! Code
import { rundom, Box, Flex, CheckIcon } from 'rundom'

rundom(
  <Flex gap={8} align='center' wrap>
    <Box circle interact='clickable' view='soft' size='s'>
      <Box size='xs' circle />
      <Box size='xs' view='ghost' />
    </Box>
    <Box circle interact='clickable' size='s'>
      <Box size='xs' view='ghost' />
      <Box size='xs' circle style={{ background: '#fff' }} />
    </Box>
    <Box circle color='danger' interact='clickable' view='soft' size='s'>
      <Box size='xs' circle color='danger' />
      <Box size='xs' view='ghost' />
    </Box>
    <Box circle color='danger' interact='clickable' size='s'>
      <Box size='xs' view='ghost' />
      <Box size='xs' circle color='danger' style={{ background: '#fff' }} />
    </Box>
    <Box circle interact='clickable' view='soft' square>
      <Box size='s' circle />
      <Box size='s' view='ghost' />
    </Box>
    <Box circle interact='clickable' square>
      <Box size='s' view='ghost' />
      <Box size='s' circle style={{ background: '#fff' }} />
    </Box>
  </Flex>
)
```

## Theme
---

The default styles of `<Box>` come from the theme and are configured with environment variables:

| Variable                     | Description                                              |
|------------------------------|----------------------------------------------------------|
| `RD_THEME_BOX`               | CSS of the component that is added to the page           |
| `RD_THEME_BOX__ROOT`         | Class name(s) of the root element, always applied        |
| `RD_THEME_BOX__PRIMARY`      | Class name(s) applied when `color` is `'primary'`        |
| `RD_THEME_BOX__ACCENT`       | Class name(s) applied when `color` is `'accent'`         |
| `RD_THEME_BOX__NEUTRAL`      | Class name(s) applied when `color` is `'neutral'`        |
| `RD_THEME_BOX__INFO`         | Class name(s) applied when `color` is `'info'`           |
| `RD_THEME_BOX__SUCCESS`      | Class name(s) applied when `color` is `'success'`        |
| `RD_THEME_BOX__WARNING`      | Class name(s) applied when `color` is `'warning'`        |
| `RD_THEME_BOX__DANGER`       | Class name(s) applied when `color` is `'danger'`         |
| `RD_THEME_BOX__SQUARE`       | Class name(s) applied when `square` is `true`            |
| `RD_THEME_BOX__SQUARE_LEFT`  | Class name(s) applied when `square` is `'left'`          |
| `RD_THEME_BOX__SQUARE_RIGHT` | Class name(s) applied when `square` is `'right'`         |
| `RD_THEME_BOX__CIRCLE`       | Class name(s) applied when `circle` is `true`            |
| `RD_THEME_BOX__XXS`          | Class name(s) applied when `size` is `'xxs'`             |
| `RD_THEME_BOX__XS`           | Class name(s) applied when `size` is `'xs'`              |
| `RD_THEME_BOX__S`            | Class name(s) applied when `size` is `'s'`               |
| `RD_THEME_BOX__M`            | Class name(s) applied when `size` is `'m'`               |
| `RD_THEME_BOX__L`            | Class name(s) applied when `size` is `'l'`               |
| `RD_THEME_BOX__XL`           | Class name(s) applied when `size` is `'xl'`              |
| `RD_THEME_BOX__XXL`          | Class name(s) applied when `size` is `'xxl'`             |
| `RD_THEME_BOX__FILLED`       | Class name(s) applied when `view` is `'filled'`          |
| `RD_THEME_BOX__SOFT`         | Class name(s) applied when `view` is `'soft'`            |
| `RD_THEME_BOX__SURFACE`      | Class name(s) applied when `view` is `'surface'`         |
| `RD_THEME_BOX__GHOST`        | Class name(s) applied when `view` is `'ghost'`           |
| `RD_THEME_BOX__DASHED`       | Class name(s) applied when `view` is `'dashed'`          |
| `RD_THEME_BOX__HOVERABLE`    | Class name(s) applied when `interact` is `'hoverable'`   |
| `RD_THEME_BOX__CLICKABLE`    | Class name(s) applied when `interact` is `'clickable'`   |
| `RD_THEME_BOX__DISABLED`     | Class name(s) applied when `interact` is `'disabled'`    |

### Replacing the component

Set `RD_UI_BOX` to a module alias, and `<Box>` will be taken from the `Box` export of that module:

```tsx
//! .env
RD_UI_BOX='@theme/box'
//! theme/box.tsx
import { BoxComponent, BoxProps } from 'rundom'

export function Box (props: BoxProps) {
  return <BoxComponent {...props} data-testid='box' />
}
```

## What's Next?
---

- Learn about [\<Divider>](/ui/divider) for visual separation
- Explore the [\<Link>](/ui/link) for hyperlinks
- Discover available [\<Icons>](/ui/icons) for visual elements
