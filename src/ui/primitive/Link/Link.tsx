import { classes } from 'html-classes'

import { type HTMLStyleProps, useStyles } from '../../../hooks'
import type { Merge, ObservableProp } from '../../../types'
import type { LinkToParams } from '../../../utils'
import { addUiCSS, inject, linkTo, locationURL, RDSlot, startViewTransition, use } from '../../../utils'

if (import.meta.env?.RD_THEME_LINK) {
  addUiCSS(import.meta.env.RD_THEME_LINK, 'link')
}

export const linkStyles = {
  root: import.meta.env?.RD_THEME_LINK__ROOT,
  active: import.meta.env?.RD_THEME_LINK__ACTIVE,
}

export type LinkStyles = typeof linkStyles

const CLEAR_HREF = /([?#].*)?$/

function clearHref (url: string) {
  return url.replace(CLEAR_HREF, '')
}

export interface BaseLinkProps {
  /** Native `target` attribute for external links. */
  target?: '_blank' | '_parent' | '_self' | '_top'
  /** Matches the active link path exactly instead of by prefix. */
  exact?: boolean
  /** Wraps internal navigation in a view transition. */
  transition?: boolean
  /** Prevents navigation and removes `href`. */
  disabled?: ObservableProp<boolean>
  /** Content of the link. */
  children?: JSX.Element
}

/** Props for `<Link>`: native anchor props plus navigation props. */
export type LinkProps<S extends LinkStyles = LinkStyles> = Merge<HTMLStyleProps<'a', S>, LinkToParams & BaseLinkProps>

/**
 * Anchor that navigates internal paths with the History API and marks the active link.
 * External links open in a new tab and receive safe `rel` attributes.
 */
export function LinkComponent (props: LinkProps) {
  const styles = useStyles(linkStyles, props.class)
  const { onclick, href, scroll = 'after', scrollTo, replace, exact, transition, ...rest } = props

  if (!href || (typeof href === 'string' && href.startsWith('http'))) {
    return (
      <a
        {...rest}
        class={styles.root}
        href={inject(rest.disabled, disabled => disabled ? '' : href)}
        rel={rest.rel ?? (href ? 'noopener noreferrer nofollow' : undefined)}
        target={rest.target ?? (href ? '_blank' : undefined)}
        onclick={onclick}
      />
    )
  }

  const getHref = () => {
    const result = use(href) || ''

    return result.startsWith('/') ? `${import.meta.env?.RD_BASE_URL || ''}${result}` : result
  }

  const linkRegString = () => {
    const href = getHref()

    const prefix = href.startsWith('?')
      ? '[^?]*'
      : href.startsWith('#')
        ? '[^#]*'
        : ''

    const suffix = exact
      ? '$'
      : prefix
        ? ''
        : '(?:[/?#]|$)'

    return `^${prefix}${clearHref(href)}${suffix}`
  }

  const regString = new RDSlot(linkRegString)
  const linkReg = () => new RegExp(regString.value)
  const reg = new RDSlot(linkReg)

  const linkClass = () => {
    return classes([
      styles.root,
      reg.value.test(locationURL.value) && styles.active,
    ])
  }

  const className = new RDSlot(linkClass)

  function handleClick (e: MouseEvent) {
    if (use(rest.disabled)) {
      e.preventDefault()

      return
    }

    if (e.ctrlKey || e.metaKey) {
      // @ts-expect-error TODO: fix types
      return onclick?.call(this, e)
    }

    const currentHref = getHref()

    e.preventDefault()

    const run = () => {
      linkTo(currentHref, { scroll, replace, scrollTo })

      // @ts-expect-error TODO: fix types
      onclick?.call(this, e)
    }

    if (transition ?? import.meta.env?.RD_VIEW_TRANSITION === 'true') {
      startViewTransition(run)
    } else {
      run()
    }
  }

  return <a {...rest} class={className} href={getHref} onclick={handleClick} />
}

export const Link = import.meta.env?.RD_UI_LINK
  ? import.meta.require?.(import.meta.env.RD_UI_LINK).Link as typeof LinkComponent
  : LinkComponent
