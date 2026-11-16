# Lazy

| Prop                 | Type                                                         | Description                                                               |
|----------------------|--------------------------------------------------------------|---------------------------------------------------------------------------|
| [**component**](#component) | `Reactive<LazyResult<C> \| C>` \| `Slot<LazyResult<C> \| C>` | Reactive slot or function returning a component or promise of a component |
| [**fallback**](#fallback)   | `JSX.Element`                                                | Element to render while the component is loading                          |
| [**show**](#show)           | `ObservableProp<boolean>`                                    | Condition to determine whether to load and render the component           |
| [**render**](#render)       | `(Component: C) => JSX.Element`                              | Custom render function for the loaded component                           |
| [**cache**](#cache)         | `Map<LazyResult, Component>`                                 | Optional cache map of already loaded components                           |

The `<Lazy>` component enables code-splitting and dynamic component loading.
It defers loading a component's code until it is actually needed, reducing the initial bundle size and improving startup performance.

## Basic Usage
---

Use the `lazy()` utility together with dynamic `import()` to define a lazily loaded component:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'

rundom(
  <Lazy
    component={lazy(() => import('./UserProfile'))}
    fallback={<div>Loading profile...</div>}
  />
)
```

The component loaded with `import()` can use `export default`:

```tsx
//! src/UserProfile.tsx
export default function UserProfile () {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Loaded on demand!</p>
    </div>
  )
}
```

## Custom rendering
---

By default, `<Lazy>` instantiates the loaded component without any props (`<Component />`).
If the component requires props, provide a custom `render` function:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'

rundom(
  <Lazy
    component={lazy(() => import('./UserCard'))}
    fallback={<div>Loading user...</div>}
    render={UserCard => <UserCard id="42" name="Alice" />}
  />
)
```

## Dynamic Component
---

The `component` prop accepts a reactive `Slot`.
When the slot's value changes, `<Lazy>` loads and renders the new component automatically:

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'
import { Slot } from 'rune-hub'

const tabOne = lazy(() => import('./TabOne'))
const tabTwo = lazy(() => import('./TabTwo'))

const currentTab = new Slot(() => tabOne)

const selectTabOne = () => currentTab.set(tabOne)
const selectTabTwo = () => currentTab.set(tabTwo)

rundom(
  <div>
    <nav>
      <button onclick={selectTabOne}>
        Tab 1
      </button>
      <button onclick={selectTabTwo}>
        Tab 2
      </button>
    </nav>
    <main>
      <Lazy
        component={currentTab}
        fallback={<div>Loading tab...</div>}
      />
    </main>
  </div>
)
```

Already loaded components are cached, so switching back to a previously loaded tab renders instantly without re-fetching.

## Conditional Loading
---

Use the `show` prop to delay loading until a condition is met (e.g. when opening a dialog or drawer):

```tsx
//! src/index.tsx
import { rundom, Lazy, lazy } from 'rundom'
import { Slot } from 'rune-hub'

const isOpen = new Slot(() => false)
const openModal = () => isOpen.set(true)

rundom(
  <div>
    <button onclick={openModal}>
      Open Modal
    </button>
    <Lazy
      show={isOpen}
      component={lazy(() => import('./Modal'))}
      fallback={<div>Loading dialog...</div>}
    />
  </div>
)
```

While `show` is falsy, the component script is not fetched and nothing is rendered.

## The lazy utility
---

The `lazy()` helper wraps dynamic `import()` and memoizes the returned promise.
This ensures that multiple references to the same lazy component share a single request:

```tsx
import { lazy } from 'rundom'

// Returns a memoized LazyFn
export const heavyChart = lazy(async () => {
  const { HeavyChart } = await import('./HeavyChart')

  return HeavyChart
})
```

You can also pass `lazy()` components directly to router configurations:

```tsx
import { createRouting, lazy } from 'rundom'

export const routing = createRouting([
  {
    index: true,
    component: lazy(() => import('./HomePage')),
  },
  {
    path: 'settings',
    component: lazy(() => import('./SettingsPage')),
  },
])
```

## Component
---

`component` is a function returning a component or a promise of a component. The `lazy()` utility and `import()` produce exactly this shape, and a plain component also works.

```tsx
import { Lazy, lazy } from 'rundom'

<Lazy component={lazy(() => import('./Chart'))} />
```

## Fallback
---

`fallback` is rendered while the promise is pending.

```tsx
import { Lazy, Spin, lazy } from 'rundom'

<Lazy
  component={lazy(() => import('./Chart'))}
  fallback={<Spin />}
/>
```

## Show
---

A reactive `show` prop enables or disables the lazy component. When it becomes truthy, the promise starts loading if it has not loaded yet.

```tsx
import { Lazy, lazy } from 'rundom'
import { Slot } from 'rune-hub'

const isOpen = new Slot(() => false)

<Lazy
  show={isOpen}
  component={lazy(() => import('./Dialog'))}
  fallback={<p>Loading dialog...</p>}
/>
```

## Render
---

`render` receives the resolved component and returns the JSX to mount. By default it renders `<Component />` without props.

```tsx
import { Lazy, lazy } from 'rundom'

<Lazy
  component={lazy(() => import('./UserCard'))}
  render={UserCard => <UserCard id='42' name='Alice' />}
/>
```

## Cache
---

`cache` stores resolved components by promise, so repeated renders and route changes do not load the same module twice. `<Router>` shares one cache between route components.

```tsx
import { Lazy, lazy } from 'rundom'

const cache = new Map()

<Lazy
  component={lazy(() => import('./Chart'))}
  cache={cache}
/>
```

## What's Next?
---

- Explore [\<Suspense>](/suspense) for coordinating asynchronous operations and fallbacks
- Learn about [\<Router>](/router) for route-based code splitting
- Discover [\<Show>](/show) and [\<Hide>](/hide) for reactive conditional rendering
- Check out [\<Delay>](/delay) for delay-based transitions
