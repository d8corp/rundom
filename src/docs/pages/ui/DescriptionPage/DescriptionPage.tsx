import type { HighlightExamples } from '@docs/ui'

import { Description, Flex, Title } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './DescriptionPage.md'

export default function DescriptionPage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex vertical gap={2}>
        <Title depth={3}>Rundom UI</Title>
        <Description>Components for reactive DOM applications.</Description>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
