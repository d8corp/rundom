import { Slot } from 'rune-hub'

/** Slot used by the runtime itself, e.g. for effects and internal state. */
export class SystemSlot<T = unknown> extends Slot<T> {}
