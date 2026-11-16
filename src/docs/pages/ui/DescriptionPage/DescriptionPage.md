# Description

`<Description>` renders muted small text for captions and secondary explanations.
It is a preset of [\<Text>](/ui/text): `color='muted'` and `size='xs'` by default, both overridable.

| Prop         | Type                                       | Description                                  |
|--------------|--------------------------------------------|----------------------------------------------|
| [**color**](#color) | `ObservableProp<TextColor>`        | Text color; defaults to `'muted'`            |
| [**size**](#size) | `ObservableProp<TextSize>`           | Font size; defaults to `'xs'`                |
| **children** | `JSX.Element`                              | Description text                             |

`<Description>` also accepts every other [\<Text>](/ui/text) prop and all standard `<span>` attributes.

## Basic usage
---

Use `<Description>` under a title to add a short explanation:

```tsx
//! View
//> basic
//! Code
import { rundom, Description, Flex, Title } from 'rundom'

rundom(
  <Flex vertical gap={2}>
    <Title depth={3}>Rundom UI</Title>
    <Description>Components for reactive DOM applications.</Description>
  </Flex>
)
```

## Color
---

The default `'muted'` color keeps the description visually secondary. Pass another [\<Text>](/ui/text) color when the context requires it.

```tsx
import { Description } from 'rundom'

<Description color='danger'>This action cannot be undone.</Description>
```

## Size
---

The default `'xs'` size is small enough for captions. Pass any text size to match the surrounding typography.

```tsx
import { Description, Flex } from 'rundom'

<Flex vertical gap={4}>
  <Description size='m'>A larger description for a prominent section.</Description>
  <Description size='l'>An even larger caption.</Description>
</Flex>
```

## Theme
---

The default styles of `<Description>` come from the theme and are configured with environment variables:

| Variable                          | Description                                       |
|-----------------------------------|---------------------------------------------------|
| `RD_THEME_DESCRIPTION`            | CSS of the component that is added to the page    |
| `RD_THEME_DESCRIPTION__ROOT`      | Class name(s) of the root element, always applied |

### Replacing the component

Set `RD_UI_DESCRIPTION` to a module alias, and `<Description>` will be taken from the `Description` export of that module:

```tsx
//! .env
RD_UI_DESCRIPTION='@theme/description'
//! theme/description.tsx
import { DescriptionComponent, DescriptionProps } from 'rundom'

export function Description (props: DescriptionProps) {
  return <DescriptionComponent {...props} data-testid='description' />
}
```

## What's Next?
---

- Learn about [\<Text>](/ui/text) for the full set of text props
- Explore [\<Eyebrow>](/ui/eyebrow) for short labels above headings
- Read about [\<Typography>](/ui/typography) for content styles
