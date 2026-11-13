import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { addUiCSS, inject, injectAll } from '../../../utils'
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
  value: V
  selected?: ObservableProp<boolean>;
  disabled?: ObservableProp<boolean>;
}

export function OptionComponent<V = unknown> ({
  value,
  selected,
  disabled,
  children,
  color = 'primary',
  ...props
}: OptionProps<V>) {
  const styles = useStyles(optionStyles, props.class)

  return (
    <Box
      interact={inject(disabled, disabled => disabled ? undefined : 'clickable')}
      view={inject(selected, selected => selected ? 'filled' : 'ghost')}
      color={injectAll([disabled, color], ([disabled, color]) => disabled ? 'disabled' : color)}
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
