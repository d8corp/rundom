import type { ControlBoxProps, ControlBoxStyles } from '../ControlBox'
import { ControlBox } from '../ControlBox'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement } from '../../primitive'

if (import.meta.env?.RD_THEME_TOGGLE) {
  addUiCSS(import.meta.env.RD_THEME_TOGGLE, 'toggle')
}

export const toggleStyles = {
  root: import.meta.env?.RD_THEME_TOGGLE__ROOT,
}

export type ToggleStyles = typeof toggleStyles & ControlBoxStyles

/** Props for `<Toggle>`: box props plus native switch behavior. */
export type ToggleProps<T extends FlexElement = 'div', S extends ToggleStyles = ToggleStyles> = ControlBoxProps<T, S>

/**
 * A switch that toggles a single option on or off.
 * Renders a hidden native `<input type="checkbox">`, so keyboard, form and accessibility behavior stay intact.
 */
export function ToggleComponent<T extends FlexElement = 'div', S extends ToggleStyles = ToggleStyles> (
  props: ToggleProps<T, S>,
) {
  const styles = useStyles(toggleStyles, props.class)

  return <ControlBox size='m' {...props} inputProps={{ ...props.inputProps, role: 'switch' }} class={styles} />
}

export const Toggle = import.meta.env?.RD_UI_TOGGLE
  ? import.meta.require?.(import.meta.env.RD_UI_TOGGLE).Toggle as typeof ToggleComponent
  : ToggleComponent
