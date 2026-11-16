# Hide

| Prop            | Type                          | Description                                         |
|-----------------|-------------------------------|-----------------------------------------------------|
| [**when**](#when) | `Slot<T>` \| `() => T` \| `T` | Condition to determine whether to hide the children |
| [**fallback**](#fallback) | `JSX.Element`        | Element to render if the condition is met           |
| [**children**](#children) | `JSX.Element`        | Content to render when the condition is not met     |

You can use `Hide` component to show/hide content by state.

```tsx
import { Hide } from 'rundom'
import { Slot } from 'rune-hub'

const isHidden = new Slot(() => false)
const hide = () => {
  isHidden.value = true
}

export default (
  <Hide when={isHidden}>
    <button onclick={hide}>
      Click Me
    </button>
  </Hide>
)
```

## When
---

The condition can be a plain value, a function or a `Slot`. `<Hide>` is the inverse of `<Show>`: truthy hides the children.

```tsx
<Hide when={false}>
  <p>Visible, because the condition is falsy</p>
</Hide>

<Hide when={() => isHidden.value}>
  <p>Controlled by a getter</p>
</Hide>
```

## Fallback
---

`fallback` is rendered while the condition is truthy. When it is omitted, the component renders nothing.

```tsx
<Hide when={isHidden} fallback={<p>Nothing to show</p>}>
  <p>Visible content</p>
</Hide>
```

## Children
---

`children` is rendered while the condition is falsy.

```tsx
<Hide when={isHidden}>
  <p>Visible while `isHidden` is false</p>
</Hide>
```

## What's Next?
---

- Learn about the [\<Show>](/show) component for conditional rendering
- Explore [\<For>](/for) component for rendering dynamic lists with conditional items
- Discover [\<Router>](/router) for route-based conditional rendering
- Understand [State Management](/state-management) for managing reactive conditions

