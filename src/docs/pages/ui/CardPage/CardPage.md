# Card

The `<Card>` component is a bordered surface with rounded corners.
It is only the surface, so its content is assembled from separate parts and a card can contain only the parts it needs:

- `<Header>` renders an optional header above the body.
- `<Preview>` renders the dotted preview area.
- `<Body>` wraps the card body.
- `<CardTitle>` and `<Description>` set the body typography.

| Prop            | Type                               | Description                                                                                            |
|-----------------|------------------------------------|--------------------------------------------------------------------------------------------------------|
| [**children**](#children) | `JSX.Element`           | Content to render inside the card                                                                      |
| [**size**](#size) | `ObservableProp<SMLSize>`       | Sets the corner radius and the spacing inside `<Body>`. Available: `'s'`, `'m'` (default), `'l'` |
| [**clickable**](#clickable) | `ObservableProp<boolean>` | Shows a pointer cursor. Defaults to `true` when `onclick` is provided                                   |
| [**hoverable**](#hoverable) | `ObservableProp<boolean>` | Adds hover feedback with a subtle lift. Defaults to the value of `clickable`                           |
| [**width**](#width-and-height) | `ObservableProp<string \| number>` | Width of the card. Numbers are converted to pixels                                             |
| [**height**](#width-and-height) | `ObservableProp<string \| number>` | Height of the card. Numbers are converted to pixels                                           |
| **class**       | `string \| CardStyles`             | Additional CSS class(es) to apply to the root element                                                  |
| **style**       | `HTMLStyleProp`                    | Inline styles to apply to the root element                                                             |

In addition to the props listed above, `<Card>` accepts all props inherited from `<Flex>`, including `element`, `href`, `gap`, `padding`, and event handlers. When `element` is set to `'a'`, the card also accepts `<Link>` props such as `exact`.

`<Header>`, `<Preview>`, `<Body>`, and `<CardTitle>` accept all `<Flex>` props. `<Description>` accepts all `<Text>` props.

## Children
---

`<Card>` renders its children directly.
Use it for simple content, or compose the card from `<Preview>` and `<Body>` when you need the preview area and a padded body:

```tsx
//! View
//> children
//! Code
import { rundom, Card } from 'rundom'

rundom(
  <Card>
    Card content goes here.
  </Card>
)
```

## Content
---

`<Body>` wraps the card body and applies the themed padding and gap.
It inherits from `<Flex>`, so its layout can be adjusted with Flex props:

```tsx
//! View
//> content
//! Code
import { rundom, Card, Content } from 'rundom'

rundom(
  <Card>
    <Body>
      Card content goes here.
    </Body>
  </Card>
)
```

## Preview
---

Add `<Preview>` above the body to render the dotted preview area.
It accepts any content and all `<Flex>` props:

```tsx
//! View
//> preview
//! Code
import { 
  rundom,
  Card,
  Content,
  Preview,
  CardTitle,
  Description,
  SearchIcon
} from 'rundom'

rundom(
  <Card width={220}>
    <Preview>
      <SearchIcon size={24} />
    </Preview>
    <Content vertical>
      <CardTitle>Search</CardTitle>
      <Description>Find anything in the documentation.</Description>
    </Body>
  </Card>
)
```

## Header
---

Add `<Header>` above the body to render a semantic `<header>` with the themed header styles.
It accepts all `<Flex>` props:

```tsx
//! View
//> header
//! Code
import { rundom, Card, Content, Header, Description } from 'rundom'

rundom(
  <Card width={260}>
    <Header>
      Card header
    </Header>
    <Content vertical>
      <Description>Card content goes here.</Description>
    </Body>
  </Card>
)
```

## Size
---

The `size` prop changes the corner radius and the spacing inside `<Body>`:

```tsx
//! View
//> size
//! Code
import { rundom, Card, Content, Preview, CardTitle, CopyIcon, Flex, SearchIcon, SunIcon } from 'rundom'

rundom(
  <Flex gap={16} align='center' wrap>
    <Card size='s' width={180}>
      <Preview>
        <SunIcon size={20} />
      </Preview>
      <Body>
        <CardTitle>Small</CardTitle>
      </Body>
    </Card>
    <Card size='m' width={220}>
      <Preview>
        <CopyIcon size={24} />
      </Preview>
      <Body>
        <CardTitle>Medium</CardTitle>
      </Body>
    </Card>
    <Card size='l' width={260}>
      <Preview>
        <SearchIcon size={28} />
      </Preview>
      <Body>
        <CardTitle>Large</CardTitle>
      </Body>
    </Card>
  </Flex>
)
```

## Clickable
---

Pass an `onclick` handler to make the card clickable.
`clickable` defaults to `true` when `onclick` is provided, which also enables `hoverable`.
The example sets `clickable` explicitly for clarity:

```tsx
//! View
//> clickable
//! Code
import { rundom, Card, Content, CardTitle, Description } from 'rundom'

const handleOpen = () => alert('Card clicked')

rundom(
  <Card width={220} onclick={handleOpen}>
    <Content vertical>
      <CardTitle>Open</CardTitle>
      <Description>Click the card to trigger the handler.</Description>
    </Body>
  </Card>
)
```

## Hoverable
---

`hoverable` adds hover feedback: a different border color, a shadow, and a subtle lift.
It defaults to `clickable`, so interactive cards get it automatically.
Set it on a card without a click handler to keep the hover effect only:

```tsx
//! View
//> hoverable
//! Code
import { rundom, Card, Content, Preview, CardTitle, Description, SunIcon } from 'rundom'

rundom(
  <Card hoverable width={220}>
    <Preview>
      <SunIcon size={24} />
    </Preview>
    <Content vertical>
      <CardTitle>Hoverable</CardTitle>
      <Description>Hover the card to see the lift.</Description>
    </Body>
  </Card>
)
```

## Width and Height
---

`width` and `height` accept numbers or CSS strings.
Numbers are converted to pixels, while strings are used as-is:

```tsx
//! View
//> width
//! Code
import { rundom, Card, Content } from 'rundom'

rundom(
  <Card width={120} height={120}>
    <Body>
      Card content goes here.
    </Body>
  </Card>
)
```

## Link
---

Use `element='a'` with `href` to render a navigable card.
The card then accepts `<Link>` props such as `exact`, and internal links use client-side navigation:

```tsx
//! View
//> link
//! Code
import { rundom, Card, Content, Preview, CardTitle, Description, SearchIcon } from 'rundom'

rundom(
  <Card element='a' href='/ui/components' hoverable width={220}>
    <Preview>
      <SearchIcon size={24} />
    </Preview>
    <Content vertical>
      <CardTitle>Components</CardTitle>
      <Description>Browse all components from a single page.</Description>
    </Body>
  </Card>
)
```

## Theme
---

The default styles of `<Card>` and its parts come from the theme and are configured with environment variables:

| Variable                        | Description                                          |
|---------------------------------|------------------------------------------------------|
| `RD_THEME_CARD`                 | CSS of the card that is added to the page            |
| `RD_THEME_CARD__ROOT`           | Class name(s) of the card, always applied            |
| `RD_THEME_CARD__S`              | Applied when `size` is `'s'`                         |
| `RD_THEME_CARD__M`              | Applied when `size` is `'m'`                         |
| `RD_THEME_CARD__L`              | Applied when `size` is `'l'`                         |
| `RD_THEME_CARD__CLICKABLE`      | Applied when `clickable` is `true`                   |
| `RD_THEME_CARD__HOVERABLE`      | Applied when `hoverable` is `true`                   |
| `RD_THEME_CARD_HEADER`          | CSS of the header that is added to the page          |
| `RD_THEME_CARD_HEADER__ROOT`    | Class name(s) of the header, always applied          |
| `RD_THEME_CARD_PREVIEW`         | CSS of the preview area that is added to the page    |
| `RD_THEME_CARD_PREVIEW__ROOT`   | Class name(s) of the preview area, always applied    |
| `RD_THEME_CARD_CONTENT`         | CSS of the content area that is added to the page    |
| `RD_THEME_CARD_CONTENT__ROOT`   | Class name(s) of the content area, always applied    |
| `RD_THEME_CARD_TITLE`           | CSS of the card title that is added to the page      |
| `RD_THEME_CARD_TITLE__ROOT`     | Class name(s) of the card title, always applied      |

### Replacing the component

Set `RD_UI_CARD` to a module alias, and `<Card>` will be taken from the `Card` export of that module:

```tsx
//! .env
RD_UI_CARD='@theme/card'
//! theme/card.tsx
import { CardComponent, CardProps } from 'rundom'

export function Card (props: CardProps) {
  return <CardComponent {...props} data-testid='card' />
}
```

## What's Next?
---

- Explore the [\<Flex>](/ui/flex) component for layout inside and around cards
- Use [\<Text>](/ui/text) to style text content
- Add [\<Button>](/ui/button) for actions inside a card
- Discover available [\<Icons>](/ui/icons) for preview illustrations
