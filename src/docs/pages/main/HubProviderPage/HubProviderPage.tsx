import type { HighlightExamples } from '@docs/ui'
import { Hub, Slot } from 'rune-hub'

import { HubProvider } from '../../../../components'
import { useAction } from '../../../../hooks'
import { Button, Flex, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './HubProviderPage.md'

const hub = new Hub()

function Counter () {
  const count = new Slot(() => 0)

  const increment = useAction(() => {
    count.value++
  })

  return (
    <Flex gap={8} align='center'>
      <Text>{() => `Count: ${count.value}`}</Text>
      <Button onclick={increment}>Increment</Button>
    </Flex>
  )
}

export default function HubProviderPage () {
  const examples: HighlightExamples = {
    basic: (
      <HubProvider hub={hub}>
        <Counter />
      </HubProvider>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
