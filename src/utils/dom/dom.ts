import type { Child, DomElement, IContent, Parent } from '../../types'

/** Virtual node that groups children in the custom DOM tree. */
export class Content implements IContent {
  _parent?: Parent
  _prev?: Child
  _next?: Child
  _first?: Child
  _last?: Child
}

export function virtualRemove (target: Child) {
  if (!target._parent) return

  if (target._parent._first === target) {
    target._parent._first = target._next
  }

  if (target._parent._last === target) {
    target._parent._last = target._prev
  }

  if (target._prev) {
    target._prev._next = target._next
  }

  if (target._next) {
    target._next._prev = target._prev
  }

  target._prev = target._next = target._parent = undefined
}

export function getElement (target: Child) {
  while (target instanceof Content) {
    if (!target._parent) {
      return undefined
    }

    target = target._parent
  }

  return target
}

export function getParentElement (target: Child): DocumentFragment | DomElement | undefined {
  if (!target._parent) return undefined

  return getElement(target._parent) as DocumentFragment | DomElement
}

export function getFirstElement (target: Child): DomElement | Text | undefined {
  if (!(target instanceof Content)) {
    return target instanceof DocumentFragment ? undefined : target
  }

  let child = target._first

  while (child) {
    const result = getFirstElement(child)

    if (result) return result

    child = child._next
  }
}

export function getLastElement (target: Child): DomElement | Text | undefined {
  if (!(target instanceof Content)) {
    return target instanceof DocumentFragment ? undefined : target
  }

  let child = target._last

  while (child) {
    const result = getLastElement(child)

    if (result) return result

    child = child._prev
  }
}

export function getNextElement (target: Child): DomElement | Text | undefined {
  if (target._next) {
    return getFirstElement(target._next) ?? getNextElement(target._next)
  }

  return target._parent instanceof Content ? getNextElement(target._parent) : undefined
}

export function getPrevElement (target: Child): DomElement | Text | undefined {
  if (target._prev) {
    return getLastElement(target._prev) ?? getPrevElement(target._prev)
  }

  return target._parent instanceof Content ? getPrevElement(target._parent) : undefined
}

export function getNextDomElement (target: Child): DomElement | undefined {
  let element = getNextElement(target)

  while (element && element instanceof Text) {
    element = getNextElement(target)
  }

  return element
}

export function getPrevDomElement (target: Child): DomElement | undefined {
  let element = getPrevElement(target)

  while (element && element instanceof Text) {
    element = getPrevElement(target)
  }

  return element
}

export function getElements (target: Content) {
  const result: Array<DomElement | Text> = []

  let current = target._first

  while (current) {
    if (current instanceof Content) {
      const insert = getElements(current)

      if (insert.length) {
        result.push(...insert)
      }
    } else if (current instanceof DocumentFragment) {
      throw Error('Fragment detected in tree')
    } else {
      result.push(current)
    }

    current = current._next
  }

  return result
}

/** Removes `target` from the virtual tree while keeping its children in place. */
export function dissolve (target: Content) {
  if (!target._parent) return

  let child = target._first

  if (child) {
    child._prev = target._prev

    while (child) {
      child._parent = target._parent

      if (!child._next) {
        child._next = target._next

        if (target._next) {
          target._next._prev = child
        }

        break
      }

      child = child._next
    }
  }

  if (target._parent._first === target) {
    target._parent._first = target._first
  }

  if (target._parent._last === target) {
    target._parent._last = target._last
  }

  target._parent = undefined
}

/** Detaches `target` from the virtual tree and its DOM parent without dissolving children. */
export function extract (target: Child) {
  virtualRemove(target)

  if (target instanceof Content) {
    getElements(target).forEach(el => {
      el.remove()
    })
  } else if (!(target instanceof DocumentFragment)) {
    target.remove()
  }
}

/** Removes `target` from the virtual tree and from the DOM. */
export function remove (target: Child) {
  if (target instanceof Content) {
    dissolve(target)
  } else {
    virtualRemove(target)

    if (!(target instanceof DocumentFragment)) {
      target.remove()
    }
  }
}

/** Appends `target` as the last child of `parent`. */
export function append (parent: Parent, target: Child) {
  virtualRemove(target)

  target._parent = parent

  if (!parent._first) {
    parent._first = target
  }

  if (parent._last) {
    parent._last._next = target
    target._prev = parent._last
  }

  parent._last = target

  if (parent instanceof Content) {
    const next = getNextElement(parent)

    if (!next) {
      const parentElement = getParentElement(parent)

      if (parentElement) {
        if (target instanceof Content) {
          parentElement.append(...getElements(target))
        } else {
          parentElement.append(target)
        }
      }

      return
    }

    if (target instanceof Content) {
      next.before(...getElements(target))
    } else {
      next.before(target)
    }
  } else if (target instanceof Content) {
    parent.append(...getElements(target))
  } else {
    parent.append(target)
  }
}

/** Prepends `target` as the first child of `parent`. */
export function prepend (parent: Parent, target: Parent) {
  virtualRemove(target)

  target._parent = parent

  if (!parent._last) {
    parent._last = target
  }

  if (parent._first) {
    parent._first._prev = target
    target._next = parent._first
  }

  parent._first = target

  if (parent instanceof Content) {
    const prev = getPrevElement(parent)

    if (!prev) {
      const parentElement = getParentElement(parent)

      if (parentElement) {
        if (target instanceof Content) {
          parentElement.prepend(...getElements(target))
        } else {
          parentElement.prepend(target)
        }
      }

      return
    }

    if (target instanceof Content) {
      prev.after(...getElements(target))
    } else {
      prev.after(target)
    }
  } else if (target instanceof Content) {
    parent.prepend(...getElements(target))
  } else {
    parent.prepend(target)
  }
}

/** Inserts `target` right after `node`. */
export function after (node: Child, target: Parent) {
  virtualRemove(target)

  const parent = node._parent

  target._parent = parent

  if (node._next) {
    node._next._prev = target
    target._next = node._next
  } else if (parent) {
    parent._last = target
  }

  node._next = target
  target._prev = node

  const prev = getPrevElement(target)

  if (!prev) return

  if (target instanceof Content) {
    prev.after(...getElements(target))
  } else {
    prev.after(target)
  }
}

/** Inserts `target` right before `node`. */
export function before (node: Child, target: Parent) {
  virtualRemove(target)

  target._parent = node._parent

  if (node._prev) {
    node._prev._next = target
    target._prev = node._prev
  } else if (node._parent) {
    node._parent._first = target
  }

  node._prev = target
  target._next = node

  const next = getNextElement(target)

  if (!next) return

  if (target instanceof Content) {
    next.before(...getElements(target))
  } else {
    next.before(target)
  }
}
