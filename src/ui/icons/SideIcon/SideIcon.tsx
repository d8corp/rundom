import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<SideIcon>`: all `<BaseIcon>` props. */
export type SideIconProps = BaseIconProps

/** Icon of a layout with a panel on the left edge. */
export function SideIcon (props: SideIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <path d='M9 3v18' />
    </BaseIcon>
  )
}
