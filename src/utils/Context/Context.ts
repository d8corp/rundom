import type { Fn } from 'rune-hub'

import type { JSXElement } from '../../types'

type GetArray<T extends ReadonlyArray<Context>> = {
  [K in keyof T]: T[K] extends Context<infer D> ? D : never;
}

export type ContextData = Record<symbol, any>

export interface ContextProviderProps<C extends Context | ReadonlyArray<Context>> {
  /** Context or array of contexts to provide. */
  for: C;
  /** Value or array of values matching `for`. */
  set: C extends ReadonlyArray<Context> ? GetArray<C> : C extends Context<infer D> ? D : never;
  /** Content rendered with the provided context. */
  children: any;
}

/**
 * Key-value store shared through the component tree without prop drilling.
 * Values are read with `get()` and provided with `<Context.Provider>`.
 */
export class Context<T = unknown> {
  /** Context data of the current render. */
  static current: ContextData = Object.create(null)

  /** Runs `fn` with the given context data and restores the previous one. */
  static use <A extends Fn<[]>>(fn: A, context: ContextData = Context.current): ReturnType<A> {
    const prevParent = Context.current
    Context.current = context
    const result = fn()
    Context.current = prevParent

    return result
  }

  /** Creates a child context data object that inherits from the current one. */
  static nest (): ContextData {
    return Object.create(Context.current)
  }

  /** Rendering function used by `Context.Provider`, set by the runtime. */
  static render: (content: JSXElement) => void

  /** Provides one or several context values to its children. */
  static Provider <C extends Context | ReadonlyArray<Context>>(props: ContextProviderProps<C>) {
    const context = Context.nest()

    if (Array.isArray(props.for)) {
      const set = props.set as any[]

      for (let i = 0; i < props.for.length; i++) {
        props.for[i].set(set[i], context)
      }
    } else if (props.for instanceof Context) {
      props.for.set(props.set, context)
    }

    Context.use(() => Context.render(props.children), context)
  }

  key = Symbol('Context Key')

  constructor (public defaultValue: T) {}

  /** Reads the context value from the current or provided context data. */
  get<R extends T> (context: ContextData = Context.current): R {
    return this.key in context ? context[this.key] : this.defaultValue as R
  }

  /** Writes the context value into the current or provided context data. */
  set (value: T, context: ContextData = Context.current) {
    context[this.key] = value
  }
}
