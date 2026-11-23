import { RDSlot } from '../../../RDSlot'

export interface HistoryStep {
  /** URL of the step. */
  url: string
}

export interface HistoryState {
  /** Stack of visited URLs. */
  steps: HistoryStep[]
  /** Horizontal scroll position of the step. */
  scrollX: number
  /** Vertical scroll position of the step. */
  scrollY: number
}

/** Reads the current state of the browser history or returns an empty state. */
export function getHistoryStateRaw (): HistoryState {
  return window.history.state ?? {
    steps: [],
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }
}

export const historyState = new RDSlot(getHistoryStateRaw)

/** Refreshes the reactive `historyState` from the browser history. */
export function updateHistoryState () {
  historyState.set(getHistoryStateRaw())
}
