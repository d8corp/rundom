# Field

`<Field>` is a label-like container for form controls. It is built on [\<Box>](/ui/box) and renders optional content before and after the main content, plus a text label.

| Prop         | Type                         | Description                                            |
|--------------|------------------------------|--------------------------------------------------------|
| [**size**](#size) | `ObservableProp<SMLSize>` | Field size; mapped to a larger box size internally  |
| [**label**](#label) | `ObservableProp<string>` | Text label rendered after the content               |
| [**before**](#before-and-after) | `JSXElement`    | Content before the main content, usually an icon      |
| [**after**](#before-and-after) | `JSXElement`     | Content after the main content, usually an icon       |
| **children** | `JSX.Element`                | Main content of the field                              |

`<Field>` inherits all [\<Box>](/ui/box) and [\<Flex>](/ui/flex) props such as `color`, `view`, `interact`, `gap` and `padding`.

## Basic usage
---

```tsx
//! View
//> basic
//! Code
import { rundom, Field } from 'rundom'

rundom(
  <Field label='Name'>Jane Doe</Field>
)
```

## Size
---

The `size` prop accepts `'s'`, `'m'` and `'l'`. It is mapped to a larger box size, so the field stays comfortable around its content.

```tsx
import { Field, Flex } from 'rundom'

<Flex vertical gap={8}>
  <Field size='s'>Small field</Field>
  <Field size='m'>Medium field</Field>
  <Field size='l'>Large field</Field>
</Flex>
```

## Label
---

`label` renders the text after the main content. For a floating label above an input, use [\<Input>](/ui/input), which composes `<Field>` with a native input.

```tsx
import { Field } from 'rundom'

<Field label='Name'>Jane Doe</Field>
```

## Before and After
---

`before` and `after` accept any JSX and are placed on the sides of the main content. They are typically used for icons or action buttons.

```tsx
import { CloseIcon, Field, SearchIcon } from 'rundom'

<Field before={<SearchIcon />} after={<CloseIcon />} label='Search'>
  Components
</Field>
```

## Theme
---

The default styles of `<Field>` come from the theme and are configured with environment variables:

| Variable                     | Description                                       |
|------------------------------|---------------------------------------------------|
| `RD_THEME_FIELD`             | CSS of the component that is added to the page    |
| `RD_THEME_FIELD__ROOT`       | Class name(s) of the root element, always applied |
| `RD_THEME_FIELD__LABEL`      | Class name(s) of the label                        |
| `RD_THEME_FIELD__CONTENT`    | Class name(s) of the content wrapper              |

### Replacing the component

Set `RD_UI_FIELD` to a module alias, and `<Field>` will be taken from the `Field` export of that module:

```tsx
//! .env
RD_UI_FIELD='@theme/field'
//! theme/field.tsx
import { FieldComponent, FieldProps } from 'rundom'

export function Field (props: FieldProps) {
  return <FieldComponent {...props} data-testid='field' />
}
```

## What's Next?
---

- Learn about [\<Input>](/ui/input) built on top of `<Field>`
- Explore [\<Box>](/ui/box) for surface styling
- Read about [\<Button>](/ui/button) for side actions
