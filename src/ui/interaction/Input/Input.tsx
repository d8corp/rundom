import { Slot } from 'rune-hub'
import SyncTimer from 'sync-timer'

import { Show } from '../../../components'
import { useClear, useDebounceSlotEvent, useEffect, useStyles } from '../../../hooks'
import type { HTMLRef, Merge, ObservableProp } from '../../../types'
import { addUiCSS, getSlotEvent, inject, Ref, SystemSlot, use } from '../../../utils'
import type { FieldProps, FieldStyles } from '../../block'
import { Field } from '../../block'
import { CloseIcon } from '../../icons'

const transform = import.meta.env?.RD_THEME__TRANSFORM__INPUT &&
  import.meta.require?.(import.meta.env.RD_THEME__TRANSFORM__INPUT).default

if (import.meta.env?.RD_THEME_INPUT) {
  addUiCSS(import.meta.env.RD_THEME_INPUT, 'input')
}

export const inputStyles = {
  root: import.meta.env?.RD_THEME_INPUT__ROOT,
  primary: import.meta.env?.RD_THEME_INPUT__PRIMARY,
  accent: import.meta.env?.RD_THEME_INPUT__ACCENT,
  neutral: import.meta.env?.RD_THEME_INPUT__NEUTRAL,
  info: import.meta.env?.RD_THEME_INPUT__INFO,
  success: import.meta.env?.RD_THEME_INPUT__SUCCESS,
  warning: import.meta.env?.RD_THEME_INPUT__WARNING,
  danger: import.meta.env?.RD_THEME_INPUT__DANGER,
  disabled: import.meta.env?.RD_THEME_INPUT__DISABLED,
  square: import.meta.env?.RD_THEME_INPUT__SQUARE,
  squareLeft: import.meta.env?.RD_THEME_INPUT__SQUARE_LEFT,
  squareRight: import.meta.env?.RD_THEME_INPUT__SQUARE_RIGHT,
  circle: import.meta.env?.RD_THEME_INPUT__CIRCLE,
  label: import.meta.env?.RD_THEME_INPUT__LABEL,
  m: import.meta.env?.RD_THEME_INPUT__M,
  s: import.meta.env?.RD_THEME_INPUT__S,
  l: import.meta.env?.RD_THEME_INPUT__L,
  clear: import.meta.env?.RD_THEME_INPUT__CLEAR,
  input: import.meta.env?.RD_THEME_INPUT__INPUT,
}

export type InputStyles = typeof inputStyles

/** Options for focusing the input after mount. */
export interface InputFocusOptions extends FocusOptions {
  /** Delay before focusing, in milliseconds. */
  timeout?: number
}

/** Props for `<Input>`: field props plus native input behavior. */
export type InputProps<T extends string = string, S extends InputStyles = InputStyles> = Merge<FieldProps<'label', S & FieldStyles>, {
  /** Current input value. */
  value?: ObservableProp<T>
  /** Reference to the underlying native input. */
  inputRef?: HTMLRef<'input'>
  /** Native input name used by forms. */
  name?: ObservableProp<string>
  /** Placeholder text of the native input. */
  placeholder?: ObservableProp<string>
  /** Shows a clear button while the input has a value. */
  clearable?: ObservableProp<boolean>
  /** Focuses the input after mount; a number or `timeout` delays focusing. */
  autofocus?: boolean | number | InputFocusOptions
  /** Debounces value updates; `true` uses the default delay. */
  debounce?: ObservableProp<boolean | number>
  /** Called with the new value after input or debounce. */
  onChange?: (newValue: string) => void
}>

/**
 * Text input built on `<Field>` with an optional clear button, autofocus and debounce.
 * The native `<input>` receives user input; `value` keeps it in sync reactively.
 */
function InputComponent<T extends string = '', S extends InputStyles = InputStyles> ({
  value = new Slot<T>(() => '' as T),
  inputRef = new Ref<HTMLInputElement>(),
  name,
  placeholder,
  autofocus,
  clearable,
  debounce,
  onChange,
  ...props
}: InputProps<T, S>) {
  const styles = useStyles(inputStyles, props.class)
  const setValue = getSlotEvent(value, onChange)
  const setDebouncedValue = useDebounceSlotEvent(value, onChange, debounce)

  const handleInput = (e: any) => {
    setDebouncedValue?.(e.target.value)
  }

  if (autofocus) {
    const timer = new SyncTimer(() => {
      inputRef!.value!.focus(typeof autofocus === 'object' ? autofocus : undefined)
    }, typeof autofocus === 'number' ? autofocus : typeof autofocus === 'object' ? autofocus.timeout ?? 0 : 0)

    useClear(() => timer.cancel())
  }

  useEffect(() => {
    new SystemSlot(() => {
      inputRef!.value!.value = use(value)
    }).on()
  })

  const clearContent = inject(clearable, clearable => clearable
    ? (
      <Show when={value}>
        <CloseIcon
          onmousedown={(e: Event) => {
            e.preventDefault()
            setValue?.('' as T)
          }}
          class={styles.clear}
        />
      </Show>
      )
    : null,
  )

  return (
    <Field element='label' view='surface' interact='hoverable' {...props} after={[clearContent, props.after]} class={styles}>
      <input
        placeholder={placeholder}
        name={name}
        class={styles.input}
        ref={inputRef}
        oninput={handleInput}
      />
    </Field>
  )
}

export const Input = transform
  ? transform(InputComponent) as typeof InputComponent
  : InputComponent
