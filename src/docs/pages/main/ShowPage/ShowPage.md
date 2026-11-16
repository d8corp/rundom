# Show

| Prop            | Type                          | Description                                         |
|-----------------|-------------------------------|-----------------------------------------------------|
| [**when**](#when) | `Slot<T>` \| `() => T` \| `T` | Condition to determine whether to show the children |
| [**fallback**](#fallback) | `JSX.Element`        | Element to render if the condition is not met       |
| [**children**](#children) | `JSX.Element`        | Content to render when the condition is met         |

The `<Show>` component provides conditional rendering based on reactive state.
When the condition is truthy, it renders the children; otherwise, it renders the fallback content.

```tsx
//! Basic usage
import { rundom, Show } from 'rundom'
import { Slot } from 'rune-hub'

const isVisible = new Slot(() => true)
const hide = () => isVisible.set(false)

rundom(
  <Show when={isVisible}>
    <button onclick={hide}>
      Click to Hide
    </button>
  </Show>
)
```

## When
---

The condition can be a plain value, a function or a `Slot`. With a reactive value the DOM is patched when the truthiness changes without re-running the component.

```tsx
<Show when={true}>
  <p>Visible, because the condition is truthy</p>
</Show>

<Show when={() => isVisible.value}>
  <p>Controlled by a getter</p>
</Show>
```

## Fallback
---

`fallback` is rendered while the condition is falsy. When it is omitted, the component renders nothing.

```tsx
<Show when={isVisible} fallback={<p>Nothing to show</p>}>
  <p>Visible content</p>
</Show>
```

## Children
---

`children` is rendered while the condition is truthy, as in the example above.

```tsx
<Show when={isVisible}>
  <p>Visible while `isVisible` is true</p>
</Show>
```

## What's Next?
---

- Learn about the [\<Hide>](/hide) component for reversed visibility toggling
- Explore [\<For>](/for) component for rendering dynamic lists with conditional items
- Discover [\<Router>](/router) for route-based conditional rendering
- Understand [State Management](/state-management) for managing reactive conditions

