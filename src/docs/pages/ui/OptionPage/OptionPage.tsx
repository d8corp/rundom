import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Flex, Option, Options, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './OptionPage.md'

export default function OptionPage () {
  const manualSelected = new Slot<string | null>(() => null)
  const optionsSelected = new Slot<string>(() => 'Apple')

  const values = [
    'Apple',
    'Banana',
    'Cherry',
  ]

  const icons: Record<string, string> = {
    Apple: '🍎',
    Banana: '🍌',
    Cherry: '🍒',
  }

  const examples: HighlightExamples = {
    states: (
      <Flex vertical gap={4} style={{ width: '220px' }}>
        <Option value='Default' />
        <Option value='Selected' selected />
        <Option value='Disabled' disabled />
        <Option value='Selected and disabled' selected disabled />
      </Flex>
    ),
    manual: (
      <Flex vertical gap={4} style={{ width: '220px' }}>
        <Option
          value='Apple'
          selected={() => manualSelected.value === 'Apple'}
          onclick={() => manualSelected.set('Apple')}
        >
          Apple
        </Option>
        <Option
          value='Banana'
          selected={() => manualSelected.value === 'Banana'}
          onclick={() => manualSelected.set('Banana')}
        >
          Banana
        </Option>
        <Text>Selected: {() => manualSelected.value ?? 'none'}</Text>
      </Flex>
    ),
    insideOptions: (
      <Options
        values={values}
        selected={optionsSelected}
        children={({ value, ...props }) => (
          <Option {...props} value={value}>
            {() => `${icons[value.value] ?? '•'} ${value}`}
          </Option>
        )}
        style={{ height: '180px', width: '220px' }}
      />
    ),
    colors: (
      <Flex vertical gap={4} style={{ width: '220px' }}>
        <Option value='Primary' selected color='primary' />
        <Option value='Accent' selected color='accent' />
        <Option value='Success' selected color='success' />
        <Option value='Warning' selected color='warning' />
        <Option value='Danger' selected color='danger' />
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
