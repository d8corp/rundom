import type { HTMLProps, ObservableProp } from '../../../types'
import { inject, injectAsIs } from '../../../utils'

export interface BaseIconProps extends HTMLProps<'svg'> {
  /** Icon size applied as width and height; numbers are treated as pixels. Defaults to `'1em'`. */
  size?: ObservableProp<number | string | undefined>
}

/**
 * Base for all icons: an `<svg>` with a 24x24 viewBox, `currentColor` stroke
 * and a configurable size.
 */
export function BaseIcon ({ size = '1em', ...props }: BaseIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={injectAsIs(size)}
      height={injectAsIs(size)}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
      style={{
        'min-width': inject(size, size => typeof size === 'number' ? `${size}px` : size),
        'min-height': inject(size, size => typeof size === 'number' ? `${size}px` : size),
        ...props.style,
      }}
    />
  )
}
