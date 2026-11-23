import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_HEADER) {
  addUiCSS(import.meta.env.RD_THEME_HEADER, 'header')
}

export const headerStyles = {
  root: import.meta.env?.RD_THEME_HEADER__ROOT,
}

export type HeaderStyles = typeof headerStyles & FlexStyles

/** Props for `<Header>`: flex props plus the component styles. */
export type HeaderProps<T extends FlexElement = 'header', S extends HeaderStyles = HeaderStyles> = FlexProps<T, S>

/** Header rendered as a `<header>` by default. */
export function HeaderComponent<T extends FlexElement = 'header', S extends HeaderStyles = HeaderStyles> (
  props: HeaderProps<T, S>,
) {
  const styles = useStyles(headerStyles, props.class)

  return <Flex<T, S> element='header' {...props as FlexProps<T, S>} class={styles.root} />
}

export const Header = import.meta.env?.RD_UI_HEADER
  ? import.meta.require?.(import.meta.env.RD_UI_HEADER).Header as typeof HeaderComponent
  : HeaderComponent
