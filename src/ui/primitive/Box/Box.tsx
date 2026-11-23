import { classes } from 'html-classes'

import type { FlexElement, FlexProps, FlexStyles } from '../Flex'
import { Flex } from '../Flex'

import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, XSMLSize } from '../../../types'
import { addUiCSS, inject, injectAll } from '../../../utils'

export type BoxSize = XSMLSize
export type BoxColor = 'primary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type BoxView = 'filled' | 'soft' | 'surface' | 'dashed' | 'ghost'
export type BoxInteract = 'hoverable' | 'clickable' | 'disabled' | 'auto' | 'none'

if (import.meta.env?.RD_THEME_BOX) {
  addUiCSS(import.meta.env.RD_THEME_BOX, 'box')
}

export const boxStyles = {
  root: import.meta.env?.RD_THEME_BOX__ROOT,
  primary: import.meta.env?.RD_THEME_BOX__PRIMARY,
  accent: import.meta.env?.RD_THEME_BOX__ACCENT,
  neutral: import.meta.env?.RD_THEME_BOX__NEUTRAL,
  info: import.meta.env?.RD_THEME_BOX__INFO,
  success: import.meta.env?.RD_THEME_BOX__SUCCESS,
  warning: import.meta.env?.RD_THEME_BOX__WARNING,
  danger: import.meta.env?.RD_THEME_BOX__DANGER,
  disabled: import.meta.env?.RD_THEME_BOX__DISABLED,
  square: import.meta.env?.RD_THEME_BOX__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_BOX__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_BOX__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_BOX__CIRCLE,
  clickable: import.meta.env?.RD_THEME_BOX__CLICKABLE,
  hoverable: import.meta.env?.RD_THEME_BOX__HOVERABLE,
  xxs: import.meta.env?.RD_THEME_BOX__XXS,
  xs: import.meta.env?.RD_THEME_BOX__XS,
  s: import.meta.env?.RD_THEME_BOX__S,
  m: import.meta.env?.RD_THEME_BOX__M,
  l: import.meta.env?.RD_THEME_BOX__L,
  xl: import.meta.env?.RD_THEME_BOX__XL,
  xxl: import.meta.env?.RD_THEME_BOX__XXL,
  filled: import.meta.env?.RD_THEME_BOX__FILLED,
  soft: import.meta.env?.RD_THEME_BOX__SOFT,
  surface: import.meta.env?.RD_THEME_BOX__SURFACE,
  ghost: import.meta.env?.RD_THEME_BOX__GHOST,
  dashed: import.meta.env?.RD_THEME_BOX__DASHED,
}

export type BoxStyles = typeof boxStyles & FlexStyles

/** Props for `<Box>`: flex props plus surface styling props. */
export type BoxProps<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> = Merge<FlexProps<T, S>, {
  /** Semantic color of the surface. */
  color?: ObservableProp<BoxColor>
  /** Size modifier that controls spacing and corner radius. */
  size?: ObservableProp<BoxSize>
  /** Visual style of the surface. */
  view?: ObservableProp<BoxView>
  /** Square corners, or only the `left`/`right` side. */
  square?: ObservableProp<boolean | 'left' | 'right'>
  /** Fully rounded corners. */
  circle?: ObservableProp<boolean>
  /** Adds hover or pointer feedback, or disables the box. */
  interact?: ObservableProp<BoxInteract | undefined>
}>

/**
 * Basic surface primitive: a `<Flex>` with color, size, view, shape and interaction modifiers.
 * Serves as the base for buttons, fields and other framed components.
 */
export function BoxComponent<T extends FlexElement = 'div', S extends BoxStyles = BoxStyles> ({
  element,
  size = 'm',
  color = 'neutral',
  view = 'soft',
  square = false,
  circle = false,
  interact = 'auto',
  onclick,
  ...props
}: BoxProps<T, S>) {
  const styles = useStyles(boxStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(color, color => styles[color]),
    inject(view, view => styles[view]),
    inject(size, size => styles[size]),
    inject(interact, interact => {
      const cur = interact === 'auto' ? onclick || element === 'a' ? 'clickable' : undefined : interact

      if (cur && cur !== 'none') {
        return styles[cur]
      }
    }),
    inject(square, square => square === 'left' ? styles.squareLeft : square === 'right' ? styles.squareRight : square && styles.square),
    inject(circle, circle => circle && styles.circle),
  ], classes)

  return <Flex {...props as FlexProps<T, S>} element={element} onclick={onclick} class={root} />
}

export const Box = import.meta.env?.RD_UI_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_BOX).Box as typeof BoxComponent
  : BoxComponent
