import type { Slot } from 'rune-hub'

import { Delay } from '../../../components'
import { useStyles } from '../../../hooks'
import type { Merge } from '../../../types'
import { addUiCSS, Ref } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

if (import.meta.env?.RD_THEME_MESSAGE) {
  addUiCSS(import.meta.env.RD_THEME_MESSAGE, 'message')
}

export const messageStyles = {
  root: import.meta.env?.RD_THEME_MESSAGE__ROOT,
  success: import.meta.env?.RD_THEME_MESSAGE__SUCCESS,
  error: import.meta.env?.RD_THEME_MESSAGE__ERROR,
  warning: import.meta.env?.RD_THEME_MESSAGE__WARNING,
  info: import.meta.env?.RD_THEME_MESSAGE__INFO,
  timeout: import.meta.env?.RD_THEME_MESSAGE__TIMEOUT,
  hide: import.meta.env?.RD_THEME_MESSAGE__HIDE,
}

export type MessageStyles = typeof messageStyles & FlexStyles

/** Props for `<Message>`: flex props plus message semantics. */
export type MessageProps<T extends FlexElement = 'div', S extends MessageStyles = MessageStyles> = Merge<FlexProps<T, S>, {
  /** Semantic type that selects the color scheme; defaults to `'info'`. */
  type?: MessageType
  /** Timeout in seconds used to render the auto-hide indicator. */
  timeout?: number
}>

/** Notification surface used by the `message()` helper. */
export function MessageComponent<T extends keyof HTMLElementTagNameMap = 'div', S extends MessageStyles = MessageStyles> ({
  type = 'info',
  timeout,
  ...props
}: MessageProps<T, S>) {
  const styles = useStyles(messageStyles, props.class)
  const hideRef = new Ref<Slot<boolean>>()

  const root = () => [
    styles.root,
    type && styles[type],
    timeout && styles.timeout,
    hideRef.value?.value && styles.hide,
  ]

  return (
    <Delay ref={hideRef} hide={Number(import.meta.env?.RD_UI_MESSAGE__HIDE_DELAY ?? 200)}>
      <Flex<T, S>
        {...props as FlexProps<T, S>}
        class={root}
        style={{
          ...(props.style as any),
          '--rd-message-timeout': timeout ? `${timeout}s` : undefined,
        }}
      />
    </Delay>
  )
}

export const Message = import.meta.env?.RD_UI_MESSAGE
  ? import.meta.require?.(import.meta.env.RD_UI_MESSAGE).Message as typeof MessageComponent
  : MessageComponent
