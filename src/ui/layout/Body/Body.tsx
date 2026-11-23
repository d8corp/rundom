import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_BODY) {
  addUiCSS(import.meta.env.RD_THEME_BODY, 'body')
}

export const bodyStyles = {
  root: import.meta.env?.RD_THEME_BODY__ROOT,
}

export type BodyStyles = typeof bodyStyles & FlexStyles

/** Props for `<Content>`: flex props plus the component styles. */
export type BodyProps<T extends FlexElement = 'div', S extends BodyStyles = BodyStyles> = FlexProps<T, S>

/** Padded content area of a `<Card>`. */
export function BodyComponent<T extends FlexElement = 'div', S extends BodyStyles = BodyStyles> (
  props: BodyProps<T, S>,
) {
  const styles = useStyles(bodyStyles, props.class)

  return <Flex {...props} class={styles.root} />
}

export const Body = import.meta.env?.RD_UI_BODY
  ? import.meta.require?.(import.meta.env.RD_UI_BODY).Body as typeof BodyComponent
  : BodyComponent
