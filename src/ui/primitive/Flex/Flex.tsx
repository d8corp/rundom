import type { BaseLinkProps } from '../Link'
import { Link } from '../Link'

import type { HTMLStyleProps } from '../../../hooks'
import { useStyles } from '../../../hooks'
import type {
  GlobalCSSValue,
  HTMLElementTagName,
  Merge,
  ObservableProp,
} from '../../../types'
import { addUiCSS, inject, injectAll, injectAsIs, type LinkToParams } from '../../../utils'

if (import.meta.env?.RD_THEME_FLEX) {
  addUiCSS(import.meta.env.RD_THEME_FLEX, 'flex')
}

const flexStyles = {
  root: import.meta.env?.RD_THEME_FLEX__ROOT,
}

export type FlexStyles = typeof flexStyles
export type FlexElement = HTMLElementTagName
export type FlexPadding = number | [number, number] | [number, number, number] | [number, number, number, number]
export type FlexGap = number | [number, number]
export type FlexBaseAlign = 'normal' | 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'safe center' | 'unsafe center' | GlobalCSSValue
export type FlexJustify = 'space-between' | 'space-around' | 'space-evenly' | FlexBaseAlign
export type FlexAlign = 'self-start' | 'self-end' | 'anchor-center' | 'baseline' | 'first baseline' | 'last baseline' | FlexBaseAlign

export interface BaseFlexProps {
  /** Cross-axis alignment (`align-items`). */
  align?: ObservableProp<FlexAlign | undefined>
  /** Flex grow value; `true` behaves like `1`. */
  flex?: ObservableProp<number | boolean | undefined>
  /** Gap between children: a number or a `[row, column]` tuple in pixels. */
  gap?: ObservableProp<FlexGap | undefined>
  /** Renders `display: inline-flex` instead of `display: flex`. */
  inline?: ObservableProp<boolean | undefined>
  /** Main-axis alignment (`justify-content`). */
  justify?: ObservableProp<FlexJustify | undefined>
  /** Padding in pixels: a number or CSS-like array of 1–4 values. */
  padding?: ObservableProp<FlexPadding | undefined>
  /** Reverses the flex direction. */
  reverse?: ObservableProp<boolean | undefined>
  /** Sets `flex-direction: column`. */
  vertical?: ObservableProp<boolean | undefined>
  /** Enables `flex-wrap: wrap`. */
  wrap?: ObservableProp<boolean | undefined>
}

/** Props for `<Flex>`: native props of the rendered element plus flex layout props. */
export type FlexProps<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> = Merge<
  T extends 'a' ? Merge<HTMLStyleProps<'a', S>, LinkToParams & BaseLinkProps> : HTMLStyleProps<T, S>,
  { element?: T } & BaseFlexProps
>

/**
 * Layout primitive that renders a flex container.
 * Accepts any HTML/SVG tag through `element` and applies layout props as inline styles.
 * When `element` is `'a'`, it renders `<Link>` and additionally accepts link props.
 */
export function FlexComponent<T extends FlexElement = 'div', S extends FlexStyles = FlexStyles> ({
  align,
  flex,
  gap,
  inline,
  justify,
  padding,
  reverse,
  vertical,
  wrap,
  style,
  element = 'div' as T,
  ...props
}: FlexProps<T, S>) {
  const styles = useStyles(flexStyles, props.class)
  const Element = element === 'a' ? Link as any : element as string

  return (
    <Element
      {...props}
      class={styles.root}
      style={{
        'justify-content': injectAsIs(justify),
        'align-items': injectAsIs(align),
        'flex-wrap': inject(wrap, wrap => wrap ? 'wrap' : undefined),
        flex: inject(flex, flex => String(flex === true ? 1 : flex || undefined)),
        display: inject(inline, inline => inline ? 'inline-flex' : undefined),
        'flex-direction': injectAll([vertical, reverse], ([vertical, reverse]) => vertical ? (reverse ? 'column-reverse' : 'column') : reverse ? 'row-reverse' : ''),
        padding: inject(padding, padding => padding === undefined ? undefined : Array.isArray(padding) ? `${padding.join('px ')}px` : `${padding}px`),
        gap: inject(gap, gap => gap === undefined ? undefined : Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : `${gap}px`),
        ...style,
      }}
    />
  )
}

export const Flex = import.meta.env?.RD_UI_FLEX
  ? import.meta.require?.(import.meta.env.RD_UI_FLEX).Flex as typeof FlexComponent
  : FlexComponent
