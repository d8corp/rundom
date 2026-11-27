# Dropdown

`<Dropdown>` is a [\<Popover>](/ui/popover) that contains an [\<Options>](/ui/options) list. It inherits the positioning, triggers and open state of the popover and the selection behavior of the options list, so a select menu needs only the values and, optionally, the current selection.

The popover renders the card through [\<Portal>](/portal), so the list is not clipped by the parent layout. The card lays its content out vertically, so the optional [before](#before-and-after) and [after](#before-and-after) content appears above and below the list. The list is virtualized, which means only the rows that fit the visible area are rendered.

**Extends: [\<Popover>](/ui/popover)**

| Prop                                | Type                                      | Description                                                       |
|-------------------------------------|-------------------------------------------|-------------------------------------------------------------------|
| [**after**](#before-and-after)      | `JSXElement`                              | Content rendered below the list                                   |
| [**before**](#before-and-after)     | `JSXElement`                              | Content rendered above the list                                   |
| [**children**](#children)           | `RenderOption<T>`                         | Replaces the default row renderer                                 |
| [**key**](#key)                     | `ForKey<T[]>`                             | Row identity: a field name or a function                          |
| [**multiple**](#multiple-selection) | `ObservableProp<M>`                       | Allows selecting several values at once                           |
| [**selected**](#selected)           | `ObservableProp<GetOptionValue<T, M, K>>` | Selection: a single value, or an array when `multiple` is `true`  |
| [**size**](#size)                   | `ObservableProp<SMLSize>`                 | Row size: `'s'`, `'m'` (default), or `'l'`                        |
| [**values**](#values)               | `ObservableProp<T[]>`                     | Values to display; every value becomes a row                      |
| [**optionsProps**](#optionsprops)   | `DropdownOptionsProps<T, M, K>`           | Extra props forwarded to the inner options list                   |
| [**onSelect**](#onselect)           | `SelectOnSelect<T, M, K>`                 | Called after the selection changes                                |

In addition to the props listed above, `<Dropdown>` accepts all [\<Popover>](/ui/popover) props, including `placement`, `opened`, `adapter`, `target` and `trigger`, as well as the inherited [\<Card>](/ui/card) props such as `width`, `vertical` and `class`.

## Basic usage
---

Place `<Dropdown>` inside the element that should open it. The default `popoverClickAdapter` opens the list on click and closes it on an outside click:

```tsx
//! View
//> basic
//! Code
import { rundom, Button, Dropdown } from 'rundom'

const frameworks = ['Angular', 'React', 'Svelte', 'Vue']

rundom(
  <Button>
    Choose a framework
    <Dropdown values={frameworks} />
  </Button>
)
```

In single-selection mode the dropdown closes as soon as a row is picked, so the trigger button shows the result right away.

## Values
---

`values` is the data source of the list: every entry becomes a row of [\<Option>](/ui/option). The prop is reactive, so a plain array, a getter, or a `Slot` works, and the list applies only the additions and removals when the array changes.

The list is virtualized and measures its scroll container, so it needs a bounded height. Set it with the theme or with a `class`, so a long list scrolls while a short list shrinks to its content.

```tsx
//! View
//> values
//! Code
import { rundom, Button, Dropdown } from 'rundom'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]

rundom(
  <Button>
    Choose a fruit
    <Dropdown 
      values={fruits}
      height={200}
      width={200}
    />
  </Button>
)
```

## Selected
---

`selected` controls the selection. It holds one value in single-selection mode and an array when `multiple` is `true`. The list also tracks the selection internally when the prop is omitted:

```tsx
//! View
//> selected
//! Code
import { rundom, Button, Dropdown, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]

const selected = new Slot(() => 'Banana')

rundom(
  <Flex vertical gap={8} align='start'>
    <Button>
      Selected: {selected}
      <Dropdown
        values={fruits}
        selected={selected}
        height={150}
        width={150}
        placement='vertical-center'
      />
    </Button>
  </Flex>
)
```

Clicking a row writes the value into the slot. If `selected` is a fixed value or a getter, the dropdown is controlled: clicks do not change it until `onSelect` updates the source.

## Multiple selection
---

Set `multiple` to allow selecting several values at once. `selected` then holds an array, and clicking a row adds its value to the array or removes it:

```tsx
//! View
//> multiple
//! Code
import { rundom, Button, Dropdown, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const frameworks = ['Angular', 'React', 'Svelte', 'Vue']
const selected = new Slot<string[]>(() => ['React', 'Vue'])

rundom(
  <Flex vertical gap={8} align='start'>
    <Button>
      Choose frameworks
      <Dropdown values={frameworks} selected={selected} multiple />
    </Button>
    <Text>Selected: {() => selected.value.join(', ') || 'none'}</Text>
  </Flex>
)
```

Without `selected`, the list starts with an empty array and keeps it up to date internally.

## onSelect
---

`onSelect` receives the next selection after a row click: one value, or an array when `multiple` is `true`. In single-selection mode the dropdown closes after the pick; with `multiple` it stays open, so several rows can be toggled without reopening it:

```tsx
//! View
//> onSelect
//! Code
import { rundom, Button, Dropdown, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]
const lastSelected = new Slot<string>(() => 'none')
const handleSelect = (value: string) => lastSelected.set(value)

rundom(
  <Flex vertical gap={8} align='start'>
    <Button>
      Choose a fruit
      <Dropdown values={fruits} onSelect={handleSelect} />
    </Button>
    <Text>Last selected: {() => lastSelected.value}</Text>
  </Flex>
)
```

## Children
---

Pass a renderer as `children` to replace the default `<Option>` row. It receives the same props as the [\<Options>](/ui/options#children) renderer — `value`, `selected`, `size` and `onclick` — and `value` is a reactive slot, so read it inside a reactive child:

```tsx
//! View
//> children
//! Code
import { rundom, Button, Dropdown, Option } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]
const selected = new Slot<string>(() => 'Banana')

rundom(
  <Button>
    Choose a fruit
    <Dropdown
      values={fruits}
      selected={selected}
      children={({ value, ...props }) => (
        <Option {...props} value={value}>
          {() => value.value.toUpperCase()}
        </Option>
      )}
    />
  </Button>
)
```

## Before and after
---

`before` and `after` render extra content inside the popover, above and below the options list. They accept JSX, so a search field, a label, a separator, or a summary can live next to the list:

```tsx
//! View
//> beforeAfter
//! Code
import { rundom, Button, Dropdown, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]
const selected = new Slot<string>(() => 'Banana')

rundom(
  <Button>
    Choose a fruit
    <Dropdown
      values={fruits}
      selected={selected}
      before={<Text size='s'>Fruits</Text>}
      after={<Text size='s'>10 items</Text>}
    />
  </Button>
)
```

Since the card lays its content out vertically, `before` and `after` sit on top of and below the list. The list keeps its bounded height, so the extra content does not stretch it.

## Size
---

`size` changes the row metrics and typography of the list. It accepts `'s'`, `'m'` (default), and `'l'`:

```tsx
//! View
//> size
//! Code
import { rundom, Button, Dropdown, Flex } from 'rundom'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]

rundom(
  <Flex gap={8} wrap>
    <Button>
      s
      <Dropdown values={fruits} size='s' />
    </Button>
    <Button>
      m
      <Dropdown values={fruits} size='m' />
    </Button>
    <Button>
      l
      <Dropdown values={fruits} size='l' />
    </Button>
  </Flex>
)
```

The row metrics come from the same theme variables as [\<Options>](/ui/options#size), because virtualization relies on them.

## Key
---

`key` tells the list how to identify a row. Pass a field name such as `'id'` or a function that receives the item. With objects, this keeps rows stable when the array is replaced by new instances that carry the same key, and the selection then holds the key value:

```tsx
//! View
//> key
//! Code
import { rundom, Button, Dropdown, Flex, Option, Text } from 'rundom'
import { Slot } from 'rune-hub'

interface City {
  id: string
  name: string
  country: string
}

const cities: City[] = [
  { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
  { id: 'paris', name: 'Paris', country: 'France' },
  { id: 'new-york', name: 'New York', country: 'USA' },
  { id: 'sydney', name: 'Sydney', country: 'Australia' },
]
const selected = new Slot<string>(() => 'paris')

rundom(
  <Flex vertical gap={8} align='start'>
    <Button>
      Choose a city
      <Dropdown
        values={cities}
        selected={selected}
        key='id'
        children={({ value, ...props }) => (
          <Option {...props} value={value}>
            {() => `${value.value.name}, ${value.value.country}`}
          </Option>
        )}
      />
    </Button>
    <Text>Selected: {() => selected.value ?? 'none'}</Text>
  </Flex>
)
```

## optionsProps
---

`optionsProps` forwards extra props to the inner [\<Options>](/ui/options) list, for the cases the dedicated props do not cover. The type excludes the selection props — `values`, `key`, `selected`, `size`, `multiple`, `onSelect` and `children` — because `<Dropdown>` sets them itself, and accepts the rest of the options props, such as `overflow`, `stable`, `padding`, `class` and `style`:

```tsx
//! View
//> optionsProps
//! Code
import { rundom, Button, Dropdown } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]
const selected = new Slot<string>(() => 'Banana')

rundom(
  <Button>
    Choose a fruit
    <Dropdown
      values={fruits}
      selected={selected}
      optionsProps={{ overflow: 'scroll' }}
    />
  </Button>
)
```

Here `overflow: 'scroll'` keeps the scrollbar visible even when the list fits, so the rows do not shift when the list starts to overflow. `stable: true` reserves the scrollbar gutter for the same reason.

## Placement
---

`placement` is inherited from [\<Popover>](/ui/popover#placement) and accepts a `side-alignment` pair. A drop-down usually fits the default `'auto-auto'`, which picks the side with the most free space, while a fixed side keeps the card above or below the trigger:

```tsx
//! View
//> placement
//! Code
import { rundom, Button, Dropdown, Flex } from 'rundom'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]

rundom(
  <Flex gap={8} wrap justify='center' padding={48}>
    <Button>
      Top start
      <Dropdown values={fruits} placement='top-start' />
    </Button>
    <Button>
      Bottom end
      <Dropdown values={fruits} placement='bottom-end' />
    </Button>
  </Flex>
)
```

## Controlled state
---

`opened` holds the open state and is inherited from the popover. When it is omitted, `<Dropdown>` keeps its own state. Pass a `Slot` to open the list from elsewhere or to read its state:

```tsx
//! View
//> controlled
//! Code
import { rundom, Button, Dropdown, Flex, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = [
  'Apple', 'Banana', 'Cherry', 'Dragon fruit',
  'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango',
]
const selected = new Slot<string>(() => 'Banana')
const opened = new Slot(() => false)
const openDropdown = () => opened.set(true)

rundom(
  <Flex vertical gap={8} align='start'>
    <Flex gap={8}>
      <Button onclick={openDropdown}>Open</Button>
      <Button>
        Choose a fruit
        <Dropdown values={fruits} selected={selected} opened={opened} />
      </Button>
    </Flex>
    <Text>Open: {() => String(opened.value)}</Text>
  </Flex>
)
```

A controlled dropdown still closes after a single-selection pick, so a `Slot` sees the write. If `opened` is a read-only observable instead, pass `onChangeOpened` to mirror the changes into your state.

## Theme
---

The default styles of `<Dropdown>` come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.

| Variable                     | Description                                            |
|------------------------------|--------------------------------------------------------|
| `RD_THEME_DROPDOWN`          | CSS of the component that is added to the page         |
| `RD_THEME_DROPDOWN__ROOT`    | Class name(s) of the card, always applied              |
| `RD_THEME_DROPDOWN__OPTIONS` | Class name(s) of the options list inside the card      |

The list keeps the options theme variables, including the row metrics used by virtualization; see [\<Options>](/ui/options#theme).

### Replacing the component

Set `RD_UI_DROPDOWN` to a module alias to replace the component implementation. The value is taken from the `Dropdown` export of that module:

```tsx
//! .env
RD_UI_DROPDOWN='@theme/dropdown'
//! theme/dropdown.tsx
import { DropdownComponent, DropdownProps } from 'rundom'

export function Dropdown (props: DropdownProps) {
  return <DropdownComponent {...props} data-testid='dropdown' />
}
```

## What's Next?
---

- Explore [\<Options>](/ui/options) for the selection list behind the dropdown
- Explore [\<Popover>](/ui/popover) for triggers, placement and nested cards
- Learn about [\<Option>](/ui/option) to customize the rows of the list
- Read about [\<Portal>](/portal) that keeps the card outside the parent layout
