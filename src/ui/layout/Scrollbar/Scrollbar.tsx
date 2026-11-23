import { classes } from 'html-classes'

import { useStyles } from '../../../hooks'
import type { GlobalCSSValue, HTMLStyleProp, Merge, ObservableProp } from '../../../types'
import { addUiCSS, inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_SCROLLBAR) {
  addUiCSS(import.meta.env.RD_THEME_SCROLLBAR, 'scrollbar')
}

export const scrollbarStyles = {
  root: import.meta.env?.RD_THEME_SCROLLBAR__ROOT,
  stable: import.meta.env?.RD_THEME_SCROLLBAR__STABLE,
}

export type ScrollbarStyles = typeof scrollbarStyles & FlexStyles

export type ScrollbarOverflowBase = 'auto' | 'hidden' | 'scroll' | 'visible' | 'clip' | GlobalCSSValue
export type ScrollbarOverflow = ScrollbarOverflowBase | `${ScrollbarOverflowBase} ${ScrollbarOverflowBase}`

/** Props for `<Scrollbar>`: flex props plus overflow behavior. */
export type ScrollbarProps<T extends FlexElement = 'div', S extends ScrollbarStyles = ScrollbarStyles> = Merge<FlexProps<T, S>, {
  /** Reserves the scrollbar gutter when the content does not overflow. */
  stable?: ObservableProp<boolean>
  /** CSS `overflow` value; defaults to `'auto'`. */
  overflow?: ObservableProp<ScrollbarOverflow>
}>

/**
 * Scrollable flex container with an optional stable gutter.
 * Used as the viewport for virtualized lists such as `<Options>`.
 */
export function ScrollbarComponent<T extends keyof HTMLElementTagNameMap = 'div', S extends ScrollbarStyles = ScrollbarStyles> ({
  stable,
  overflow = 'auto',
  ...props
}: ScrollbarProps<T, S>) {
  const styles = useStyles(scrollbarStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(stable, stable => stable && styles.stable),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      style={{
        ...(props.style as HTMLStyleProp),
        overflow,
      }}
      class={root}
    />
  )
}

export const Scrollbar = import.meta.env?.RD_UI_SCROLLBAR
  ? import.meta.require?.(import.meta.env.RD_UI_SCROLLBAR).Scrollbar as typeof ScrollbarComponent
  : ScrollbarComponent
