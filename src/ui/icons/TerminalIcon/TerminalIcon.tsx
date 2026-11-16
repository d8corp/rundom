import type { BaseIconProps } from '../BaseIcon'
import { BaseIcon } from '../BaseIcon'

/** Props for `<TerminalIcon>`: all `<BaseIcon>` props. */
export type TerminalIconProps = BaseIconProps

/** Terminal prompt icon. */
export function TerminalIcon (props: TerminalIconProps) {
  return (
    <BaseIcon {...props}>
      <polyline points='4 17 10 11 4 5' />
      <line x1='12' y1='19' x2='20' y2='19' />
    </BaseIcon>
  )
}
