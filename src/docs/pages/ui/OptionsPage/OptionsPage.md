# Options

`<Options>` is a virtualized selection list. It renders only the rows that fit the viewport, so a list of thousands of values scrolls smoothly, and it keeps the scrollbar styling of [\<Scrollbar>](/ui/scrollbar).

Every entry in `values` is rendered as an [\<Option>](/ui/option) by default. The list supports single and multiple selection, controlled and uncontrolled usage, and a custom row renderer. Virtualization measures the scroll container, so the list needs a bounded height — an explicit `height`, the `flex` prop inside a sized parent, or any other layout that constrains it.

**Extends: [\<Scrollbar>](/ui/scrollbar)**

| Prop                                | Type                                          | Description                                                       |
|-------------------------------------|-----------------------------------------------|-------------------------------------------------------------------|
| [**values**](#values)               | `ObservableProp<V[]>`                         | Values to display; every value becomes a row                      |
| [**selected**](#selected)           | `ObservableProp<GetOptionValue<V, M, K>>`     | Selection: a single value, or an array when `multiple` is `true`  |
| [**multiple**](#multiple-selection) | `ObservableProp<M>`                           | Allows selecting several values at once                           |
| [**onSelect**](#onselect)           | `(selected: GetOptionValue<V, M, K>) => void` | Called after the selection changes                                |
| [**children**](#children)           | `RenderOption<V>`                             | Replaces the default row renderer                                 |
| [**size**](#size)                   | `ObservableProp<SMLSize>`                     | Row size: `'s'`, `'m'` (default), or `'l'`                        |
| [**key**](#key)                     | `ForKey<V[]>`                                 | Row identity for the internal `<For>`: a field name or a function |

In addition to the props listed above, `<Options>` accepts all [\<Scrollbar>](/ui/scrollbar) and [\<Flex>](/ui/flex) props, including `style`, `class`, and native element attributes.

## Values
---

`values` is the data source of the list: every entry becomes a row, and the rows keep the order of the array. The default [\<Option>](/ui/option) renders string values as text.

```tsx
//! View
//> baseValues
//! Code
import { rundom, Options } from 'rundom'

rundom(
  <Options
    values={['Apple', 'Banana', 'Cherry']}
  />
)
```

The prop is reactive like any other `ObservableProp`, so a plain array, a getter, or a `Slot` works. When the array changes, the list keeps the rows of the values that are still present and applies only the additions and removals:

```tsx
//! View
//> values
//! Code
import { rundom, Button, Flex, Options } from 'rundom'
import { Slot } from 'rune-hub'

const values = new Slot<string[]>(() => ['Apple', 'Banana', 'Cherry'])

const addValue = () => values.set([
  ...values.raw,
  `Fruit ${values.raw.length + 1}`,
])

rundom(
  <Flex vertical gap={8} align='start'>
    <Options
      values={values}
      style={{ height: '128px', width: '220px' }}
    />
    <Button size='s' onclick={addValue}>
      Add value
    </Button>
  </Flex>
)
```

An empty array renders an empty list. Values can also be objects — render the fields you need with `children` and tell the rows apart with `key`, as described in [Key](#key). The list virtualizes any array, so `values` may contain thousands of entries; see [Virtualization](#virtualization).

## Selected
---

`selected` controls the selection. It holds one value in single-selection mode and an array when `multiple` is `true`. The prop is reactive, so a `Slot` can both drive the selection and receive clicks:

```tsx
//! View
//> selected
//! Code
import { rundom, Flex, Options, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit']
const selected = new Slot<string>(() => 'Banana')

rundom(
  <Flex vertical gap={8}>
    <Options
      values={fruits}
      selected={selected}
      style={{ height: '180px', width: '220px' }}
    />
    <Text>Selected: {() => selected.value ?? 'none'}</Text>
  </Flex>
)
```

Clicking a row updates the slot. If `selected` is omitted, the list keeps the selection in an internal slot. If it is a fixed value or a getter, the list is controlled: clicks do not change it until `onSelect` updates the source, as described in [onSelect](#onselect). When `key` is set, the selection holds the key value; see [Key](#key).

## Multiple selection
---

Set `multiple` to allow selecting several values at once. `selected` then holds an array, and clicking a row adds its value to the array or removes it:

```tsx
//! View
//> multiple
//! Code
import { rundom, Flex, Options, Text } from 'rundom'
import { Slot } from 'rune-hub'

const frameworks = ['Angular', 'React', 'Svelte', 'Vue']
const selected = new Slot<string[]>(() => ['React', 'Vue'])

rundom(
  <Flex vertical gap={8}>
    <Options
      values={frameworks}
      selected={selected}
      multiple
      style={{ height: '180px', width: '220px' }}
    />
    <Text>Selected: {() => selected.value.join(', ') || 'none'}</Text>
  </Flex>
)
```

Without `selected`, the list starts with an empty array and keeps it up to date internally. `onSelect` receives the same array after every click.

## onSelect
---

`onSelect` receives the next selection after a row click: one value, or an array when `multiple` is `true`. Use it to mirror the selection into other state or to apply changes when `selected` is controlled:

```tsx
//! View
//> onSelect
//! Code
import { rundom, Flex, Options, Text } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango']
const lastSelected = new Slot<string>(() => 'none')
const handleSelect = (value: string) => lastSelected.set(value)

rundom(
  <Flex vertical gap={8}>
    <Options
      values={fruits}
      size='s'
      onSelect={handleSelect}
      style={{ height: '140px', width: '220px' }}
    />
    <Text>Last selected: {() => lastSelected.value}</Text>
  </Flex>
)
```

The list still tracks the selection internally when `selected` is omitted. When `selected` is a `Slot`, it is updated first and then `onSelect` is called with the same value.

## Children
---

Pass a renderer as `children` to replace the default `<Option>`. It receives the row props: `value`, `selected`, `size`, and `onclick`. `value` is a reactive slot, so read it inside a reactive child. Spread the props into `<Option>` to keep selection working:

```tsx
//! View
//> children
//! Code
import { rundom, Option, Options } from 'rundom'
import { Slot } from 'rune-hub'

const values = ['One', 'Two', 'Three']
const selected = new Slot<string>(() => 'One')

rundom(
  <Options
    values={values}
    selected={selected}
    children={({ value, ...props }) => (
      <Option {...props} value={value}>
        {() => value.value.toUpperCase()}
      </Option>
    )}
    style={{ height: '180px', width: '220px' }}
  />
)
```

The renderer may also be passed as a JSX child; both forms receive the same props.

## Size
---

`size` changes the row metrics and typography. It accepts `'s'`, `'m'` (default), and `'l'`:

```tsx
//! View
//> size
//! Code
import { rundom, Flex, Options } from 'rundom'
import { Slot } from 'rune-hub'

const fruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango']
const selected = new Slot<string>(() => 'Banana')

rundom(
  <Flex gap={16} wrap>
    <Options values={fruits} selected={selected} size='s' style={{ height: '140px', width: '160px' }} />
    <Options values={fruits} selected={selected} size='m' style={{ height: '140px', width: '160px' }} />
    <Options values={fruits} selected={selected} size='l' style={{ height: '140px', width: '160px' }} />
  </Flex>
)
```

Virtualization uses these metrics, so the row height and gap in the theme must match `RD_UI_OPTIONS__*` and `RD_UI_OPTIONS__GAP_*`; see [Virtualization](#virtualization) and [Theme](#theme).

## Key
---

`key` tells the internal [\<For>](/for) how to identify a row. Pass a field name such as `'id'` or a function that receives the item. With objects, this keeps rows stable when the array is replaced by new instances that carry the same key:

```tsx
//! View
//> key
//! Code
import { rundom, Flex, Option, Options, Text } from 'rundom'
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
  <Flex vertical gap={8}>
    <Options
      values={cities}
      selected={selected}
      key='id'
      children={({ value, ...props }) => (
        <Option {...props} value={value}>
          {() => `${value.value.name}, ${value.value.country}`}
        </Option>
      )}
      style={{ height: '180px', width: '220px' }}
    />
    <Text>Selected: {() => selected.value ?? 'none'}</Text>
  </Flex>
)
```

The key also defines the selection type: with `key='id'`, `selected` and `onSelect` work with ids, not with the objects. Without `key`, values are compared by reference, so keep the initial selection as an item from `values`.

## Virtualization
---

Only the visible part of `values` is rendered. Rows outside the viewport are removed from the DOM, so scrolling a large list stays cheap:

```tsx
//! View
//> virtualization
//! Code
import { rundom, Options } from 'rundom'

const values = [...new Array(100_000)].map((_, index) => `Item ${index + 1}`)

rundom(
  <Options
    values={values}
    style={{ height: '180px', width: '220px' }}
  />
)
```

Virtualization measures the scroll container, so the list needs a bounded height: an explicit `height`, the `flex` prop inside a sized parent, or another layout that constrains it. The scroll range is calculated from the row metrics, so keep the theme values in sync with `RD_UI_OPTIONS__*` and `RD_UI_OPTIONS__GAP_*`.

## Theme
---

The default styles of the list come from the theme and are configured with environment variables. Every variable is optional — set only the ones you need.

| Variable                    | Description                                          |
|-----------------------------|------------------------------------------------------|
| `RD_THEME_OPTIONS`          | CSS of the options list that is added to the page    |
| `RD_THEME_OPTIONS__ROOT`    | Class name(s) of the list, always applied            |
| `RD_THEME_OPTIONS__OPTIONS` | Class name(s) of the inner rows container            |
| `RD_THEME_OPTIONS__S`       | Class name(s) applied when `size` is `'s'`           |
| `RD_THEME_OPTIONS__M`       | Class name(s) applied when `size` is `'m'`           |
| `RD_THEME_OPTIONS__L`       | Class name(s) applied when `size` is `'l'`           |

The row height comes from `RD_UI_OPTIONS__S`, `RD_UI_OPTIONS__M`, and `RD_UI_OPTIONS__L`, and the gap from `RD_UI_OPTIONS__GAP_S`, `RD_UI_OPTIONS__GAP_M`, and `RD_UI_OPTIONS__GAP_L`. Virtualization uses these values, so they must match the actual row metrics in the theme; otherwise the scroll range and the rendered rows drift apart.

### Replacing the component

Set `RD_UI_OPTIONS` to a module alias to replace the list implementation. The value is taken from the `Options` export of that module:

```tsx
//! .env
RD_UI_OPTIONS='@theme/options'
//! theme/options.tsx
import { OptionsComponent, OptionsProps } from 'rundom'

export function Options (props: OptionsProps) {
  return <OptionsComponent {...props} data-testid='options' />
}
```

## What's Next?
---

- Explore [\<Option>](/ui/option) to customize individual rows
- Explore [\<Scrollbar>](/ui/scrollbar) for scroll behavior
- Learn about [\<For>](/for) and the reconciliation used by the list
