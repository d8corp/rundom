import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { addUiCSS, inject } from '../../../utils'
import type { BoxProps, BoxStyles } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_OPTION) {
  addUiCSS(import.meta.env.RD_THEME_OPTION, 'option')
}

export const optionStyles = {
  root: import.meta.env?.RD_THEME_OPTION__ROOT,
}

export type OptionStyles = typeof optionStyles & BoxStyles

export interface OptionProps<V = unknown> extends BoxProps {
  /** Value represented by the option; rendered as text when there are no children. */
  value: V
  /** Highlights the option as selected. */
  selected?: ObservableProp<boolean>
  /** Disables the option and applies the disabled style. */
  disabled?: ObservableProp<boolean>
}

/**
 * Single selectable row. Renders `children` or the stringified `value`
 * and switches between filled and ghost views based on `selected`.
 */
export function OptionComponent<V = unknown> ({
  value,
  selected,
  disabled,
  children,
  color = 'neutral',
  ...props
}: OptionProps<V>) {
  const styles = useStyles(optionStyles, props.class)

  return (
    <Box
      interact={inject(disabled, disabled => disabled ? 'disabled' : 'clickable')}
      view={inject(selected, selected => selected ? 'filled' : 'ghost')}
      color={color}
      {...props}
      class={styles}
    >
      {children ?? inject(value, value => String(value))}
    </Box>
  )
}

export const Option = import.meta.env?.RD_UI_OPTION
  ? import.meta.require?.(import.meta.env.RD_UI_OPTION).Option as typeof OptionComponent
  : OptionComponent
