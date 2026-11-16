import type { HighlightExamples } from '@docs/ui'

import { Flex, Title } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TitlePage.md'

export default function TitlePage () {
  const examples: HighlightExamples = {
    basic: (
      <Flex vertical gap={4}>
        <Title depth={1}>Heading 1</Title>
        <Title depth={2}>Heading 2</Title>
        <Title depth={3}>Heading 3</Title>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
