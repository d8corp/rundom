# Message

`<Message>` is the notification surface behind the `message()` helper.
It renders a small pill with a semantic color and an optional auto-hide indicator.

| Prop         | Type            | Description                                                     |
|--------------|-----------------|-----------------------------------------------------------------|
| [**type**](#type) | `MessageType` | Semantic color: `'success'`, `'error'`, `'warning'` or `'info'` |
| [**timeout**](#timeout) | `number` | Timeout in seconds used to render the auto-hide indicator      |
| **children** | `JSX.Element`   | Message text or content                                         |

## The message helper
---

`message(text, props?)` creates the fixed container on first use and removes it when the last message disappears. Hovering a message pauses its timer:

```tsx
//! src/index.tsx
import { message } from 'rundom'

message('Copied to clipboard')
```

## Basic usage
---

Use the `message()` helper to show notifications. It creates the fixed container, stacks the messages and removes them when their timer ends:

```tsx
//! View
//> basic
//! Code
import { rundom, Button, message } from 'rundom'

const showMessage = () => message('Saved')

rundom(
  <Button onclick={showMessage}>Show message</Button>
)
```

## Type
---

`type` selects the color scheme. `'info'` is used by default, matching the default of `message()`.

```tsx
//! View
//> type
//! Code
import { rundom, Button, Flex, message } from 'rundom'

const showSuccess = () => message('Saved', { type: 'success' })
const showError = () => message('Something went wrong', { type: 'error' })
const showWarning = () => message('Check the form', { type: 'warning' })
const showInfo = () => message('Heads up', { type: 'info' })

rundom(
  <Flex gap={8} wrap>
    <Button onclick={showSuccess}>Success</Button>
    <Button onclick={showError}>Error</Button>
    <Button onclick={showWarning}>Warning</Button>
    <Button onclick={showInfo}>Info</Button>
  </Flex>
)
```

## Timeout
---

`timeout` adds the progress indicator and is passed by `message()` when the notification will hide automatically.

```tsx
//! View
//> timeout
//! Code
import { rundom, Button, Flex, message } from 'rundom'

// hides after 2 seconds and shows the countdown ring
const showTimed = () => message('Saved', { timeout: 2 })

// stays until it is clicked
const showSticky = () => message('Saved', { timeout: 0 })

rundom(
  <Flex gap={8} wrap>
    <Button onclick={showTimed}>Show for 2 seconds</Button>
    <Button onclick={showSticky}>Show until clicked</Button>
  </Flex>
)
```

## Theme
---

The default styles of `<Message>` come from the theme and are configured with environment variables:

| Variable                     | Description                                       |
|------------------------------|---------------------------------------------------|
| `RD_THEME_MESSAGE`           | CSS of the component that is added to the page    |
| `RD_THEME_MESSAGES`          | CSS of the fixed message container                |
| `RD_THEME_MESSAGE__ROOT`     | Class name(s) of the message, always applied      |
| `RD_THEME_MESSAGE__SUCCESS`  | Class name(s) applied when `type` is `'success'`  |
| `RD_THEME_MESSAGE__ERROR`    | Class name(s) applied when `type` is `'error'`    |
| `RD_THEME_MESSAGE__WARNING`  | Class name(s) applied when `type` is `'warning'`  |
| `RD_THEME_MESSAGE__INFO`     | Class name(s) applied when `type` is `'info'`     |
| `RD_THEME_MESSAGE__TIMEOUT`  | Class name(s) of the timeout indicator            |

### Replacing the component

Set `RD_UI_MESSAGE` to a module alias, and `<Message>` will be taken from the `Message` export of that module:

```tsx
//! .env
RD_UI_MESSAGE='@theme/message'
//! theme/message.tsx
import { MessageComponent, MessageProps } from 'rundom'

export function Message (props: MessageProps) {
  return <MessageComponent {...props} data-testid='message' />
}
```

## What's Next?
---

- Learn about [\<Button>](/ui/button) for the actions that trigger messages
- Explore [\<Portal>](/portal), which the helper uses to mount the container
- Read about [\<Box>](/ui/box) for surface styling
