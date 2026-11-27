import type { PopoverProps } from '../Popover'
import { Popover } from '../Popover'

import type { ForKey } from '../../../components'
import { useStyles } from '../../../hooks'
import type { JSXElement, Merge, ObservableProp, SMLSize } from '../../../types'
import { addUiCSS, getSlotEvent, RDSlot, use } from '../../../utils'
import type { GetOptionValue, RenderOption, SelectOnSelect } from '../../interaction'
import { Options } from '../../interaction'

if (import.meta.env?.RD_THEME_DROPDOWN) {
  addUiCSS(import.meta.env.RD_THEME_DROPDOWN, 'dropdown')
}

export const dropdownStyles = {
  root: import.meta.env?.RD_THEME_DROPDOWN__ROOT,
  options: import.meta.env?.RD_THEME_DROPDOWN__OPTIONS,
}

export type DropdownStyles = typeof dropdownStyles

/**
 * Props for `<Dropdown>`: popover props plus the options list props.
 */
export type DropdownProps<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
> = Merge<PopoverProps, {
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
> ({
  values,
  key,
  selected,
  size,
  multiple,
  onSelect,
  children,
  before,
  after,
  opened = new RDSlot(() => false),
  onChangeOpened,
  ...props
}: DropdownProps<T, M, K>) {
  const styles = useStyles(dropdownStyles, props.class)
  const setOpened = getSlotEvent(opened, onChangeOpened)

  const handleSelect: SelectOnSelect<T, M, K> = selected => {
    onSelect?.(selected)

    if (!use(multiple)) {
      // The card reopens itself on click, so close after the click has bubbled.
      queueMicrotask(() => setOpened?.(false))
    }
  }

  return (
    <Popover
      align='stretch'
      padding={4}
      vertical
      {...props}
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
        class={styles.options}
      />
      {after}
    </Popover>
  )
}

export const Dropdown = import.meta.env?.RD_UI_DROPDOWN
  ? import.meta.require?.(import.meta.env.RD_UI_DROPDOWN).Dropdown as typeof DropdownComponent
  : DropdownComponent
