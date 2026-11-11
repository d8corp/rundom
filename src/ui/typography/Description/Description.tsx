import type { TextProps } from '../Text'
import { Text } from '../Text'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'

if (import.meta.env?.RD_THEME_DESCRIPTION) {
  addUiCSS(import.meta.env.RD_THEME_DESCRIPTION, 'description')
}

export const descriptionStyles = {
  root: import.meta.env?.RD_THEME_DESCRIPTION__ROOT,
}

export type DescriptionStyles = typeof descriptionStyles

export interface DescriptionProps extends TextProps {}

export function DescriptionComponent (props: DescriptionProps) {
  const styles = useStyles(descriptionStyles, props.class)

  return <Text color='muted' size='xs' {...props} class={styles} />
}

export const Description = import.meta.env?.RD_UI_DESCRIPTION
  ? import.meta.require?.(import.meta.env.RD_UI_DESCRIPTION).Description as typeof DescriptionComponent
  : DescriptionComponent
