import { type HTMLStyleProps, useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'

export type TitleDepth = 1 | 2 | 3 | 4 | 5 | 6

if (import.meta.env?.RD_THEME_TITLE) {
  addUiCSS(import.meta.env.RD_THEME_TITLE, 'title')
}

export const titleStyles = {
  root: import.meta.env?.RD_THEME_TITLE__ROOT,
}

export type TitleStyles = typeof titleStyles

export interface TitleProps extends HTMLStyleProps<'h1', TitleStyles> {
  depth?: TitleDepth
  title?: string
}

export function TitleComponent ({ depth = 1, title, ...props }: TitleProps) {
  const styles = useStyles(titleStyles, props.class)

  if (title !== undefined) {
    document.title = title
  }

  const Component = `h${depth}`

  return <Component children={title} {...props} class={styles.root} />
}

export const Title = import.meta.env?.RD_UI_TITLE
  ? import.meta.require?.(import.meta.env.RD_UI_TITLE).Title as typeof TitleComponent
  : TitleComponent
