import { useEffect, useStyles } from '../../../hooks'
import type { HTMLProps, HTMLRef, Merge, ObservableProp } from '../../../types'
import { addUiCSS, getSlotEvent, inject, RDSlot, Ref, use } from '../../../utils'
import type { BoxProps, BoxStyles, FlexElement } from '../../primitive'
import { Box } from '../../primitive'

if (import.meta.env?.RD_THEME_CONTROL_BOX) {
  addUiCSS(import.meta.env.RD_THEME_CONTROL_BOX, 'control-box')
}

export const controlBoxStyles = {
  root: import.meta.env?.RD_THEME_CONTROL_BOX__ROOT,
  input: import.meta.env?.RD_THEME_CONTROL_BOX__INPUT,
}

export type ControlBoxStyles = typeof controlBoxStyles & BoxStyles

/** Props for `<Toggle>`: box props plus native switch behavior. */
export type ControlBoxProps<T extends FlexElement = 'div', S extends ControlBoxStyles = ControlBoxStyles> = Omit<Merge<BoxProps<T, S>, {
  /** Checked state of the component. */
  checked?: ObservableProp<boolean>
  /** Reference to the underlying native input. */
  inputRef?: HTMLRef<'input'>
  /** Native input name used by forms. */
  name?: ObservableProp<string>
  /** Disables the component and applies the disabled color. */
  disabled?: ObservableProp<boolean>
  /** Native input value used by forms. */
  value?: ObservableProp<string>
  /** Called with the new checked state. */
  onChange?: (checked: boolean) => void
  /** Custom props for the underlying native input. */
  inputProps?: HTMLProps<'input'>
}>, 'children'>

/**
 * A component that toggles a single option on or off.
 * Renders a hidden native `<input type="checkbox">`, so keyboard, form and accessibility behavior stay intact.
 */
export function ControlBoxComponent<T extends FlexElement = 'div', S extends ControlBoxStyles = ControlBoxStyles> ({
  checked,
  inputRef = new Ref<HTMLInputElement>(),
  disabled,
  name,
  value,
  onChange,
  inputProps,
  ...props
}: ControlBoxProps<T, S>) {
  const styles = useStyles(controlBoxStyles, props.class)
  const setChecked = getSlotEvent(checked, onChange)
  let click = false

  const handleChange = (e: any) => {
    click = true
    setChecked?.(e.target.checked)
    click = false
  }

  if (checked && checked !== true) {
    useEffect(() => {
      new RDSlot(() => {
        const value = Boolean(use(checked))

        if (!click) {
          inputRef.value!.checked = value
        }
      }).on()
    })
  }

  return (
    <Box
      size='s'
      element='label'
      interact={inject(disabled, disabled => disabled ? 'disabled' : 'clickable')}
      {...props as BoxProps<T, S>}
      class={styles}
    >
      <input
        type='checkbox'
        {...inputProps}
        class={styles.input}
        ref={inputRef}
        disabled={disabled}
        name={name}
        value={value}
        checked={checked === true}
        onchange={handleChange}
      />
    </Box>
  )
}

export const ControlBox = import.meta.env?.RD_UI_CONTROL_BOX
  ? import.meta.require?.(import.meta.env.RD_UI_CONTROL_BOX).ControlBox as typeof ControlBoxComponent
  : ControlBoxComponent
