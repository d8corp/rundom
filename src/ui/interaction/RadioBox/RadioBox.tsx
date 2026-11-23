import type { ControlBoxProps, ControlBoxStyles } from '../ControlBox'
import { ControlBox } from '../ControlBox'

import { useStyles } from '../../../hooks'
import { addUiCSS } from '../../../utils'
import type { FlexElement } from '../../primitive'

if (import.meta.env?.RD_THEME_RADIO_BOX) {
  addUiCSS(import.meta.env.RD_THEME_RADIO_BOX, 'radio-box')
}

export const radioBoxStyles = {
  root: import.meta.env?.RD_THEME_RADIO_BOX__ROOT,
}

export type RadioBoxStyles = typeof radioBoxStyles & ControlBoxStyles

/** Props for `<RadioBox>`: box props plus native radio behavior. */
export type RadioBoxProps<T extends FlexElement = 'div', S extends RadioBoxStyles = RadioBoxStyles> = ControlBoxProps<T, S>

/**
 * Radio button with a hidden native `<input type="radio">` for forms and accessibility.
 * Group radios with the same `name`.
 */
function RadioBoxComponent<T extends FlexElement = 'div', S extends RadioBoxStyles = RadioBoxStyles> (
  props: RadioBoxProps<T, S>,
) {
  const styles = useStyles(radioBoxStyles, props.class)

  return <ControlBox {...props} inputProps={{ ...props.inputProps, type: 'radio' }} class={styles} />
}

export const RadioBox = import.meta.env?.RD_UI_RADIO_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_RADIO_BOX).RadioBox as typeof RadioBoxComponent
  : RadioBoxComponent
