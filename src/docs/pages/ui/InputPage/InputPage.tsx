import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Flex, Input } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './InputPage.md'

const value = new Slot(() => '')

export default function InputPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex vertical gap={8}>
        <Input value={value} placeholder='Type something' />
        <Input value={value} clearable label='Clearable' />
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
