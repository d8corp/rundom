import { classes } from 'html-classes'

import type { ControlBoxProps, ControlBoxStyles } from '../ControlBox'
import { ControlBox } from '../ControlBox'

import { useStyles } from '../../../hooks'
import type { ObservableProp } from '../../../types'
import { addUiCSS, inject, injectAll } from '../../../utils'
import type { FlexElement } from '../../primitive'

export type CheckBoxChecked = boolean | null

if (import.meta.env?.RD_THEME_CHECK_BOX) {
  addUiCSS(import.meta.env.RD_THEME_CHECK_BOX, 'check-box')
}

export const checkBoxStyles = {
  root: import.meta.env?.RD_THEME_CHECK_BOX__ROOT,
  indeterminate: import.meta.env?.RD_THEME_CHECK_BOX__INDETERMINATE,
}

export type CheckBoxStyles = typeof checkBoxStyles & ControlBoxStyles

/** Props for `<CheckBox>`: box props plus native checkbox behavior. */
export type CheckBoxProps<T extends FlexElement = 'div', S extends CheckBoxStyles = CheckBoxStyles> = Omit<ControlBoxProps<T, S>, 'checked'> & {
  checked?: ObservableProp<CheckBoxChecked>
}

/**
 * Checkbox with a hidden native `<input type="checkbox">` for forms and accessibility.
 * Supports normal, checked and indeterminate states.
 */
function CheckBoxComponent<T extends FlexElement = 'div', S extends CheckBoxStyles = CheckBoxStyles> (
  props: CheckBoxProps<T, S>,
) {
  const styles = useStyles(checkBoxStyles, props.class)

  const root = injectAll([
    styles.root,
    inject(props.checked, checked => checked === null && styles.indeterminate),
  ], classes)

  return (
    <ControlBox
      {...props as ControlBoxProps<T, S>}
      class={{ ...styles, root }}
    />
  )
}

export const CheckBox = import.meta.env?.RD_UI_CHECK_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_CHECK_BOX).CheckBox as typeof CheckBoxComponent
  : CheckBoxComponent
