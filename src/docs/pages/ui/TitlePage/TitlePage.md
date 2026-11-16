# Title

`<Title>` renders a heading from `<h1>` to `<h6>` and can also update the browser tab title.

| Prop         | Type            | Description                                                       |
|--------------|-----------------|-------------------------------------------------------------------|
| [**depth**](#depth) | `TitleDepth` | Heading level from `1` to `6`; defaults to `1`                 |
| [**title**](#title) | `string`     | Heading text; when set, it is also written to `document.title` |
| **children** | `JSX.Element`   | Custom heading content; used when `title` is omitted              |

## Basic usage
---

Create headings with the `depth` prop:

```tsx
//! View
//> basic
//! Code
import { rundom, Flex, Title } from 'rundom'

rundom(
  <Flex vertical gap={4}>
    <Title depth={1}>Heading 1</Title>
    <Title depth={2}>Heading 2</Title>
    <Title depth={3}>Heading 3</Title>
  </Flex>
)
```

## Depth
---

`depth` selects the rendered tag and its typographic style. Use one `<Title depth={1}>` per page and keep the following levels in order.

```tsx
import { Flex, Title } from 'rundom'

<Flex vertical gap={4}>
  <Title depth={1}>Heading 1</Title>
  <Title depth={2}>Heading 2</Title>
  <Title depth={6}>Heading 6</Title>
</Flex>
```

## Title
---

When `title` is provided it becomes the content of the heading and is assigned to `document.title`. Use `children` instead when the heading contains markup and should not change the document title.

```tsx
import { Title } from 'rundom'

<Title depth={1} title='Getting Started' />

// keeps document.title unchanged
<Title depth={2}>
  Getting <strong>Started</strong>
</Title>
```

## Theme
---

The default styles of `<Title>` come from the theme and are configured with environment variables:

| Variable                   | Description                                       |
|----------------------------|---------------------------------------------------|
| `RD_THEME_TITLE`           | CSS of the component that is added to the page    |
| `RD_THEME_TITLE__ROOT`     | Class name(s) of the root element, always applied |

### Replacing the component

Set `RD_UI_TITLE` to a module alias, and `<Title>` will be taken from the `Title` export of that module:

```tsx
//! .env
RD_UI_TITLE='@theme/title'
//! theme/title.tsx
import { TitleComponent, TitleProps } from 'rundom'

export function Title (props: TitleProps) {
  return <TitleComponent {...props} data-testid='title' />
}
```

## What's Next?
---

- Explore [\<Typography>](/ui/typography) for the surrounding content styles
- Learn about [\<Eyebrow>](/ui/eyebrow) for labels above headings
- Read about [\<Description>](/ui/description) for secondary text
