import { useStyles } from '../../../hooks'
import type { Merge, ObservableProp } from '../../../types'
import { addUiCSS, inject } from '../../../utils'
import type { FlexElement, FlexProps, FlexStyles } from '../../primitive'
import { Flex } from '../../primitive'

if (import.meta.env?.RD_THEME_PREVIEW) {
  addUiCSS(import.meta.env.RD_THEME_PREVIEW, 'preview')
}

export const previewStyles = {
  root: import.meta.env?.RD_THEME_PREVIEW__ROOT,
}

export type PreviewStyles = typeof previewStyles & FlexStyles

/** Props for `<Preview>`: flex props plus the component styles. */
export type PreviewProps<T extends FlexElement = 'div', S extends PreviewStyles = PreviewStyles> = Merge<FlexProps<T, S>, {
  /** Preview width; numbers are converted to pixels. */
  width?: ObservableProp<string | number | undefined>
  /** Preview height; numbers are converted to pixels. */
  height?: ObservableProp<string | number | undefined>
}>

/** Visual preview area of a `<Card>`, usually an image or illustration. */
export function PreviewComponent<T extends FlexElement = 'div', S extends PreviewStyles = PreviewStyles> ({
  width,
  height,
  style,
  ...props
}: PreviewProps<T, S>) {
  const styles = useStyles(previewStyles, props.class)

  return (
    <Flex<T, S>
      {...props as FlexProps<T, S>}
      style={{
        width: inject(width, width => typeof width === 'number' ? `${width}px` : width),
        height: inject(height, height => typeof height === 'number' ? `${height}px` : height),
        ...style,
      }}
      class={styles.root}
    />
  )
}

export const Preview = import.meta.env?.RD_UI_PREVIEW
  ? import.meta.require?.(import.meta.env.RD_UI_PREVIEW).Preview as typeof PreviewComponent
  : PreviewComponent
