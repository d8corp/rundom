# Context

You can pass a value from a parent element through any children to the place you need.

Context solves the problem of "prop drilling" — when you need to pass data through multiple layers of components. Instead of threading props through every intermediate component, Context lets you broadcast values to any descendant that needs them.

## Provider
---

Use `<Context.Provider>` to provide context value into children.

```tsx
import { Context } from 'rundom'

const theme = new Context('light')

export function Panel () {
  return (
    <Context.Provider for={theme} set='dark'>
      <PanelContent />
    </Context.Provider>
  )
}
```

| Prop                | Type                           | Description                                                     |
|---------------------|--------------------------------|-----------------------------------------------------------------|
| [**for**](#for)     | `Context<T>` \| `Context<T>[]` | A context or array of contexts to provide                       |
| [**set**](#set)     | `T` \| `T[]`                   | A value or array of values to pass to the context(s)            |
| [**children**](#children) | `JSX.Element`            | Child elements that will have access to the provided context(s) |

### For
---

`for` accepts a single `Context` or an array of contexts. When an array is passed, `set` must contain the values in the same order.

```tsx
const theme = new Context('light')
const language = new Context('en')

<Context.Provider for={[theme, language]} set={['dark', 'ru']}>
  <PanelContent />
</Context.Provider>
```

### Set
---

`set` is the value or values written into the contexts. Arrays passed to `set` are matched with the array in `for` by index.

```tsx
const theme = new Context('light')
const language = new Context('en')

function PanelContent () {
  return (
    <p>{theme.get()} / {language.get()}</p>
  )
}

<Context.Provider for={[theme, language]} set={['dark', 'ru']}>
  <PanelContent />
</Context.Provider>
```

### Children
---

The children are rendered with the provided values available through `context.get()`. Nested providers override values for their own subtree only.

```tsx
const theme = new Context('light')

function Label () {
  return <span>{theme.get()}</span>
}

<Context.Provider for={theme} set='dark'>
  <Label />
  <Context.Provider for={theme} set='contrast'>
    <Label />
  </Context.Provider>
  <Label />
</Context.Provider>
```

## Basic Usage
---

Create a context with a default value, then use `<Context.Provider>` to override it for specific component trees.

```tsx
//! src/App.tsx
import { Context } from 'rundom'

const color = new Context('blue')

function Title () {
  return (
    <h1 style={{ color: color.get() }}>
      Hello World
    </h1>
  )
}

export function App () {
  return (
    <>
      <Title />
      <Context.Provider for={color} set='red'>
        <Title />
      </Context.Provider>
    </>
  )
}
```

The first `<Title />` displays in blue (the default), while the second displays in red (the provided value).

> #### Notice
> Do not use `color.get()` inside async functions or events. The method of `get()` works like a hook.

## Multiple Contexts
---

You can provide multiple contexts at once by passing arrays to the `for` and `set` props.

```tsx
//! src/App.tsx
import { Context } from 'rundom'

const textColor = new Context('black')
const bgColor = new Context('white')
const fontSize = new Context(16)

function Card () {
  return (
    <div style={{
      color: textColor.get(),
      'background-color': bgColor.get(),
      'font-size': `${fontSize.get()}px`,
      padding: '20px'
    }}>
      Styled Card
    </div>
  )
}

export function App () {
  return (
    <Context.Provider
      for={[textColor, bgColor, fontSize]}
      set={['white', '#1a1a1a', 18]}
    >
      <Card />
    </Context.Provider>
  )
}
```

## Reactive Context
---

By default, context values are not reactive.
Combine `Context` with `Slot` from [rune-hub](https://www.npmjs.com/package/rune-hub) to create reactive contexts that update all consumers when values change.

```tsx
//! src/App.tsx
import { Context } from 'rundom'
import { Slot } from 'rune-hub'

const counter = new Context<Slot<number>>()

function Counter () {
  const count = counter.get()!
  const inc = () => count.value++

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={inc}>
        Increment
      </button>
    </div>
  )
}

export function App () {
  const count = new Slot(() => 0)

  return (
    <div>
      Count: {count}
      <Context.Provider for={counter} set={count}>
        <Counter />
        <Counter />
      </Context.Provider>
    </div>
  )
}
```

Both `<Counter />` components share the same reactive state. Clicking either button updates both displays.

## What's Next?
---

- Learn about [\<Show>](/show) and [\<Hide>](/hide) for conditional rendering
- Explore [\<Portal>](/portal), which keeps context across DOM boundaries
- Read [State Management](/state-management) for reactive slots
- Discover [\<Router>](/router) for route-based composition
