# HubProvider

`<HubProvider>` runs its children inside the reactive context of the provided hub.
Every slot and update created inside the children belongs to that hub, which makes it possible to isolate a widget from the rest of the application.

| Prop         | Type         | Description                                          |
|--------------|--------------|------------------------------------------------------|
| [**hub**](#hub) | `Hub`      | Hub instance that owns the reactive context of the children |
| [**children**](#children) | `JSXElement` | Content rendered inside the hub context      |

## Basic usage
---

Create a hub and pass it to the provider. Slots created while the children render belong to that hub:

```tsx
//! View
//> basic
//! Code
import { rundom, HubProvider, useAction, Flex, Button, Text } from 'rundom'
import { Hub, Slot } from 'rune-hub'

const hub = new Hub()

function Counter () {
  const count = new Slot(() => 0)
  const increment = useAction(() => {
    count.value++
  })

  return (
    <Flex gap={8} align='center'>
      <Text>{() => `Count: ${count.value}`}</Text>
      <Button onclick={increment}>Increment</Button>
    </Flex>
  )
}

rundom(
  <HubProvider hub={hub}>
    <Counter />
  </HubProvider>
)
```

## Hub
---

`hub` is a `Hub` from `rune-hub`. Its context receives all effects and slots created during the render of the children, and cleanup happens when the provider is unmounted.

```tsx
import { HubProvider } from 'rundom'
import { Hub } from 'rune-hub'

const hub = new Hub()

hub.on('destroy', () => {
  console.log('the hub and its slots are destroyed')
})

<HubProvider hub={hub}>
  <Counter />
</HubProvider>
```

## Children
---

`children` is rendered synchronously inside the hub context, so hooks such as `useAction` pick up this hub instead of the root one.

```tsx
function Counter () {
  const count = new Slot(() => 0)
  const increment = useAction(() => {
    count.value++
  })

  return (
    <button onclick={increment}>
      Count: {() => count.value}
    </button>
  )
}

<HubProvider hub={hub}>
  <Counter />
</HubProvider>
```

## What's Next?
---

- Learn about [Context](/context) for sharing values through the tree
- Read [State Management](/state-management) for slots and reactivity
- Explore [\<Devtools>](/ui/devtools) to inspect hubs and slots
