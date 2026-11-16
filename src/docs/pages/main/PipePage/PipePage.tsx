import type { HighlightExamples } from '@docs/ui'

import { Pipe } from '../../../../components'
import type { JSXElement } from '../../../../types'
import { MarkdownTemplate } from '../../../templates'
import description from './PipePage.md'

const render = (children: JSXElement, deep: number) => (
  <div style={{ 'padding-left': '12px' }}>
    Level {deep}
    {deep < 2 && children}
  </div>
)

export default function PipePage () {
  const examples: HighlightExamples = {
    basic: <Pipe>{render}</Pipe>,
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
