import type { InputProps } from '../../../ui'
import { Input, SearchIcon } from '../../../ui'
import styles from './StickySearch.module.scss'

export interface StickySearchProps extends InputProps {

}

export function StickySearch (props: StickySearchProps) {
  return (
    <div class={styles.root}>
      <Input
        circle
        clearable
        debounce
        class={styles.search}
        before={<SearchIcon />}
        {...props}
      />
    </div>
  )
}
