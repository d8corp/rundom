# Input

`<Input>` is a text input built on [\<Field>](/ui/field) with a native `<input>` inside.
It supports reactive values, a clear button, autofocus and debounced updates.

| Prop           | Type                                | Description                                                     |
|----------------|-------------------------------------|-----------------------------------------------------------------|
| [**value**](#value) | `ObservableProp<T>`           | Current input value                                             |
| [**inputRef**](#inputref) | `HTMLRef<'input'>`      | Reference to the underlying native input                        |
| **name**       | `ObservableProp<string>`            | Native input name used by forms                                 |
| [**placeholder**](#placeholder) | `ObservableProp<string>` | Placeholder text of the native input                   |
| [**clearable**](#clearable) | `ObservableProp<boolean>` | Shows a clear button while the input has a value             |
| [**autofocus**](#autofocus) | `boolean \| number \| InputFocusOptions` | Focuses the input after mount, optionally after a delay |
| [**debounce**](#debounce) | `ObservableProp<boolean \| number>` | Debounces value updates, `true` uses the default delay  |
| [**onChange**](#onchange) | `(newValue: string) => void` | Called with the new value after input or debounce              |

`<Input>` also accepts the [\<Field>](/ui/field) props `size`, `label`, `before` and `after`, plus all [\<Box>](/ui/box) props.

## Basic usage
---

```tsx
//! View
//> basic
//! Code
import { rundom, Flex, Input } from 'rundom'
import { Slot } from 'rune-hub'

const value = new Slot(() => '')

rundom(
  <Flex vertical gap={8}>
    <Input value={value} placeholder='Type something' />
    <Input value={value} clearable label='Clearable' />
  </Flex>
)
```

## Value
---

Pass a `Slot`, a function or a plain string. With a reactive value the native input is kept in sync without re-rendering the component.

```tsx
import { Input } from 'rundom'
import { Slot } from 'rune-hub'

const value = new Slot(() => 'Hello')

<Input value={value} />
<Input value='Static value' />
```

## Placeholder
---

`placeholder` is forwarded to the native input and accepts a reactive value.

```tsx
import { Input } from 'rundom'
import { Slot } from 'rune-hub'

const hint = new Slot(() => 'Search components...')

<Input placeholder={hint} />
```

## Clearable
---

`clearable` adds a close icon after the input. Clicking it clears the value through the same `value`/`onChange` channel.

```tsx
import { Input } from 'rundom'
import { Slot } from 'rune-hub'

const value = new Slot(() => 'Clear me')

<Input value={value} clearable />
```

## Autofocus
---

`autofocus={true}` focuses the input immediately after mount. A number delays focusing by that many milliseconds, and `{ timeout, preventScroll, focusVisible }` accepts the full `FocusOptions` set.

```tsx
import { Input } from 'rundom'

<Input autofocus />
<Input autofocus={300} />
<Input autofocus={{ timeout: 300, preventScroll: true, focusVisible: true }} />
```

## Debounce
---

`debounce` limits how often the value is written. `true` uses a short default delay, a number sets the delay in milliseconds. Useful for search fields that trigger requests.

```tsx
import { Input } from 'rundom'

const search = (value: string) => console.log('search:', value)

<Input debounce={300} onChange={search} placeholder='Search...' />
```

## OnChange
---

`onChange` receives the new string value. It works together with `value`, so the input can be controlled or uncontrolled.

```tsx
import { Input } from 'rundom'
import { Slot } from 'rune-hub'

const value = new Slot(() => '')
const handleChange = (next: string) => value.set(next)

<Input value={value} onChange={handleChange} />
```

## InputRef
---

`inputRef` is a `Ref<HTMLInputElement>` that points to the native input after mount.

```tsx
import { Input, Ref } from 'rundom'

const inputRef = new Ref<HTMLInputElement>()
const focusInput = () => inputRef.value?.focus()

<>
  <Input inputRef={inputRef} />
  <button onclick={focusInput}>Focus input</button>
</>
```

## Theme
---

The default styles of `<Input>` come from the theme and are configured with environment variables:

| Variable                         | Description                                       |
|----------------------------------|---------------------------------------------------|
| `RD_THEME_INPUT`                 | CSS of the component that is added to the page    |
| `RD_THEME_INPUT__ROOT`           | Class name(s) of the root element, always applied |
| `RD_THEME_INPUT__CLEAR`          | Class name(s) of the clear button                 |
| `RD_THEME_INPUT__INPUT`          | Class name(s) of the native input                 |

### Replacing the component

`<Input>` can be wrapped through the `RD_THEME__TRANSFORM__INPUT` theme module, which receives `InputComponent` and must return a component:

```tsx
//! .env
RD_THEME__TRANSFORM__INPUT='@theme/input'
//! theme/input.tsx
import { InputComponent, InputProps } from 'rundom'

export default function transform (Input: typeof InputComponent) {
  return function InputWithTestId (props: InputProps) {
    return <Input {...props} data-testid='input' />
  }
}
```

## What's Next?
---

- Learn about [\<Field>](/ui/field) for the container and label
- Explore [\<CheckBox>](/ui/check-box), [\<RadioBox>](/ui/radio-box) and [\<Toggle>](/ui/toggle) for other controls
- Read about [\<Options>](/ui/options) for list selection
