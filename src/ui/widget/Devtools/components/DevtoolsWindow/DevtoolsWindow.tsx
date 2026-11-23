import type { Slot } from 'rune-hub'

import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'
import { SlotStatus } from '../SlotStatus'

import { For, Show } from '../../../../../components'
import { useStyles } from '../../../../../hooks'
import type { ObservableProp } from '../../../../../types'
import { addUiCSS, stringify, use, viewTransition } from '../../../../../utils'
import { Button } from '../../../../block'
import { CloseIcon, SearchIcon } from '../../../../icons'
import { Divider } from '../../../../inline'
import { Input, Option, Options } from '../../../../interaction'
import type { CardProps, CardStyles } from '../../../../layout'
import { Body, Card } from '../../../../layout'
import { Header } from '../../../../popup'
import type { BoxColor, FlexElement } from '../../../../primitive'
import { Box, Flex } from '../../../../primitive'
import { Description, Text } from '../../../../typography'
import { devtoolsStoreContext } from '../../hooks'

if (import.meta.env?.RD_THEME_DEVTOOLS_WINDOW) {
  addUiCSS(import.meta.env.RD_THEME_DEVTOOLS_WINDOW, 'devtools-window')
}

export const devtoolsWindowStyles = {
  root: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ROOT,
  clickable: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__CLICKABLE,
  m: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__M,
  s: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__S,
  l: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__L,
  filter: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER,
  content: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__CONTENT,
  list: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__LIST,
  virtualList: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__VIRTUAL_LIST,
  aside: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ASIDE,
  asideHeader: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__ASIDE_HEADER,
  filterButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_BUTTON,
  filterOnButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_ON_BUTTON,
  filterOffButton: import.meta.env?.RD_THEME_DEVTOOLS_WINDOW__FILTER_OFF_BUTTON,
}

export type DevtoolsWindowStyles = typeof devtoolsWindowStyles & CardStyles

export type DevtoolsWindowProps<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> = CardProps<T, S>

export function DevtoolsWindowComponent<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> (props: DevtoolsWindowProps<T, S>) {
  const styles = useStyles(devtoolsWindowStyles, props.class)
  const { show, search, searchSlots, slots, props: devtoolsProps, filter, errorFilter, anonFilter, errors, values, selected } = devtoolsStoreContext.get()!

  const clickHandler = (slot: Slot<boolean | null>) => () => {
    if (slot.raw === null) {
      slot.set(true)
    } else if (slot.raw) {
      slot.set(false)
    } else {
      slot.set(null)
    }
  }

  const handleFilterClick = (name: string) => () => {
    const value = filter.raw[name]

    if (value === null) {
      filter.set({ ...filter.raw, [name]: true })
    } else if (value) {
      filter.set({ ...filter.raw, [name]: false })
    } else {
      filter.set({ ...filter.raw, [name]: null })
    }
  }

  const colorHandler = (slot: ObservableProp<boolean | null>) => (): BoxColor => {
    const result = use(slot)

    return result ? 'success' : result === false ? 'danger' : 'primary'
  }

  const handleExport = () => {
    const result = searchSlots.raw.map(slot => ({
      name: slot.rune.name,
      value: slot.cur,
    }))

    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  }

  const close = () => {
    viewTransition(() => {
      show.set(false)
    })
  }

  return (
    <Card size='l' vertical {...props} class={styles.root}>
      <Header>
        <Box size='xs' color='danger' view='filled' circle interact='clickable' onclick={close}>
          <CloseIcon size={8} />
        </Box>
        <Flex flex justify='center' padding={[0, 24, 0, 0]}>
          Devtools
        </Flex>
      </Header>
      <Body>
        <div class={styles.aside}>
          <div class={styles.asideHeader}>
            <Input
              flex
              size='s'
              circle
              autofocus
              clearable
              debounce
              value={search}
              name='search'
              before={<SearchIcon />}
              after={<Text lineHeight='1em'>{() => `${searchSlots.value.length} / ${slots.value.size}`}</Text>}
            />
          </div>
          <Options
            size='l'
            flex
            selected={selected}
            values={searchSlots}
            children={props => (
              <Option vertical align='start' {...props}>
                <Flex gap={8} align='center'>
                  <SlotStatus slot={props.value} />
                  <Text nowrap>{props.value.value.rune.name || '—'}</Text>
                </Flex>
                <Description nowrap>
                  {() => stringify(values.value.get(props.value.value))}
                </Description>
              </Option>
            )}
          />
        </div>
        <div class={styles.content}>
          <div class={styles.filter}>
            <Show when={devtoolsProps.anon}>
              <Button
                size='s'
                data-shine
                circle
                color={colorHandler(anonFilter)}
                onclick={clickHandler(anonFilter)}
              >
                Anon
              </Button>
            </Show>
            <For of={Object.keys(devtoolsProps.filter ?? {})}>
              {name => (
                <Button
                  data-shine
                  circle
                  size='s'
                  color={colorHandler(() => filter.value[name])}
                  onclick={handleFilterClick(name)}
                >
                  {name}
                </Button>
              )}
            </For>
            <Button
              data-shine
              circle
              size='s'
              color={colorHandler(errorFilter)}
              onclick={clickHandler(errorFilter)}
            >
              Errors: {() => errors.value.size}
            </Button>
            <Divider vertical />
            <Button size='s' onclick={handleExport}>
              Export
            </Button>
          </div>
          <DevtoolsSlotPanel />
        </div>
      </Body>
    </Card>
  )
}

export const DevtoolsWindow = import.meta.env?.RD_UI_DEVTOOLS_WINDOW
  ? import.meta.require?.(import.meta.env.RD_UI_DEVTOOLS_WINDOW).DevtoolsWindow as typeof DevtoolsWindowComponent
  : DevtoolsWindowComponent
