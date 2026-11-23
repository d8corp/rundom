import { batch, Hub, type Slot } from 'rune-hub'

import type { DevtoolsProps } from './Devtools'

import { Context, RDSlot } from '../../../utils'

export type DevtoolsStore = ReturnType<typeof useCreateDevtoolsStore>
export const devtoolsStoreContext = new Context<DevtoolsStore | undefined>(undefined)

export function useCreateDevtoolsStore (props: DevtoolsProps, devHub: Hub) {
  const hub = Hub.cur || Hub.root

  const filterNames = Object.keys(props.filter || {})
  const search = new RDSlot(() => '', devHub)
  const anonFilter = new RDSlot<boolean | null>(() => false, devHub)
  const errorFilter = new RDSlot<boolean | null>(() => null, devHub)
  const selected = new RDSlot<Slot | undefined>(() => {}, devHub)
  const show = new RDSlot(() => false, devHub)
  const slots = new RDSlot<Set<Slot>>(() => new Set(Array.from(hub.slots.values()).filter(slot => !(slot instanceof RDSlot))), devHub)

  const filter = new RDSlot<Record<string, boolean | null>>(() => filterNames.reduce((result, name) => {
    result[name] = false

    return result
  }, {} as Record<string, boolean | null>), devHub)

  const filteredSlots = new RDSlot(() => {
    const filterMap = filter.value
    const isAnon = anonFilter.value
    const isError = errorFilter.value

    const isNotFiltered = filterNames.every(name => filterMap[name] === null)

    if (isAnon === null && isError === null && isNotFiltered) {
      return Array.from(slots.value)
    }

    return Array.from(slots.value).filter(slot => {
      if (!isNotFiltered && filterNames.some(name => {
        const value = filterMap[name]

        if (value === null) return false

        const constructor = props.filter![name]
        const isSystemSlot = slot instanceof constructor

        return value !== isSystemSlot
      })) {
        return false
      }

      if (isAnon !== null) {
        const inHub = hub.slots.has(slot.rune)

        if (isAnon && inHub) return false
        if (!isAnon && !inHub) return false
      }

      if (isError !== null) {
        return Boolean(slot.err) === isError
      }

      return true
    })
  }, devHub)

  const searchSlots = new RDSlot(() => {
    const value = search.value.toLowerCase()

    return value ? filteredSlots.value.filter(slot => slot.rune.name.toLowerCase().includes(value)) : filteredSlots.value
  }, devHub)

  const values = new RDSlot<Map<Slot, unknown>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.raw])), devHub)
  const errors = new RDSlot<Map<Slot, unknown>>(() => new Map(), devHub)
  const ups = new RDSlot<Map<Slot, boolean>>(() => new Map(Array.from(slots.raw).map(slot => [slot, slot.up])), devHub)

  let isWillUpdate = false
  const willUpdate = new Set<Slot>()

  const update = (slot: Slot) => {
    willUpdate.add(slot)
    if (isWillUpdate) return
    isWillUpdate = true

    queueMicrotask(() => {
      const slots = Array.from(willUpdate)
      willUpdate.clear()
      isWillUpdate = false

      batch(() => {
        for (const slot of slots) {
          slot.update()
        }
      })
    })
  }

  const check = (slot: Slot) => {
    return !props.anon && !hub.slots.has(slot.rune)
  }

  const clear = (slot: Slot) => {
    slots.raw.delete(slot)
    values.raw.delete(slot)
    errors.raw.delete(slot)
    ups.raw.delete(slot)

    update(slots)
    update(values)
    update(errors)
    update(ups)
  }

  hub.on('init', slot => {
    if (check(slot)) return

    if (!slot.anon) {
      slots.raw.add(slot)
      values.raw.set(slot, slot.raw)
      update(slots)
      update(values)
    }
  })

  hub.on('change', slot => {
    if (check(slot)) return

    if (values.raw.has(slot)) {
      values.raw.set(slot, slot.raw)
      update(values)
    }
  })

  hub.on('error', slot => {
    errors.raw.set(slot, slot.err)
    update(errors)
  })

  hub.on('up', slot => {
    if (check(slot)) return

    if (values.raw.has(slot)) {
      ups.raw.set(slot, true)
      update(ups)
    } else {
      slots.raw.add(slot)
      values.raw.set(slot, slot.raw)
      ups.raw.set(slot, true)
      update(slots)
      update(values)
      update(ups)
    }
  })

  hub.on('down', slot => {
    if (check(slot)) return

    if (!slot.anon) {
      ups.raw.set(slot, false)
      update(ups)

      return
    }

    clear(slot)
  })

  hub.on('destroy', slot => {
    if (check(slot)) return

    clear(slot)
  })

  return {
    search,
    selected,
    show,
    slots,
    searchSlots,
    values,
    errors,
    ups,
    hub,
    props,
    filter,
    errorFilter,
    anonFilter,
  }
}
