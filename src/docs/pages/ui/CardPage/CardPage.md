# Card

The `<Card>` component is a bordered surface with rounded corners.
Its content is assembled from separate components, so a card can contain only the parts it needs:

- `<CardPreview>` renders the dotted preview area.
- `<CardInfo>` wraps the card body.
- `<CardTitle>` and `<Description>` set the body typography.

| Prop            | Type                            | Description                                                                       |
|-----------------|---------------------------------|-----------------------------------------------------------------------------------|
| **size**        | `ObservableProp<SMLSize>`       | Sets the corner radius. Available: `'s'`, `'m'` (default), `'l'`                  |
| **interactive** | `ObservableProp<boolean>`       | Adds hover and focus states with a subtle lift (default: `false`)                 |
| **clickable**   | `ObservableProp<boolean>`       | Shows a pointer cursor. Defaults to `true` when `onclick` is provided             |
| **width**       | `ObservableProp<string \| number>` | Width of the card. Numbers are converted to pixels                             |
| **height**      | `ObservableProp<string \| number>` | Height of the card. Numbers are converted to pixels                            |
| **class**       | `string \| CardStyles`          | Additional CSS class(es) to apply to the root element                             |

In addition to the props listed above, `<Card>` accepts all props inherited from `<Flex>`, including `element`, `href`, `gap`, `padding`, and event handlers.

`<CardPreview>`, `<CardInfo>`, and `<CardTitle>` also accept all `<Flex>` props. `<Description>` accepts all `<Text>` props.

## Basic usage
---

Assemble a card from the body parts:

```tsx
//! View
//> basic
//! Code
import { rundom, Card, CardInfo, CardTitle, Description } from 'rundom'

rundom(
  <Card style={{ width: '220px' }}>
    <CardInfo>
      <CardTitle>Card title</CardTitle>
      <Description>Card content goes here.</Description>
    </CardInfo>
  </Card>
)
```

## Preview
---

Add `<CardPreview>` to place content above the card body:

```tsx
//! View
//> preview
//! Code
import { rundom, Card, CardInfo, CardPreview, CardTitle, Description, SearchIcon } from 'rundom'

rundom(
  <Card style={{ width: '220px' }}>
    <CardPreview>
      <SearchIcon size={24} />
    </CardPreview>
    <CardInfo>
      <CardTitle>Search</CardTitle>
      <Description>Find anything in the documentation.</Description>
    </CardInfo>
  </Card>
)
```

## Size
---

The `size` prop only changes the corner radius:

```tsx
//! View
//> sizes
//! Code
import { rundom, Card, CardInfo, CardPreview, CardTitle, CopyIcon, Flex, SearchIcon, SunIcon } from 'rundom'

rundom(
  <Flex gap={16} wrap>
    <Card size='s' style={{ width: '180px' }}>
      <CardPreview>
        <SunIcon size={20} />
      </CardPreview>
      <CardInfo>
        <CardTitle>Small</CardTitle>
      </CardInfo>
    </Card>
    <Card size='m' style={{ width: '220px' }}>
      <CardPreview>
        <CopyIcon size={24} />
      </CardPreview>
      <CardInfo>
        <CardTitle>Medium</CardTitle>
      </CardInfo>
    </Card>
    <Card size='l' style={{ width: '260px' }}>
      <CardPreview>
        <SearchIcon size={28} />
      </CardPreview>
      <CardInfo>
        <CardTitle>Large</CardTitle>
      </CardInfo>
    </Card>
  </Flex>
)
```

## Interactive
---

Set `interactive` to add hover and focus feedback:

```tsx
//! View
//> interactive
//! Code
import { rundom, Card, CardInfo, CardPreview, CardTitle, Description, SunIcon } from 'rundom'

rundom(
  <Card interactive clickable style={{ width: '220px' }}>
    <CardPreview>
      <SunIcon size={24} />
    </CardPreview>
    <CardInfo>
      <CardTitle>Interactive</CardTitle>
      <Description>Hover or focus the card to see the state.</Description>
    </CardInfo>
  </Card>
)
```

## Link
---

Use `element='a'` with `href` to render a navigable card:

```tsx
//! View
//> link
//! Code
import { rundom, Card, CardInfo, CardPreview, CardTitle, Description, SearchIcon } from 'rundom'

rundom(
  <Card element='a' href='/ui/overview' interactive style={{ width: '220px' }}>
    <CardPreview>
      <SearchIcon size={24} />
    </CardPreview>
    <CardInfo>
      <CardTitle>Overview</CardTitle>
      <Description>Browse all components from a single page.</Description>
    </CardInfo>
  </Card>
)
```
