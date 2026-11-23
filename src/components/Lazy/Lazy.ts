import type { Slot } from 'rune-hub'

import type { Component, JSXTypeProps, ObservableProp, Reactive } from '../../types'
import { JSXNode } from '../../types'
import type { LazyResult } from '../../utils'
import { RDSlot, use, viewTransition } from '../../utils'

export interface LazyProps<C extends Component = Component> {
  /** Component or promise of a lazy component to render. */
  component: Reactive<LazyResult<C> | C> | Slot<LazyResult<C> | C>
  /** Content rendered while the component promise is pending. */
  fallback?: JSX.Element
  /** When `false`, the component is not rendered. */
  show?: ObservableProp<boolean>
  /** Creates the element from the resolved component. */
  render?: (Component: C) => JSX.Element
  /** Cache shared between lazy modules of the same boundary. */
  cache?: Map<LazyResult, Component>
}

/**
 * Renders a component from a promise while showing `fallback` during loading.
 * Works with the `lazy()` utility, plain promises and ordinary components.
 */
export function Lazy<C extends Component = Component> ({
  component,
  fallback,
  show = true,
  render = (component) => new JSXNode(component, {} as JSXTypeProps<C>),
  cache = new Map(),
}: LazyProps<C>) {
  if (!show) return

  const lazyLoading = () => false
  const loading = new RDSlot(lazyLoading)

  const lazyLoadingEffect = () => {
    if (!use(show)) return

    const currentComponent = use(component)

    if (currentComponent instanceof Promise && !cache.has(currentComponent)) {
      loading.value = true

      currentComponent.then((component) => {
        cache.set(currentComponent, typeof component === 'function' ? component : component.default)

        viewTransition(() => {
          loading.set(false)
        })
      })
    }
  }

  new RDSlot(lazyLoadingEffect).on()

  return () => {
    if (!use(show)) return null

    const currentComponent = use(component)

    if (typeof currentComponent === 'function') return render(currentComponent)

    const loadedComponent = cache.get(currentComponent) as C

    if (loadedComponent) {
      return render(loadedComponent)
    }

    if (loading.value) return fallback

    throw Error('Error in Lazy component. component has wrong result of promise.')
  }
}
