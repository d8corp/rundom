import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, inject } from '../../../utils'
import type { BoxProps, BoxSize, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD) {
  addUiCSS(import.meta.env.RD_THEME_CARD, 'card')
}

export const cardStyles = {
  root: import.meta.env?.RD_THEME_CARD__ROOT,
  m: import.meta.env?.RD_THEME_CARD__M,
  s: import.meta.env?.RD_THEME_CARD__S,
  l: import.meta.env?.RD_THEME_CARD__L,
}

export const cardSizeMap = {
  s: 'm',
  m: 'l',
  l: 'xl',
} as const satisfies Record<SMLSize, BoxSize>

export type CardStyles = typeof cardStyles & BoxStyles

/** Props for `<Card>`: flex props plus surface and sizing props. */
export type CardProps<T extends FlexElement = 'div', S extends CardStyles = CardStyles> = Merge<BoxProps<T, S>, {
  /** Card size; changes corner radius and content spacing. */
  size?: ObservableProp<SMLSize>
  /** Card width; numbers are converted to pixels. */
  width?: ObservableProp<string | number | undefined>
  /** Card height; numbers are converted to pixels. */
  height?: ObservableProp<string | number | undefined>
}>

/**
 * Surface for grouping content. Provides border, background, radius and
 * clickable/hoverable states; compose it with `Header`, `Preview`,
 * `Content` and `CardTitle`.
 */
export function CardComponent<T extends FlexElement = 'div', S extends CardStyles = CardStyles> ({
  size = 'm',
  width,
  height,
  style,
  ...props
}: CardProps<T, S>) {
  const styles = useStyles(cardStyles, props.class)

  return (
    <Box
      view='surface'
      {...props as BoxProps<T, S>}
      size={inject(size, size => cardSizeMap[size])}
      class={{ ...styles, m: styles.s, l: styles.m, xl: styles.l }}
      style={{
        width: inject(width, width => typeof width === 'number' ? `${width}px` : width),
        height: inject(height, height => typeof height === 'number' ? `${height}px` : height),
        ...style,
      }}
    />
  )
}

export const Card = import.meta.env?.RD_UI_CARD
  ? import.meta.require?.(import.meta.env.RD_UI_CARD).Card as typeof CardComponent
  : CardComponent
