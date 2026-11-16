import type { HighlightExamples } from '@docs/ui'

import { Flex, Spin } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './SpinPage.md'

export default function SpinPage () {
  const examples: HighlightExamples = {
    basic: (
      <Spin />
    ),
    size: (
      <Flex gap={12} align='center'>
        <Spin />
        <Spin size={24} />
        <Spin size='3em' />
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
