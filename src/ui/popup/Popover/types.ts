import type { Fn, Slot } from 'rune-hub'

import type {
  POPOVER_DYNAMIC_PLACEMENT_PREFIX,
  POPOVER_DYNAMIC_POSTFIX,
  POPOVER_STATIC_PLACEMENT_PREFIX,
  POPOVER_STATIC_POSTFIX,
} from './constants'

import type { DomElement, ObservableProp } from '../../../types'
import type { Ref } from '../../../utils'

export type PopoverStaticPlacementPrefix = (typeof POPOVER_STATIC_PLACEMENT_PREFIX)[number]
export type PopoverDynamicPlacementPrefix = (typeof POPOVER_DYNAMIC_PLACEMENT_PREFIX)[number]
export type PopoverPlacementPrefix = PopoverStaticPlacementPrefix | PopoverDynamicPlacementPrefix
export type PopoverStaticPlacementPostfix = (typeof POPOVER_STATIC_POSTFIX)[number]
export type PopoverDynamicPlacementPostfix = (typeof POPOVER_DYNAMIC_POSTFIX)[number]
export type PopoverPlacementPostfix = PopoverStaticPlacementPostfix | PopoverDynamicPlacementPostfix
export type PopoverPlacement = `${PopoverPlacementPrefix}-${PopoverPlacementPostfix}`
export type PopoverStaticSplitPlacement = [PopoverStaticPlacementPrefix, PopoverStaticPlacementPostfix]
export type PopoverAction = 'update' | 'close'
export type PopoverTarget = Ref<DomElement> | 'parent' | 'before' | 'after'
export type PopoverObserver = (params: PopoverObserverParams) => void
export type PopoverTrigger<T = unknown> = (params: PopoverTriggerParams<T>) => T

export interface PopoverTriggerParams<T = unknown> {
  target: DomElement
  card: Ref<HTMLDivElement>
  open: Fn
  close: Fn
  hidden: Slot<boolean>
  opened: ObservableProp<boolean>
  context: T
}

export interface PopoverObserverParams {
  target: DomElement
  close: Fn
  update: Fn
}
