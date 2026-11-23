import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import { Show } from '../../../components'
import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, inject, injectAll, SystemSlot } from '../../../utils'
import type { BoxProps, BoxSize, BoxStyles, FlexElement } from '../../primitive'
import { Box, Spin } from '../../primitive'

if (import.meta.env?.RD_THEME_BUTTON) {
  addUiCSS(import.meta.env.RD_THEME_BUTTON, 'button')
}

export const buttonStyles = {
  root: import.meta.env?.RD_THEME_BUTTON__ROOT,
  primary: import.meta.env?.RD_THEME_BUTTON__PRIMARY,
  accent: import.meta.env?.RD_THEME_BUTTON__ACCENT,
  neutral: import.meta.env?.RD_THEME_BUTTON__NEUTRAL,
  info: import.meta.env?.RD_THEME_BUTTON__INFO,
  success: import.meta.env?.RD_THEME_BUTTON__SUCCESS,
  warning: import.meta.env?.RD_THEME_BUTTON__WARNING,
  danger: import.meta.env?.RD_THEME_BUTTON__DANGER,
  disabled: import.meta.env?.RD_THEME_BUTTON__DISABLED,
  square: import.meta.env?.RD_THEME_BUTTON__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BUTTON__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BUTTON__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BUTTON__CIRCLE,
  loading: import.meta.env?.RD_THEME_BUTTON__LOADING,
  spin: import.meta.env?.RD_THEME_BUTTON__SPIN,
  clickable: import.meta.env?.RD_THEME_BUTTON__CLICKABLE,
  s: import.meta.env?.RD_THEME_BUTTON__S,
  m: import.meta.env?.RD_THEME_BUTTON__M,
  l: import.meta.env?.RD_THEME_BUTTON__L,
  filled: import.meta.env?.RD_THEME_BUTTON__FILLED,
  soft: import.meta.env?.RD_THEME_BUTTON__SOFT,
  surface: import.meta.env?.RD_THEME_BUTTON__SURFACE,
  ghost: import.meta.env?.RD_THEME_BUTTON__GHOST,
  dashed: import.meta.env?.RD_THEME_BUTTON__DASHED,
}

export const buttonSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type ButtonStyles = typeof buttonStyles

/** Props for `<Button>`: box props plus button-specific behavior. */
export type ButtonProps<T extends FlexElement = 'button', S extends ButtonStyles = ButtonStyles> = Merge<BoxProps<T, S & BoxStyles>, {
  /** Button size; mapped to a larger box size internally. */
  size?: ObservableProp<SMLSize>
  /** Shows a spinner and blocks interaction while set. */
  loading?: ObservableProp<boolean>
  /** Disables the button and applies the disabled style. */
  disabled?: ObservableProp<boolean>
  /** Click handler; returning a promise enables the loading state automatically. */
  onclick?: (e: MouseEvent) => void | Promise<void>
}>

/**
 * Action button based on `<Box>` and `<Spin>`.
 * Supports colors, sizes, shapes, a loading state and async click handlers.
 */
function ButtonComponent<T extends keyof HTMLElementTagNameMap = 'button', S extends ButtonStyles = ButtonStyles> ({
  loading = new SystemSlot(() => false),
  onclick,
  children,
  size = 'm',
  disabled,
  interact = 'clickable',
  ...props
}: ButtonProps<T, S>) {
  const styles = useStyles(buttonStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(loading, loading => loading && styles.loading),
    inject(disabled, disabled => disabled && styles.disabled),
  ], classes)

  function handleClick (e: MouseEvent) {
    const result = onclick?.(e)

    if (result && result instanceof Promise && loading instanceof Slot) {
      loading.set(true)

      result.finally(() => {
        loading.set(false)
      })
    }
  }

  return (
    <Box
      element='button'
      view='soft'
      color='primary'
      {...(props as BoxProps<T, S & BoxStyles>)}
      interact={injectAll([interact, disabled], ([interact, disabled]) => disabled ? 'disabled' : interact)}
      size={inject(size, size => buttonSizeMap[size])}
      class={{ ...styles, m: styles.s, l: styles.m, xl: styles.l, root }}
      onclick={handleClick}
    >
      {children}
      <Show when={loading}>
        <Spin class={styles.spin} />
      </Show>
    </Box>
  )
}

export const Button = import.meta.env?.RD_UI_BUTTON
  ? import.meta.require?.(import.meta.env.RD_UI_BUTTON).Button as typeof ButtonComponent
  : ButtonComponent
