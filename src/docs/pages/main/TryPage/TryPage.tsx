import type { HighlightExamples } from '@docs/ui'

import { Try } from '../../../../components'
import { Flex, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './TryPage.md'

function Dangerous () {
  throw Error('Something went wrong')
}

const catchError = ({ error, retry }: { error: unknown, retry: () => void }) => (
  <Flex vertical gap={4}>
    <Text color='danger'>{String(error)}</Text>
    <button onclick={retry}>Retry</button>
  </Flex>
)

export default function TryPage () {
  const examples: HighlightExamples = {
    basic: (
      <Try catch={catchError}>
        <Dangerous />
      </Try>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
