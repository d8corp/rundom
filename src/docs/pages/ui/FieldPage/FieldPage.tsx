import type { HighlightExamples } from '@docs/ui'

import { Field } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './FieldPage.md'

export default function FieldPage () {
  const examples: HighlightExamples = {
    basic: (
      <Field label='Name'>Jane Doe</Field>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
