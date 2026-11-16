import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<AsideIcon>`: all `<BaseIcon>` props. */
export type AsideIconProps = BaseIconProps

/** Icon of a layout with a panel on the left. */
export function AsideIcon (props: AsideIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <path d='M15 3v18' />
    </BaseIcon>
  )
}
