# Delay

| Prop         | Type                 | Description                                        |
|--------------|----------------------|----------------------------------------------------|
| [**show**](#show) | `number`         | Delay before showing the content (in milliseconds) |
| [**hide**](#hide) | `number`         | Delay before hiding the content (in milliseconds)  |
| [**ref**](#ref)   | `Ref<Slot<boolean>>` | Reference to the visibility state              |
| [**children**](#children) | `JSX.Element` | Content to render with delay                   |

You can show or hide elements with a delay.

```tsx
import { Delay } from 'rundom'

export function Content () {
  return (
    <Delay show={1000}>
      Works
      <Delay show={1000}>
        fine!
      </Delay>
    </Delay>
  )
}
```

## Show
---

`show` delays the first render of the content by the given number of milliseconds. Nested `<Delay>` components can use different delays.

```tsx
<Delay show={300}>
  <p>Appears after 300 ms</p>
</Delay>
```

## Hide
---

`hide` keeps the content mounted after it stops matching the parent condition, so it can animate out before the DOM is removed.

```tsx
import { Delay, Show } from 'rundom'
import { Slot } from 'rune-hub'

const visible = new Slot(() => true)
const close = () => visible.set(false)

<Show when={visible}>
  <Delay hide={300}>
    <p>Stays in the DOM for 300 ms after closing</p>
    <button onclick={close}>Close</button>
  </Delay>
</Show>
```

## Children
---

`children` is the content mounted and unmounted with the configured delays.

```tsx
<Delay show={200} hide={400}>
  <h2>Title</h2>
  <p>Both nodes are mounted and removed together.</p>
</Delay>
```

## useHidden
---

You can react to elements being removed.

```tsx
//! src/Content.tsx
import { useHidden } from 'rundom'

export function Content () {
  const hidden = useHidden()

  return () => hidden.value ? 'hidden' : 'shown'
}
```

```tsx
//! src/app.tsx
import { Delay } from 'rundom'
import { Slot } from 'rune-hub'

const show = new Slot(() => true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <Delay hide={1000}>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </Delay>
)
```

## Ref
---

You can use `ref` to access the hidden state.

```tsx
//! src/Content.tsx
import { Delay } from 'rundom'

export function Content () {
  const hidden = new Ref()

  return (
    <Delay ref={hidden} hide={1000}>
      {() => hidden.value.value ? 'hidden' : 'shown'}
    </Delay>
  )
}
```

```tsx
//! src/app.tsx
import { Slot } from 'rune-hub'

const show = new Slot(() => true)

const handleClick = () => {
  show.value = false
}

export default () => show.value && (
  <>
    <Content />
    <button onclick={handleClick}>
      Hide
    </button>
  </>
)
```

## What's Next?
---

- Learn about [\<Show>](/show) and [\<Hide>](/hide) for instant conditional rendering
- Explore [\<Suspense>](/suspense) for async content
- Read [State Management](/state-management) for reactive values
- Discover [\<Lazy>](/lazy) for deferred components
