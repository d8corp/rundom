import { Example } from '../../components'
import text from './JSXExample.md'

export function JSXExample () {
  return (
    <Example description={text}>
      <p>Hello World!</p>
    </Example>
  )
}
