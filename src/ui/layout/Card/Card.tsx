import { classes } from 'html-classes'

import type { HTMLClassProp } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, inject, injectAll } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_CARD) {
  addUiCSS(import.meta.env.RD_THEME_CARD, 'card')
}

export const cardStyles = {
  root: import.meta.env?.RD_THEME_CARD__ROOT,
  clickable: import.meta.env?.RD_THEME_CARD__CLICKABLE,
  hoverable: import.meta.env?.RD_THEME_CARD__HOVERABLE,
  m: import.meta.env?.RD_THEME_CARD__M,
  s: import.meta.env?.RD_THEME_CARD__S,
  l: import.meta.env?.RD_THEME_CARD__L,
}

export type CardStyles = typeof cardStyles

/** Props for `<Card>`: flex props plus surface and sizing props. */
export type CardProps<T extends FlexElement = 'div', S extends FlexStyles = CardStyles> = Merge<FlexProps<T, S>, {
  /** Card size; changes corner radius and content spacing. */
  size?: ObservableProp<SMLSize | undefined>
  /** Adds a pointer cursor; defaults to `true` when `onclick` is provided. */
  clickable?: ObservableProp<boolean | undefined>
  /** Adds hover feedback; defaults to the value of `clickable`. */
  hoverable?: ObservableProp<boolean | undefined>
  /** Card width; numbers are converted to pixels. */
  width?: ObservableProp<string | number | undefined>
  /** Card height; numbers are converted to pixels. */
  height?: ObservableProp<string | number | undefined>
}>

/**
 * Surface for grouping content. Provides border, background, radius and
 * clickable/hoverable states; compose it with `CardHeader`, `CardPreview`,
 * `CardContent` and `CardTitle`.
 */
export function CardComponent<T extends FlexElement = 'div', S extends FlexStyles = CardStyles> ({
  size = 'm',
  onclick,
  clickable = Boolean(onclick),
  hoverable = clickable,
  width,
  height,
  style,
  vertical = true,
  ...props
}: CardProps<T, S>) {
  const styles = useStyles(cardStyles, props.class as HTMLClassProp<CardStyles>)

  const root = injectAll([
    styles.root,
    inject(size, size => size && styles[size]),
    inject(clickable, clickable => clickable && styles.clickable),
    inject(hoverable, hoverable => hoverable && styles.hoverable),
  ], classes)

  return (
    <Flex
      {...props as FlexProps<T, S>}
      vertical={vertical}
      class={root}
      onclick={onclick}
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
