import type { Slot } from 'rune-hub'
import { batch, unwatch } from 'rune-hub'

import { parentContext } from '../../constants'
import { useClear, useCtx } from '../../hooks'
import { rundom } from '../../rundom'
import type { JSXElement, ObservableProp } from '../../types'
import type { ContextData } from '../../utils'
import {
  after,
  append,
  before,
  Content,
  Context,
  dissolve,
  lcs,
  observablePropToStaticOrReactive,
  prepend,
  RDSlot,
} from '../../utils'

/**
 * Context that provides the reactive index of the current item inside `<For>`.
 * @experimental
 */
export const forIndexContext = new Context<Slot<number> | undefined>(undefined)
/**
 * Context that provides the reactive value of the current item inside `<For>`.
 * @experimental
 */
export const forValueContext = new Context<Slot | undefined>(undefined)

const watcherContext = new Context<Slot | undefined>(undefined)

/** Resolves the key type produced by `getForKey` for an item type and a key accessor. */
export type GetForKey<T, K> = K extends undefined
  ? T
  : [K] extends [(item: T) => infer R]
      ? R
      : [K] extends [keyof T]
          ? T[K]
          : T

/**
 * Extracts the identity key from a list item using a field name, a mapper function,
 * or returns the item itself when no key is given.
 */
export function getForKey<T, K> (key: K, value: T): GetForKey<T, K> {
  if (typeof key === 'function') {
    return key(value)
  } else if (key === undefined) {
    return value as GetForKey<T, K>
  } else {
    return value[key as keyof T] as GetForKey<T, K>
  }
}

type GetType<O extends ObservableProp<Iterable<any>>> = O extends ObservableProp<Iterable<infer T>> ? T : never
/** A field name or mapper function that identifies each item rendered by `<For>`. */
export type ForKey<O extends ObservableProp<Iterable<any>>> = keyof GetType<O> | ((item: GetType<O>) => any)

export interface ForProps<O extends ObservableProp<Iterable<any>>> {
  /** Static or reactive iterable that supplies the rendered items. */
  of: O
  /** Field name or function that identifies items for reconciliation. */
  key?: ForKey<O>
  /**
   * Render function for every item. Receives the item and its index,
   * which are plain values for static lists and reactive slots for dynamic ones.
   */
  children?: (value: O extends Iterable<GetType<O>> ? GetType<O> : Slot<GetType<O>>, index: O extends Iterable<GetType<O>> ? number : Slot<number>) => JSX.Element
}

/**
 * Renders an iterable as a list of DOM nodes and reconciles the result on updates.
 * Unchanged items keep their DOM through the LCS algorithm, so only moved and new items are touched.
 */
export function For<O extends ObservableProp<Iterable<any>>> ({
  key,
  of: ofPropRaw,
  children,
}: ForProps<O>) {
  if (!children || !ofPropRaw) return

  const ofProp = observablePropToStaticOrReactive(ofPropRaw)

  if (typeof ofProp !== 'function') return Array.from(ofProp).map<JSX.Element>(children as any)

  let keysList: any[] = []
  const handlersMap = new Map<any, ContextData>()

  useClear(() => {
    handlersMap.forEach((data) => watcherContext.get(data)?.destroy())
  })

  return function For () {
    const values = ofProp()
    const childHandler = Context.current
    const mainContent = parentContext.get()!

    if (!useCtx()!.inited) {
      let index = 0

      for (const value of values) {
        const valueKey = getForKey(key, value)

        if (handlersMap.has(valueKey)) continue

        keysList.push(valueKey)

        const deepHandler = Context.nest()
        const deepContent = new Content()
        parentContext.set(deepContent, deepHandler)
        append(parentContext.get(), deepContent)
        const currentIndex = index++
        const forIndex = () => currentIndex
        const forValue = () => value
        const indexState = new RDSlot(forIndex)
        const valueState = new RDSlot(forValue)

        forValueContext.set(valueState, deepHandler)
        forIndexContext.set(indexState, deepHandler)
        handlersMap.set(valueKey, deepHandler)

        const deepRender = (children: JSXElement) => Context.use(() => rundom(children), deepHandler)

        watcherContext.set(unwatch(() => {
          const deepForRender = () => {
            deepRender(children(valueState as any, indexState as any))
          }

          const result = new RDSlot(deepForRender)

          result.on()

          return result
        }), deepHandler)
      }

      return
    }

    const oldKeysList = keysList
    const oldKeysSet = new Set(oldKeysList)
    keysList = []

    for (const value of values) {
      keysList.push(getForKey(key, value))
    }

    const keepKeys = new Set(lcs(oldKeysList, keysList))

    let i = 0

    for (const value of values) {
      const index = i++
      const valueKey = keysList[index]

      if (handlersMap.has(valueKey)) {
        const keep = keepKeys.has(valueKey)
        const deepHandler = handlersMap.get(valueKey)!

        batch(() => {
          forValueContext.get(deepHandler)!.set(value)
          forIndexContext.get(deepHandler)!.set(index)
        })

        if (!keep) {
          const content = parentContext.get(deepHandler)

          if (index) {
            after(parentContext.get(handlersMap.get(keysList[index - 1])), content)
          } else if (oldKeysList.length) {
            before(parentContext.get(handlersMap.get(oldKeysList[0])), content)
          } else {
            prepend(mainContent, content)
          }
        }
      } else {
        const content = new Content()
        const deepHandler = Object.create(childHandler)
        parentContext.set(content, deepHandler)
        const forIndex = () => index
        const forValue = () => value
        const valueState = new RDSlot(forValue)
        const indexState = new RDSlot(forIndex)

        forValueContext.set(valueState, deepHandler)
        forIndexContext.set(indexState, deepHandler)
        handlersMap.set(valueKey, deepHandler)

        if (index) {
          after(parentContext.get(handlersMap.get(keysList[index - 1])), content)
        } else if (oldKeysList.length) {
          before(parentContext.get(handlersMap.get(oldKeysList[0])), content)
        } else {
          prepend(mainContent, content)
        }

        const deepRender = (children: JSXElement) => Context.use(() => rundom(children), deepHandler)

        watcherContext.set(unwatch(() => {
          const deepForRender = () => {
            deepRender(children(valueState as any, indexState as any))
          }

          const result = new RDSlot(deepForRender)

          result.on()

          return result
        }), deepHandler)
      }

      oldKeysSet.delete(valueKey)
    }

    oldKeysSet.forEach(valueKey => {
      const deepHandler = handlersMap.get(valueKey)!
      handlersMap.delete(valueKey)
      dissolve(parentContext.get(deepHandler))
      watcherContext.get(deepHandler)!.destroy()
    })
  }
}
