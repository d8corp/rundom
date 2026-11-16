import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'
/** Props for `<BurgerIcon>`: all `<BaseIcon>` props. */
export type BurgerIconProps = BaseIconProps

/** Hamburger menu icon. */
export function BurgerIcon (props: BurgerIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M4 6h16' />
      <path d='M4 12h16' />
      <path d='M4 18h16' />
    </BaseIcon>
  )
}
