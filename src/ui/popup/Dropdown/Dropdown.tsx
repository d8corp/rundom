import type { PopoverProps, PopoverStyles } from '../Popover'
import { Popover } from '../Popover'

import type { ForKey } from '../../../components'
import { useStyles } from '../../../hooks'
import type { JSXElement, Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, getSlotEvent, inject, RDSlot, use } from '../../../utils'
import type { GetOptionValue, OptionsProps, RenderOption, SelectOnSelect } from '../../interaction'
import { Options } from '../../interaction'

if (import.meta.env?.RD_THEME_DROPDOWN) {
  addUiCSS(import.meta.env.RD_THEME_DROPDOWN, 'dropdown')
}

export const dropdownStyles = {
  root: import.meta.env?.RD_THEME_DROPDOWN__ROOT,
}

export type DropdownStyles = typeof dropdownStyles & PopoverStyles

/**
 * Props forwarded to the `<Options>` list inside `<Dropdown>`.
 * The selection props are excluded because the dropdown controls them.
 */
export type DropdownOptionsProps<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
> = Omit<
  OptionsProps<T, M, K>,
  'children' | 'values' | 'key' | 'selected' | 'size' | 'multiple' | 'onSelect'
>

/**
 * Props for `<Dropdown>`: popover props plus the options list props.
 */
export type DropdownProps<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
  S extends DropdownStyles = DropdownStyles,
> = Merge<PopoverProps<S>, {
  /** Values rendered as selectable rows inside the list. */
  values: ObservableProp<T[]>
  /** Field name or function that identifies each row. */
  key?: K
  /** Selected value, or an array of values when `multiple` is set. */
  selected?: ObservableProp<GetOptionValue<T, M, K>>
  /** Row size of the options list. */
  size?: ObservableProp<SMLSize>
  /** Allows selecting several rows at once. */
  multiple?: ObservableProp<M>
  /** Called after the selection changes. */
  onSelect?: SelectOnSelect<T, M, K>
  /** Replaces the default row renderer. */
  children?: RenderOption<T>
  /** Content rendered before the list, inside the popover. */
  before?: JSXElement
  /** Content rendered after the list, inside the popover. */
  after?: JSXElement
  /** Extra props forwarded to the inner `<Options>` list. */
  optionsProps?: DropdownOptionsProps<T, M, K>
}>

/**
 * Popover that contains an `<Options>` list.
 * Inherits the positioning, triggers and open state of `<Popover>`
 * and the selection behavior of `<Options>`.
 */
export function DropdownComponent<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
  S extends DropdownStyles = DropdownStyles,
> ({
  values,
  key,
  multiple,
  selected = new RDSlot(() => (use(multiple) ? [] : undefined) as GetOptionValue<T, M, K>),
  size,
  onSelect,
  children,
  before,
  after,
  height,
  style,
  optionsProps,
  opened = new RDSlot(() => false),
  onChangeOpened,
  ...props
}: DropdownProps<T, M, K, S>) {
  const styles = useStyles(dropdownStyles, props.class)
  const setOpened = getSlotEvent(opened, onChangeOpened)

  const handleSelect: SelectOnSelect<T, M, K> = selected => {
    onSelect?.(selected)

    if (!use(multiple)) {
      setOpened?.(false)
    }
  }

  return (
    <Popover
      vertical
      {...props}
      style={{
        'max-height': inject(height, height => typeof height === 'number' ? `${height}px` : height),
        ...style,
      }}
      opened={opened}
      onChangeOpened={onChangeOpened}
      class={styles}
    >
      {before}
      <Options
        values={values}
        key={key}
        selected={selected}
        size={size}
        multiple={multiple}
        onSelect={handleSelect}
        children={children}
        {...optionsProps}
      />
      {after}
    </Popover>
  )
}

export const Dropdown = import.meta.env?.RD_UI_DROPDOWN
  ? import.meta.require?.(import.meta.env.RD_UI_DROPDOWN).Dropdown as typeof DropdownComponent
  : DropdownComponent
