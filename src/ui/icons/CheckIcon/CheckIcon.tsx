import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<CheckIcon>`: all `<BaseIcon>` props. */
export type CheckIconProps = BaseIconProps

/** Checkmark icon. */
export function CheckIcon (props: CheckIconProps) {
  return (
    <BaseIcon {...props}>
      <path d='M20 6L9 17l-5-5' />
    </BaseIcon>
  )
}
