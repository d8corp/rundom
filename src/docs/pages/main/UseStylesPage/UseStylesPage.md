# useStyles

`useStyles` merges a style map with the `class` prop of a component while keeping the classes reactive.
It accepts a single class name or an object keyed by the style names (`root`, `header`, `content`).

| Option      | Type                              | Description                                                  |
|-------------|-----------------------------------|--------------------------------------------------------------|
| **styles**  | `Record<string, string>`          | Style map whose keys are matched with `className`            |
| **className** | `string` \| `Record<string, ...>` | Extra class name(s) or an object keyed by style names        |

The hook returns an object with the same keys as `styles`. Every value may be reactive, so a passed class that depends on a `Slot` keeps updating without re-rendering the component.

```tsx
//! src/Content.tsx
import { useStyles, StyledProps } from 'rundom'

import $styles from './Content.module.scss'
// or you can use an object like
// { root: '...', header: '...', content: '...' }

export interface ContentProps extends StyledProps<typeof $styles> {}

export function Content (props: ContentProps) {
  const styles = useStyles($styles, props.class)

  return (
    <div class={styles.root}>
      <header class={styles.header}>
        header
      </header>
      <main class={styles.content}>
        content
      </main>
    </div>
  )
}
```

## What's Next?
---

- Learn about [\<Flex>](/ui/flex) and [\<Box>](/ui/box) for layout and surfaces
- Read [State Management](/state-management) for reactive values
- Explore [\<Typography>](/ui/typography) for content styles
