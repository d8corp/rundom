import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<MoonIcon>`: all `<BaseIcon>` props. */
export type MoonIconProps = BaseIconProps

/** Crescent moon icon. */
export function MoonIcon (props: MoonIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </BaseIcon>
  )
}
