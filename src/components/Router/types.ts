import { type Component } from '../../types'
import { type LazyFn } from '../../utils'

interface BaseNoLazyComponentRoute {
  component: Component
  permissions?: string[]
  fallback?: never
}

interface BaseLazyComponentRoute {
  component: LazyFn
  permissions?: string[]
  fallback?: JSX.Element
}

/** Route that renders a component, optionally lazy-loaded with a fallback. */
export type BaseComponentRoute = BaseLazyComponentRoute | BaseNoLazyComponentRoute

export interface BaseNoComponentRoute {
  component?: never
  permissions?: string[]
  fallback?: never
}

/** Common route fields: an optional path and an optional component. */
type BaseRoute = (BaseComponentRoute | BaseNoComponentRoute) & {
  /** Path segment(s) to match. Supports `:param`, optional `?` and union `:type[a|b]` segments. */
  path?: string
}

/** Route rendered when the parent path fully matches. */
type IndexRoute = BaseRoute & {
  /** Marks the route as the index route of its parent. */
  index: true
  children?: never
}

/** Route with optional nested children. */
type NoIndexRoute = BaseRoute & {
  index?: false
  /** Nested routes rendered as children of this route's component. */
  children?: Route[]
  /** Fallback shown while a lazy child is loading. */
  childrenFallback?: JSX.Element
}

/** A single declarative route entry accepted by `createRouting`. */
export type Route = IndexRoute | NoIndexRoute

/** Normalized route produced by `createRouting` for a matched path. */
export interface RoutingRoute {
  /** Component chain rendered for the route, from layout to leaf. */
  components: Array<Component | LazyFn>
  /** Fallbacks for the lazy components of the route. */
  fallback: JSX.Element[]
  /** Names of the dynamic params captured by the route. */
  params: string[]
}

/** Routing route that is only available when its permissions are present. */
export interface PermissionsRoutingRoute extends RoutingRoute {
  /** Permissions required to match the route. */
  permissions: Set<string>
}

/** Normalized routing tree created by `createRouting` and consumed by `<Router>`. */
export interface Routing {
  /** Route rendered at the end of the path. */
  index?: RoutingRoute
  /** Routes matched by an exact path segment. */
  strict?: Record<string, Routing>
  /** Routes matched by any segment, used for params. */
  children?: Routing
  /** Fallback route that matches the current path prefix. */
  rest?: RoutingRoute
  /** Permission-aware index routes. */
  indexList?: PermissionsRoutingRoute[]
  /** Permission-aware fallback routes. */
  restList?: PermissionsRoutingRoute[]
}
