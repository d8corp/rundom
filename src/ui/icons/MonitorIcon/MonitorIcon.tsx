import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<MonitorIcon>`: all `<BaseIcon>` props. */
export type MonitorIconProps = BaseIconProps

/** Desktop monitor icon. */
export function MonitorIcon (props: MonitorIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
      <path d='M8 21h8' />
      <path d='M12 17v4' />
    </BaseIcon>
  )
}
