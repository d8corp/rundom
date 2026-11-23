import { Slot } from 'rune-hub'

/** Slot used by the runtime itself, e.g. for effects and internal state. */
export class RDSlot<T = unknown> extends Slot<T> {}
