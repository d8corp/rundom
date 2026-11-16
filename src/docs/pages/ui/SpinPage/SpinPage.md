# Spin

`<Spin>` is a loading indicator made of dots arranged in a circle.
It inherits the current text color, so a parent control can color it automatically.

| Prop         | Type                                | Description                                      |
|--------------|-------------------------------------|--------------------------------------------------|
| [**size**](#size) | `ObservableProp<number \| string>` | Dot layout size; numbers are pixels. Default `'1em'` |
| **class**    | `string`                            | Additional CSS class(es) of the root element      |

`<Spin>` also accepts all [\<BaseIcon>](/ui/icons) props such as `style` and native SVG attributes.

## Basic usage
---

```tsx
//! View
//> basic
//! Code
import { rundom, Spin } from 'rundom'

rundom(<Spin />)
```

## Size
---

`size` sets the icon dimensions. Because the default is `'1em'`, a `<Spin>` inside a button matches the button text size.

```tsx
//! View
//> size
//! Code
import { rundom, Flex, Spin } from 'rundom'

rundom(
  <Flex gap={12} align='center'>
    <Spin />
    <Spin size={24} />
    <Spin size='3em' />
  </Flex>
)
```

## Theme
---

The default styles of `<Spin>` come from the theme and are configured with environment variables:

```shell
RD_THEME_SPIN='...generated CSS...'
RD_THEME_SPIN__ROOT='rd_spin'
RD_THEME_SPIN__DOT='rd_spin_dot'
RD_THEME__SPIN_DOT_COUNT=8
RD_THEME__SPIN_DOT='circle'
```

| Variable                       | Description                                       |
|--------------------------------|---------------------------------------------------|
| `RD_THEME_SPIN`                | CSS of the component that is added to the page    |
| `RD_THEME_SPIN__ROOT`          | Class name(s) of the icon, always applied         |
| `RD_THEME_SPIN__DOT`           | Class name(s) of a single dot                     |
| `RD_THEME__SPIN_DOT_COUNT`     | Number of dots in the indicator                   |
| `RD_THEME__SPIN_DOT`           | Tag or component used to render a dot             |

## What's Next?
---

- Learn about [\<Button>](/ui/button), which shows `<Spin>` while loading
- Explore the [\<Icons>](/ui/icons) gallery
- Read about [\<Suspense>](/suspense) for async boundaries
