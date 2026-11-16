# Try

The `<Try>` component catches errors thrown while rendering its children and renders the `catch` handler instead.
The handler receives the error and a `retry` function that renders the children again.

| Prop         | Type                                          | Description                                        |
|--------------|-----------------------------------------------|----------------------------------------------------|
| [**catch**](#catch) | `(props: ErrorProps) => JSXElement`    | Renders instead of `children` when rendering fails |
| [**children**](#children) | `JSXElement`                         | Content that is rendered inside the error boundary |

The `ErrorProps` object contains:

| Field         | Type         | Description                              |
|---------------|--------------|------------------------------------------|
| **error**     | `unknown`    | Error thrown while rendering the children |
| **retry**     | `() => void` | Resets the error and renders the children again |

## Basic usage
---

Wrap the part of the tree that may fail and provide a `catch` renderer:

```tsx
//! View
//> basic
//! Code
import { rundom, Try } from 'rundom'

function Dangerous () {
  throw Error('Something went wrong')
}

const catchError = ({ error, retry }: { error: unknown, retry: () => void }) => (
  <div>
    <p>{String(error)}</p>
    <button onclick={retry}>Retry</button>
  </div>
)

rundom(
  <Try catch={catchError}>
    <Dangerous />
  </Try>
)
```

## Catch
---

`catch` is called with the caught error. Returning `retry` from a button allows the subtree to render again, for example after a transient failure has been fixed.

```tsx
import { Try } from 'rundom'

<Try
  catch={({ error, retry }) => (
    <div>
      <p>{String(error)}</p>
      <button onclick={retry}>Try again</button>
    </div>
  )}
>
  <DangerousWidget />
</Try>
```

## Children
---

`children` are mounted as usual. Any error thrown by a component inside them, including async components, moves the boundary into the error state.

```tsx
import { Try } from 'rundom'

<Try catch={({ error }) => <p>Failed: {String(error)}</p>}>
  <Dashboard />
  <Widget />
</Try>
```

## What's Next?
---

- Learn about [\<Suspense>](/suspense) for pending promises
- Explore [\<Show>](/show) and [\<Hide>](/hide) for conditional rendering
- Read about [\<Lazy>](/lazy) for deferred components
