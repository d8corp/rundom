# Option

`<Option>` is a single selectable row. It is the building block of [\<Options>](/ui/options): the list handles virtualization, the selected value, and click handling, while `<Option>` renders the row and its visual state.

It extends [\<Box>](/ui/box), so layout, colors, sizes, views, and interaction props are inherited. By default the row takes the full width, switches to the filled view when `selected` is `true`, and exposes a clickable cursor unless `disabled` is set.

**Extends: [\<Box>](/ui/box)**

| Prop         | Type                                              | Description                                                |
|--------------|---------------------------------------------------|------------------------------------------------------------|
| [**value**](#value) | `V`                                               | Value represented by the row; used as the default content   |
| [**selected**](#states) | `ObservableProp<boolean>`                         | Switches the row to the filled view                         |
| [**disabled**](#states) | `ObservableProp<boolean>`                         | Blocks clicks and removes the clickable interaction         |
| **children** | `JSXElement`                                      | Custom row content; when omitted, `value` is rendered       |
| **class**    | `ObservableProp<string \| Partial<OptionStyles>>` | CSS class name(s) or an object that overrides styles        |

In addition to the props listed above, `<Option>` accepts all [\<Box>](/ui/box) props, including `onclick`, `style`, `color`, `size`, and `view`.

## Value
---

The `value` prop is the data represented by the row. When no children are provided, the value is rendered as the row content. The list passes the raw value to `onSelect` and uses it to compare the current selection.

```tsx
import { Option } from 'rundom'

<Option value='Apple' />
<Option value={{ id: 2, name: 'Banana' }}>
  🍌 Banana
</Option>
```

## States
---

`selected` and `disabled` only change the presentation and interaction. The value and the selection are controlled by the parent — either [\<Options>](/ui/options) or your own handler:

```tsx
//! View
//> states
//! Code
import { rundom, Flex, Option } from 'rundom'

rundom(
  <Flex vertical gap={4} style={{ width: '220px' }}>
    <Option value='Default' />
    <Option value='Selected' selected />
    <Option value='Disabled' disabled />
    <Option value='Selected and disabled' selected disabled />
  </Flex>
)
```

## Manual selection
---

When you render `<Option>` directly, pass `selected` and handle `onclick` yourself. This example keeps the selected value in a `Slot`:

```tsx
//! View
//> manual
//! Code
import { rundom, Flex, Option, Text } from 'rundom'
import { Slot } from 'rune-hub'

const selected = new Slot<string | null>(() => null)

const selectApple = () => selected.set('Apple')
const selectBanana = () => selected.set('Banana')

rundom(
  <Flex vertical gap={4} style={{ width: '220px' }}>
    <Option
      value='Apple'
      selected={() => selected.value === 'Apple'}
      onclick={selectApple}
    >
      Apple
    </Option>
    <Option
      value='Banana'
      selected={() => selected.value === 'Banana'}
      onclick={selectBanana}
    >
      Banana
    </Option>
    <Text>Selected: {() => selected.value ?? 'none'}</Text>
  </Flex>
)
```

## Inside Options
---

`<Options>` passes `selected` and `onclick` to every row. Use `renderOption` to add custom content while keeping that behavior:

```tsx
//! View
//> insideOptions
//! Code
import { rundom, Option, Options } from 'rundom'
import { Slot } from 'rune-hub'

const selected = new Slot<string>(() => 'Apple')
const icons: Record<string, string> = {
  Apple: '🍎',
  Banana: '🍌',
  Cherry: '🍒',
}
const options = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
]

rundom(
  <Options
    options={options}
    selected={selected}
    renderOption={({ value, ...props }) => (
      <Option {...props} value={value}>
        {`${icons[value] ?? '•'} ${value}`}
      </Option>
    )}
    style={{ height: '180px', width: '220px' }}
  />
)
```

Spread the renderer props into the custom `<Option>` so selection and clicks keep working.

## Inheritance
---

Every [\<Box>](/ui/box) prop is available. For example, `color` changes the filled view of a selected row:

```tsx
//! View
//> colors
//! Code
import { rundom, Flex, Option } from 'rundom'

rundom(
  <Flex vertical gap={4} style={{ width: '220px' }}>
    <Option value='Primary' selected color='primary' />
    <Option value='Accent' selected color='accent' />
    <Option value='Success' selected color='success' />
    <Option value='Warning' selected color='warning' />
    <Option value='Danger' selected color='danger' />
  </Flex>
)
```

## Theme
---

The default styles of `<Option>` come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.
Inside `<Options>`, the row also reads the list's `--rd-options-item-size`, `--rd-options-gap`, and `--rd-options-font-size` custom properties.

| Variable                    | Description                                          |
|-----------------------------|------------------------------------------------------|
| `RD_THEME_OPTION`           | CSS of the component that is added to the page       |
| `RD_THEME_OPTION__ROOT`     | Class name(s) of the row, always applied             |

### Replacing the component

Set `RD_UI_OPTION` to a module alias, and `<Option>` will be taken from the `Option` export of that module. It is handy for testing, for example, to add `data-testid` to every row:

```tsx
//! .env
RD_UI_OPTION='@theme/option'
//! theme/option.tsx
import { OptionComponent, OptionProps } from 'rundom'

export function Option (props: OptionProps) {
  return <OptionComponent {...props} data-testid='option' />
}
```

## What's Next?
---

- Explore [\<Options>](/ui/options) to render a virtualized list of options
- Explore [\<Options>](/ui/options) to build a selectable list
- Explore [\<Box>](/ui/box) to understand the inherited layout and colors
