import type { Slot } from 'rune-hub'

import { DevtoolsSlotPanel } from '../DevtoolsSlotPanel'
import { SlotStatus } from '../SlotStatus'

import { Show } from '../../../../../components'
import { useStyles } from '../../../../../hooks'
import type { RDColor } from '../../../../../types'
import { addUiCSS, stringify, viewTransition } from '../../../../../utils'
import { Button } from '../../../../block'
import { CloseIcon, SearchIcon } from '../../../../icons'
import { Divider } from '../../../../inline'
import { Input, Option, Options } from '../../../../interaction'
import type { CardProps } from '../../../../layout'
import { Card, CardContent } from '../../../../layout'
import { CardHeader } from '../../../../popup'
import type { FlexElement } from '../../../../primitive'
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

export type DevtoolsWindowStyles = typeof devtoolsWindowStyles

export type DevtoolsWindowProps<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> = CardProps<T, S>

export function DevtoolsWindowComponent<T extends FlexElement = 'div', S extends DevtoolsWindowStyles = DevtoolsWindowStyles> (props: DevtoolsWindowProps<T, S>) {
  const styles = useStyles(devtoolsWindowStyles, props.class)
  const { show, search, searchSlots, slots, props: devtoolsProps, systemFilter, errorFilter, anonFilter, errors, values, selected } = devtoolsStoreContext.get()!

  const clickHandler = (slot: Slot<boolean | null>) => () => {
    if (slot.raw === null) {
      slot.set(true)
    } else if (slot.raw) {
      slot.set(false)
    } else {
      slot.set(null)
    }
  }

  const colorHandler = (slot: Slot<boolean | null>) => (): RDColor => {
    return slot.value ? 'success' : slot.value === false ? 'danger' : 'primary'
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
    <Card {...props} class={styles.root}>
      <CardHeader>
        <Box size='xs' color='danger' circle interact='clickable' onclick={close}>
          <CloseIcon size={8} />
        </Box>
        <Flex flex justify='center' padding={[0, 24, 0, 0]}>
          Devtools
        </Flex>
      </CardHeader>
      <CardContent>
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
            <Show when={devtoolsProps.system}>
              <Button
                data-shine
                circle
                size='s'
                color={colorHandler(systemFilter)}
                onclick={clickHandler(systemFilter)}
              >
                System
              </Button>
            </Show>
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
      </CardContent>
    </Card>
  )
}

export const DevtoolsWindow = import.meta.env?.RD_UI_DEVTOOLS_WINDOW
  ? import.meta.require?.(import.meta.env.RD_UI_DEVTOOLS_WINDOW).DevtoolsWindow as typeof DevtoolsWindowComponent
  : DevtoolsWindowComponent
