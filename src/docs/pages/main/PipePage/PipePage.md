# Pipe

The `<Pipe>` component renders its `children` render function recursively, incrementing the `deep` counter on every pass.
It is useful when a component chain has to be built from index-based siblings, for example router segments.

| Prop         | Type                                                    | Description                                                       |
|--------------|---------------------------------------------------------|-------------------------------------------------------------------|
| [**deep**](#deep) | `number`                                          | Current nesting depth, starting at `0`                            |
| [**children**](#children) | `(children: JSX.Element, deep: number) => JSX.Element` | Render function that receives the next `<Pipe>` and the depth |

## Basic usage
---

The render function receives the next `<Pipe>` element and the current depth. Return `children` to continue the chain or omit it to stop:

```tsx
//! View
//> basic
//! Code
import { rundom, Pipe } from 'rundom'

const render = (children: JSX.Element, deep: number) => (
  <div style={{ 'padding-left': '12px' }}>
    Level {deep}
    {deep < 2 && children}
  </div>
)

rundom(<Pipe>{render}</Pipe>)
```

## Deep
---

`deep` starts at `0` and is incremented automatically for every nested `<Pipe>`. Pass it only when you need to start the chain from a different depth.

```tsx
import { Pipe } from 'rundom'

<Pipe deep={2}>
  {(children, deep) => (
    <div>
      Starts at depth {deep}
      {children}
    </div>
  )}
</Pipe>
```

## Children
---

`children` is called with the next `<Pipe deep={deep + 1}>` element. Rendering that element continues the chain, so always guard the recursion with a termination condition.

```tsx
import { Pipe } from 'rundom'

const render = (children: JSX.Element, deep: number) => (
  <div style={{ 'padding-left': '12px' }}>
    Level {deep}
    {deep < 2 && children}
  </div>
)

<Pipe>{render}</Pipe>
```

## What's Next?
---

- Learn about [\<Router>](/router), which uses `<Pipe>` to render nested route segments
- Explore [\<Show>](/show) and [\<Hide>](/hide) for conditional rendering
- Read about [\<Lazy>](/lazy) for deferred components
