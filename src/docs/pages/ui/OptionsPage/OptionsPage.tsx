import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Button, Flex, Option, Options, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './OptionsPage.md'

interface City {
  id: string
  name: string
  country: string
}

export default function OptionsPage () {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango']

  const values = new Slot<string[]>(() => ['Apple', 'Banana', 'Cherry'])

  const addValue = () => values.set([
    ...values.raw,
    `Fruit ${values.raw.length + 1}`,
  ])

  const selectedFruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit']
  const selectedFruit = new Slot<string>(() => 'Banana')

  const frameworks = ['Angular', 'React', 'Svelte', 'Vue']
  const multipleSelected = new Slot<string[]>(() => ['React', 'Vue'])

  const lastSelected = new Slot<string | null>(() => 'none')
  const handleSelect = (value: string) => lastSelected.set(value)

  const customValues = ['One', 'Two', 'Three']
  const customSelected = new Slot<string>(() => 'One')

  const sizeSelected = new Slot<string | null>(() => null)

  const cities: City[] = [
    { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
    { id: 'paris', name: 'Paris', country: 'France' },
    { id: 'new-york', name: 'New York', country: 'USA' },
    { id: 'sydney', name: 'Sydney', country: 'Australia' },
  ]

  const citySelected = new Slot<string>(() => 'paris')

  const manyValues = [...new Array(100_000)].map((_, index) => `Item ${index + 1}`)

  const examples: HighlightExamples = {
    values: (
      <Flex vertical gap={8} align='start'>
        <Options
          values={values}
          style={{ height: '128px', width: '220px' }}
        />
        <Button size='s' onclick={addValue}>
          Add value
        </Button>
      </Flex>
    ),
    baseValues: (
      <Options values={['Apple', 'Banana', 'Cherry']} />
    ),
    selected: (
      <Flex vertical gap={8}>
        <Options
          values={selectedFruits}
          selected={selectedFruit}
          style={{ height: '180px', width: '220px' }}
        />
        <Text>Selected: {() => selectedFruit.value ?? 'none'}</Text>
      </Flex>
    ),
    multiple: (
      <Flex vertical gap={8}>
        <Options
          values={frameworks}
          selected={multipleSelected}
          multiple
          style={{ height: '180px', width: '220px' }}
        />
        <Text>Selected: {() => multipleSelected.value.join(', ') || 'none'}</Text>
      </Flex>
    ),
    onSelect: (
      <Flex vertical gap={8}>
        <Options
          values={fruits}
          onSelect={handleSelect}
          style={{ height: '140px', width: '220px' }}
        />
        <Text>Last selected: {() => lastSelected.value}</Text>
      </Flex>
    ),
    children: (
      <Options
        values={customValues}
        selected={customSelected}
        children={({ value, ...props }) => (
          <Option {...props} value={value}>
            {() => value.value.toUpperCase()}
          </Option>
        )}
        style={{ height: '180px', width: '220px' }}
      />
    ),
    size: (
      <Flex gap={16} wrap>
        <Options
          values={fruits}
          selected={sizeSelected}
          size='s'
          style={{ height: '140px', width: '160px' }}
        />
        <Options
          values={fruits}
          selected={sizeSelected}
          size='m'
          style={{ height: '140px', width: '160px' }}
        />
        <Options
          values={fruits}
          selected={sizeSelected}
          size='l'
          style={{ height: '140px', width: '160px' }}
        />
      </Flex>
    ),
    key: (
      <Flex vertical gap={8}>
        <Options
          values={cities}
          selected={citySelected}
          key='id'
          children={({ value, ...props }) => (
            <Option {...props} value={value}>
              {() => `${value.value.name}, ${value.value.country}`}
            </Option>
          )}
          style={{ height: '180px', width: '220px' }}
        />
        <Text>Selected: {() => citySelected.value ?? 'none'}</Text>
      </Flex>
    ),
    virtualization: (
      <Options
        values={manyValues}
        style={{ height: '180px', width: '220px' }}
      />
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
