import { classes } from 'html-classes'
import { Slot } from 'rune-hub'

import type { OptionProps } from '../Option'
import { Option } from '../Option'

import type { ForKey, GetForKey } from '../../../components'
import { For, getForKey } from '../../../components'
import { useStyles, useVirtualList } from '../../../hooks'
import type { ObservableProp, Reactive, SMLSize } from '../../../types'
import { addUiCSS, getSlotEvent, inject, injectAll, Ref, use } from '../../../utils'
import type { ScrollbarProps, ScrollbarStyles } from '../../layout'
import { Scrollbar } from '../../layout'

export type RenderOption<T = unknown> = (props: OptionProps<Slot<T>>, index: Reactive<number>) => JSX.Element

export type SelectOnSelect<
  T,
  M extends boolean,
  K extends ForKey<T[]> | undefined = undefined,
> = (selected: T extends null ? GetOptionValue<T, M, K> : Exclude<GetOptionValue<T, M, K>, null>) => void

export type GetOptionValue<
  T,
  M extends boolean,
  K extends ForKey<T[]> | undefined = undefined,
> = M extends true ? GetForKey<T, K>[] : GetForKey<T, K> | null

if (import.meta.env?.RD_THEME_OPTIONS) {
  addUiCSS(import.meta.env.RD_THEME_OPTIONS, 'options')
}

export const optionsStyles = {
  root: import.meta.env?.RD_THEME_OPTIONS__ROOT,
  options: import.meta.env?.RD_THEME_OPTIONS__OPTIONS,
  m: import.meta.env?.RD_THEME_OPTIONS__M,
  s: import.meta.env?.RD_THEME_OPTIONS__S,
  l: import.meta.env?.RD_THEME_OPTIONS__L,
}

export type OptionsStyles = typeof optionsStyles & ScrollbarStyles

export const optionSizeMap = {
  s: Number(import.meta.env?.RD_UI_OPTIONS__S ?? 34),
  m: Number(import.meta.env?.RD_UI_OPTIONS__M ?? 34),
  l: Number(import.meta.env?.RD_UI_OPTIONS__L ?? 34),
}

export const optionGapMap = {
  s: Number(import.meta.env?.RD_UI_OPTIONS__GAP_S ?? 4),
  m: Number(import.meta.env?.RD_UI_OPTIONS__GAP_M ?? 4),
  l: Number(import.meta.env?.RD_UI_OPTIONS__GAP_L ?? 4),
}

export const baseRenderOption: RenderOption = props => <Option {...props} />

export interface OptionsProps<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
  S extends OptionsStyles = OptionsStyles,
> extends Omit<ScrollbarProps<'div', S>, 'children'> {
  /** Values rendered as selectable rows. */
  values: ObservableProp<T[]>
  /** Field name or function that identifies each row. */
  key?: K
  /** Selected value, or an array of values when `multiple` is set. */
  selected?: ObservableProp<GetOptionValue<T, M, K>>
  /** Row size. */
  size?: ObservableProp<SMLSize>
  /** Allows selecting several rows at once. */
  multiple?: ObservableProp<M>
  /** Called after the selection changes. */
  onSelect?: SelectOnSelect<T, M, K>
  /** Replaces the default row renderer. */
  children?: RenderOption<T>
}

/**
 * Virtualized list of `<Option>` rows inside a `<Scrollbar>`.
 * Supports single and multiple selection and a custom row renderer.
 */
export function OptionsComponent<
  T = unknown,
  M extends boolean = false,
  K extends ForKey<T[]> | undefined = undefined,
  S extends OptionsStyles = OptionsStyles,
> ({
  values,
  ref = new Ref<HTMLDivElement>(),
  size = 'm',
  key,
  children = baseRenderOption,
  multiple,
  selected = new Slot(() => (use(multiple) ? [] : undefined) as GetOptionValue<T, M, K>),
  onSelect,
  ...props
}: OptionsProps<T, M, K, S>) {
  const styles = useStyles(optionsStyles, props.class)
  const setSelected = getSlotEvent(selected, onSelect)

  const { virtualList, offsetTop, offsetBottom, scrollIndex } = useVirtualList({
    list: values,
    scrollbar: ref,
    itemHeight: inject(size, size => optionSizeMap[size]),
    gap: inject(size, size => optionGapMap[size]),
  })

  return (
    <Scrollbar
      {...props}
      class={injectAll([styles.root, size], ([root, size]) => classes([root, styles[size]]))}
      ref={ref}
    >
      <div class={styles.options} style={{ 'padding-top': offsetTop, 'padding-bottom': offsetBottom }}>
        <For of={virtualList} key={key}>
          {(item, index) => {
            return children({
              selected: () => use(multiple) ? Boolean(use(selected as T[])?.includes(getForKey(key, item.value))) : getForKey(key, item.value) === use(selected),
              size,
              value: item,
              onclick: () => {
                const itemValue = getForKey(key, item.raw)

                if (use(multiple)) {
                  const currentSelected = use(selected as T[])

                  if (currentSelected.includes(itemValue)) {
                    setSelected?.(currentSelected.filter(v => v !== itemValue) as any)
                  } else {
                    setSelected?.([...currentSelected, itemValue] as any)
                  }
                } else {
                  setSelected?.(itemValue as any)
                }
              },
            }, () => scrollIndex.value + index.value)
          }}
        </For>
      </div>
    </Scrollbar>
  )
}

export const Options = import.meta.env?.RD_UI_OPTIONS
  ? import.meta.require?.(import.meta.env.RD_UI_OPTIONS).Options as typeof OptionsComponent
  : OptionsComponent
