import type { HighlightExamples } from '@docs/ui'
import { Slot } from 'rune-hub'

import { Button, Description, Dropdown, Flex, Option, Text } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './DropdownPage.md'

interface City {
  id: string
  name: string
  country: string
}

export default function DropdownPage () {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango']
  const selectedFruit = new Slot(() => 'Banana')

  const frameworks = ['Angular', 'React', 'Svelte', 'Vue']
  const selectedFrameworks = new Slot<string[]>(() => ['React', 'Vue'])

  const lastSelected = new Slot<string>(() => 'none')
  const handleSelect = (value: string) => lastSelected.set(value)

  const cities: City[] = [
    { id: 'tokyo', name: 'Tokyo', country: 'Japan' },
    { id: 'paris', name: 'Paris', country: 'France' },
    { id: 'new-york', name: 'New York', country: 'USA' },
    { id: 'sydney', name: 'Sydney', country: 'Australia' },
  ]

  const citySelected = new Slot<string>(() => 'paris')

  const opened = new Slot(() => false)
  const openDropdown = () => opened.set(true)

  const examples: HighlightExamples = {
    basic: (
      <Button>
        Choose a framework
        <Dropdown values={frameworks} />
      </Button>
    ),
    values: (
      <Button>
        Choose a fruit
        <Dropdown values={fruits} height={200} width={200} />
      </Button>
    ),
    selected: (
      <Flex vertical gap={8} align='start'>
        <Button>
          Selected: {selectedFruit}
          <Dropdown
            values={fruits}
            selected={selectedFruit}
            height={150}
            width={150}
            placement='vertical-center'
          />
        </Button>
      </Flex>
    ),
    multiple: (
      <Flex vertical gap={8} align='start'>
        <Button>
          Choose frameworks
          <Dropdown values={frameworks} selected={selectedFrameworks} multiple />
        </Button>
        <Text>Selected: {() => selectedFrameworks.value.join(', ') || 'none'}</Text>
      </Flex>
    ),
    onSelect: (
      <Flex vertical gap={8} align='start'>
        <Button>
          Choose a fruit
          <Dropdown values={fruits} onSelect={handleSelect} />
        </Button>
        <Text>Last selected: {() => lastSelected.value}</Text>
      </Flex>
    ),
    children: (
      <Button>
        Choose a fruit
        <Dropdown
          values={fruits}
          selected={selectedFruit}
          children={({ value, ...props }) => (
            <Option {...props} value={value}>
              {() => value.value.toUpperCase()}
            </Option>
          )}
        />
      </Button>
    ),
    beforeAfter: (
      <Button>
        Choose a fruit
        <Dropdown
          values={fruits}
          selected={selectedFruit}
          before={<Text size='s'>Fruits</Text>}
          after={<Text size='s'>{() => `${fruits.length} items`}</Text>}
        />
      </Button>
    ),
    size: (
      <Flex gap={8} wrap>
        <Button>
          s
          <Dropdown height={150} width={100} values={fruits} size='s' />
        </Button>
        <Button>
          m
          <Dropdown height={150} width={150} values={fruits} size='m' />
        </Button>
        <Button>
          l
          <Dropdown height={200} width={200} values={fruits} size='l'>
            {(props, index) => (
              <Option align='start' vertical {...props}>
                <Text>#{index} {props.value}</Text>
                <Description>Some description</Description>
              </Option>
            )}
          </Dropdown>
        </Button>
      </Flex>
    ),
    key: (
      <Flex vertical gap={8} align='start'>
        <Button>
          Choose a city
          <Dropdown
            values={cities}
            selected={citySelected}
            key='id'
            children={({ value, ...props }) => (
              <Option {...props} value={value}>
                {() => `${value.value.name}, ${value.value.country}`}
              </Option>
            )}
          />
        </Button>
        <Text>Selected: {() => citySelected.value ?? 'none'}</Text>
      </Flex>
    ),
    placement: (
      <Flex gap={8} wrap justify='center' padding={48}>
        <Button>
          Top start
          <Dropdown values={fruits} placement='top-start' />
        </Button>
        <Button>
          Bottom end
          <Dropdown values={fruits} placement='bottom-end' />
        </Button>
      </Flex>
    ),
    optionsProps: (
      <Button>
        Choose a fruit
        <Dropdown
          values={fruits}
          selected={selectedFruit}
          optionsProps={{ overflow: 'scroll' }}
        />
      </Button>
    ),
    controlled: (
      <Flex vertical gap={8} align='start'>
        <Flex gap={8}>
          <Button onclick={openDropdown}>Open</Button>
          <Button>
            Choose a fruit
            <Dropdown values={fruits} selected={selectedFruit} opened={opened} />
          </Button>
        </Flex>
        <Text>Open: {() => String(opened.value)}</Text>
      </Flex>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
