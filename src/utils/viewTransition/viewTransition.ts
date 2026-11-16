let ready = true
let running = false
let queue: Array<() => void> = []

/**
 * Runs `fn` inside a view transition when `RD_VIEW_TRANSITION` is enabled,
 * otherwise runs it immediately.
 */
export function viewTransition (fn: () => void) {
  if (import.meta.env?.RD_VIEW_TRANSITION === 'true') {
    startViewTransition(fn)
  } else {
    fn()
  }
}

/** Starts or queues a native view transition for `fn`. */
export function startViewTransition (fn: () => void) {
  if (running) {
    fn()

    return
  }

  if (!ready) {
    queue.push(fn)
  } else if (document.activeViewTransition) {
    document.activeViewTransition.finished.then(() => {
      startViewTransition(fn)
    })
  } else {
    ready = false
    queue.push(fn)

    document.startViewTransition(() => {
      running = true
      queue.forEach(call => call())
      queue = []
      ready = true
      running = false
    })
  }
}
