# Link

Use the `<Link>` component to create links.
It behaves like an HTML `<a>` tag but uses the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) for internal navigation.
For external links, it automatically adds `rel="noopener noreferrer nofollow"` and `target="_blank"` attributes.

| Prop         | Type                                                 | Description                                                    |
|--------------|------------------------------------------------------|----------------------------------------------------------------|
| [**href**](#href) | `string`                                   | URL or path the link navigates to                              |
| [**target**](#target) | `'_blank'` \| `'_parent'` \| `'_self'` \| `'_top'` | The target attribute for the link                    |
| [**scroll**](#scroll) | `'after'` \| `'before'` \| `'none'`    | Controls scroll behavior on navigation                         |
| [**scrollTo**](#scrollto) | `number` \| `string`               | Position or selector to scroll to after navigation             |
| [**replace**](#replace) | `boolean`                          | Replace the current history entry instead of pushing a new one |
| [**exact**](#exact) | `boolean`                              | Match the path exactly instead of by prefix                    |
| [**transition**](#transition) | `boolean`                      | Wraps navigation in a view transition                          |
| [**disabled**](#disabled) | `ObservableProp<boolean>`          | Prevents navigation and removes `href`                         |
| [**class**](#class) | `string` \| `{ root: string, active: string }` | CSS class(es) for the link and its active state          |
| [**children**](#children) | `JSX.Element`                      | Content to render inside the link                              |

## href
---

If `href` starts from `/`, `?` or `#` then the Link will use [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).

```tsx
import { Link, Router, createRouting } from 'rundom'

const routing = createRouting([
  { index: true, component: () => 'Home Page' },
  { index: true, path: 'test', component: () => 'Test Page' },
  { component: () => '404' },
])

export const Content = () => (
  <div>
    <Link href="/">home</Link>
    <Link href="/test">test</Link>
    <Link href="/home">unknown</Link>
    <div>
      <Router routing={routing} />
    </div>
  </div>
)
```

## replace
---

By default, it pushes to history, but you may use `replace` to replace current history state.

```tsx
<Link replace href="/">
  home
</Link>
```

## class
---

You can add root or active link class

```tsx
import { Link } from 'rundom'

const classes = {
  root: 'link',
  active: 'active',
}

export const Content = () => (
  <div>
    <Link href='/' class='only-root'>
      home
    </Link>
    <Link href='/test' class={classes}>
      test
    </Link>
  </div>
)
```

You can use all features from [html-classes](https://www.npmjs.com/package/html-classes) for the `class` prop.

```tsx
import { Link } from 'rundom'

const classes = {
  root: ['link1', 'link2', () => 'dynamic-class'],
  active: { active: true },
}

export const Content = () => (
  <div>
    <Link href='/' class={() => 'dynamic-root'}>
      home
    </Link>
    <Link href='/test' class={classes}>
      test
    </Link>
  </div>
)
```

## exact
---

By default, active class appends if URL starts with `href` prop value, but use `exact` to compare exactly.

```tsx
import { Link } from 'rundom'

const classes = { root: 'link', active: 'active' }

export const Content = () => (
  <div>
    <Link href='/' exact class={classes}>
      home
    </Link>
    <Link href="/test" class={classes}>
      test
    </Link>
  </div>
)
```

## scroll
---

You can use smooth scroll

```css
body, html {
  scroll-behavior: smooth;
}
```
The property of `scroll` says should we scroll on click and how.

> by default equals `before`

```tsx
import { Link } from 'rundom'

export const Content = () => (
  <div>
    <Link href="/" scroll='before'>
      home
    </Link>
    <Link href="/test" scroll='after'>
      test
    </Link>
    <Link href="?modal" scroll='none'>
      test
    </Link>
  </div>
)
```

## target
---

External links open in a new tab by default and receive `rel="noopener noreferrer nofollow"`. Use `target` to choose another browsing context, for example `'_self'` to open in the same tab.

```tsx
import { Link } from 'rundom'

<Link href='https://github.com/d8corp/rundom' target='_self'>
  GitHub
</Link>
```

## children
---

`children` is the visible content of the link. It may be text, an icon or any other JSX, as in the examples above.

```tsx
import { Link, SearchIcon } from 'rundom'

<Link href='/ui/components'>
  <SearchIcon /> Components
</Link>
```

## scrollTo
---

If you want to scroll the page to custom position (by default it's up of the page) use `scrollTo`

```tsx
import { Link } from 'rundom'

export const Content = () => (
  <div>
    <Link href='/' scrollTo={100}>
      home
    </Link>
    <Link href='/test' scrollTo='#root'>
      test
    </Link>
  </div>
)
```

Use a string to scroll under an element relates to the CSS selector you provide or use `-1` to stop scrolling.

## transition
---

When set to `true`, internal navigation runs inside a view transition. The global `RD_VIEW_TRANSITION='true'` setting enables the same behavior for every link.

```tsx
import { Link } from 'rundom'

<Link href='/about' transition>
  About
</Link>
```

## disabled
---

A reactive `disabled` prop prevents navigation, removes `href` and keeps the click handler from running.

```tsx
import { Link } from 'rundom'
import { Slot } from 'rune-hub'

const disabled = new Slot(() => true)

<Link href='/settings' disabled={disabled}>
  Settings
</Link>
```

## Theme
---

The default styles of `<Link>` come from the theme and are configured with environment variables:

| Variable                | Description                                          |
|-------------------------|------------------------------------------------------|
| `RD_THEME_LINK`         | CSS of the component that is added to the page       |
| `RD_THEME_LINK__ROOT`   | Class name(s) of the link, always applied            |
| `RD_THEME_LINK__ACTIVE` | Class name(s) applied when the link is active        |

### Replacing the component

Set `RD_UI_LINK` to a module alias, and `<Link>` will be taken from the `Link` export of that module:

```tsx
//! .env
RD_UI_LINK='@theme/link'
//! theme/link.tsx
import { LinkComponent, LinkProps } from 'rundom'

export function Link (props: LinkProps) {
  return <LinkComponent {...props} data-testid='link' />
}
```

## What's Next?
---

- Learn about [\<Flex>](/ui/flex) and how `element='a'` renders a link
- Explore [\<Router>](/router) for path-based navigation
- Read about [\<Routing>](/routing) to declare routes
