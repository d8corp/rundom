import { Slot } from 'rune-hub'

import { For, Show } from '../../../../components'
import type { JSXElement } from '../../../../types'
import {
  Body,
  Box,
  Button,
  Card,
  CardTitle,
  CheckBox,
  Code,
  Description,
  Divider,
  Eyebrow,
  Field,
  Flex,
  Input,
  Markdown,
  Option,
  Options,
  Preview,
  RadioBox,
  Scrollbar,
  Spin,
  TerminalIcon,
  Text,
  Title,
  Toggle,
  Typography,
} from '../../../../ui'
import { Page, StickySearch } from '../../../ui'
import styles from './ComponentsPage.scss'

interface ComponentItem {
  title: string
  href: string
  description: string
  keywords: string
  preview: JSXElement
}

interface ComponentGroup {
  title: string
  items: ComponentItem[]
}

export default function ComponentsPage () {
  const search = new Slot(() => '')

  const groups: ComponentGroup[] = [
    {
      title: 'Typography',
      items: [
        {
          title: 'Typography',
          href: '/ui/typography',
          description: 'Styles headings, paragraphs, lists and other content.',
          keywords: 'article text content heading paragraph style',
          preview: (
            <Typography class={styles.typographyPreview}>
              <h3>Heading</h3>
              <p>The quick brown fox jumps over the lazy dog.</p>
            </Typography>
          ),
        },
        {
          title: 'Markdown',
          href: '/ui/markdown',
          description: 'Renders Markdown as reactive HTML.',
          keywords: 'text markdown md rich content',
          preview: (
            <div class={styles.markdownPreview}>
              <Markdown text={'**Bold**\n\n_Italic_ and `code`'} />
            </div>
          ),
        },
        {
          title: 'Text',
          href: '/ui/text',
          description: 'Controls font size, weight, color and wrapping.',
          keywords: 'font size weight color wrap span inline',
          preview: (
            <Flex wrap gap={4} align='baseline'>
              <Text color='dim'>Dim</Text>
              <Text color='muted'>Muted</Text>
              <Text color='text'>Text</Text>
            </Flex>
          ),
        },
        {
          title: 'Eyebrow',
          href: '/ui/eyebrow',
          description: 'Adds a small uppercase label above a heading or section.',
          keywords: 'label kicker overline uppercase caption heading',
          preview: (
            <Flex vertical gap={2} align='center'>
              <Eyebrow>Eyebrow</Eyebrow>
            </Flex>
          ),
        },
        {
          title: 'Title',
          href: '/ui/title',
          description: 'Renders a heading and keeps the document title in sync.',
          keywords: 'heading h1 h2 h3 title document page',
          preview: (
            <Flex vertical gap={2}>
              <Title depth={2}>Heading</Title>
              <Title depth={6}>Subheading</Title>
            </Flex>
          ),
        },
        {
          title: 'Description',
          href: '/ui/description',
          description: 'Adds secondary text under a field, card or section.',
          keywords: 'caption hint helper muted text description',
          preview: (
            <Description>Supporting text for a field or section.</Description>
          ),
        },
      ],
    },
    {
      title: 'Layout',
      items: [
        {
          title: 'Flex',
          href: '/ui/flex',
          description: 'Arranges elements in a flexible row or column.',
          keywords: 'layout flexbox row column gap align justify',
          preview: (
            <Flex vertical gap={6} flex>
              <Flex gap={6} justify='stretch'>
                <Box view='dashed' flex />
                <Box view='dashed' flex />
              </Flex>
              <Flex gap={6} justify='stretch'>
                <Box view='dashed' flex />
                <Box view='dashed' flex />
                <Box view='dashed' flex />
              </Flex>
            </Flex>
          ),
        },
        {
          title: 'Box',
          href: '/ui/box',
          description: 'A flexible container with colors, views and sizes.',
          keywords: 'container block card color view size square circle',
          preview: (
            <Flex gap={6} align='center'>
              <Box view='filled' />
              <Box view='soft' />
              <Box view='dashed' />
            </Flex>
          ),
        },
        {
          title: 'Divider',
          href: '/ui/divider',
          description: 'Separates groups of content with a line.',
          keywords: 'separator line hr',
          preview: (
            <Flex vertical gap={10} flex>
              <Flex gap={10}>
                <Box view='dashed' flex />
                <Divider vertical />
                <Box view='dashed' flex />
              </Flex>
              <Divider />
              <Box view='dashed' size='s' flex />
            </Flex>
          ),
        },
        {
          title: 'Scrollbar',
          href: '/ui/scrollbar',
          description: 'Adds a styled scrollbar to overflowing areas.',
          keywords: 'scroll overflow list container',
          preview: (
            <Scrollbar vertical gap={4} style={{ height: '72px', width: '140px' }}>
              {['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry'].map(fruit => (
                <div class={styles.scrollItem}>{fruit}</div>
              ))}
            </Scrollbar>
          ),
        },
        {
          title: 'Card',
          href: '/ui/card',
          description: 'Groups content into a preview and a body.',
          keywords: 'card surface preview title description container',
          preview: (
            <Card size='s' width={130}>
              <Body vertical>
                <CardTitle>Card</CardTitle>
                <Description>Preview and body</Description>
              </Body>
            </Card>
          ),
        },
      ],
    },
    {
      title: 'Inline',
      items: [
        {
          title: 'Code',
          href: '/ui/code',
          description: 'Highlights a small piece of code in text.',
          keywords: 'code snippet inline monospace',
          preview: (
            <Flex gap={8} align='center'>
              <Code>rundom</Code>
              <Code>npm i</Code>
            </Flex>
          ),
        },
        {
          title: 'Link',
          href: '/ui/link',
          description: 'Navigates between pages of the application.',
          keywords: 'anchor href navigation route url',
          preview: (
            <Text color='primary' decoration='underline'>
              Open the page
            </Text>
          ),
        },
      ],
    },
    {
      title: 'Controls',
      items: [
        {
          title: 'Button',
          href: '/ui/button',
          description: 'Triggers an action, submits a form or follows a link.',
          keywords: 'action click submit form cta',
          preview: (
            <Flex gap={6} align='center' wrap>
              <Button size='s' view='filled' color='accent'>Save</Button>
              <Button size='s' view='soft'>Cancel</Button>
            </Flex>
          ),
        },
        {
          title: 'Field',
          href: '/ui/field',
          description: 'Wraps content with an optional label, icon and actions.',
          keywords: 'field input label form before after icon',
          preview: (
            <Field label='Name' size='s' style={{ width: '150px' }}>
              Jane Doe
            </Field>
          ),
        },
        {
          title: 'Input',
          href: '/ui/input',
          description: 'Edits a text value with a clear button and debouncing.',
          keywords: 'input text form value placeholder clear search',
          preview: (
            <Input value='Search...' size='s' style={{ width: '150px' }} />
          ),
        },
        {
          title: 'CheckBox',
          href: '/ui/check-box',
          description: 'Selects one or several independent options.',
          keywords: 'checkbox boolean toggle multiple options form',
          preview: (
            <Flex gap={8} align='center'>
              <CheckBox />
              <CheckBox checked />
              <CheckBox checked={null} />
            </Flex>
          ),
        },
        {
          title: 'RadioBox',
          href: '/ui/radio-box',
          description: 'Selects a single option from a group.',
          keywords: 'radio single choice option form',
          preview: (
            <Flex gap={8} align='center'>
              <RadioBox />
              <RadioBox checked />
            </Flex>
          ),
        },
        {
          title: 'Toggle',
          href: '/ui/toggle',
          description: 'Turns a single option on or off.',
          keywords: 'toggle switch boolean on off setting',
          preview: (
            <Flex gap={8} align='center'>
              <Toggle />
              <Toggle checked />
            </Flex>
          ),
        },
        {
          title: 'Options',
          href: '/ui/options',
          description: 'Shows a virtualized list of selectable options with sticky groups.',
          keywords: 'select list option group menu multiple single dropdown',
          preview: (
            <Options
              values={['Apple', 'Banana', 'Cherry']}
              selected='Apple'
              size='s'
              style={{ height: '86px', width: '140px' }}
            />
          ),
        },
        {
          title: 'Option',
          href: '/ui/option',
          description: 'Renders a single selectable row for a list or menu.',
          keywords: 'option row select list menu choice',
          preview: (
            <Flex vertical gap={3} style={{ width: '150px' }}>
              <Option value='Apple' selected size='s' />
              <Option value='Banana' size='s' />
            </Flex>
          ),
        },
      ],
    },
    {
      title: 'Popups',
      items: [
        {
          title: 'Popover',
          href: '/ui/popover',
          description: 'Shows a card with extra content next to a target.',
          keywords: 'popover tooltip hint card overlay floating',
          preview: (
            <Flex vertical gap={4} align='center'>
              <Box view='soft' size='s'>
                <Text size='xs'>Popover</Text>
              </Box>
              <Box view='filled' color='primary' style={{ width: '28px', height: '4px' }} />
              <Box view='dashed' size='s'>
                <Text size='xs'>Target</Text>
              </Box>
            </Flex>
          ),
        },
        {
          title: 'Dropdown',
          href: '/ui/dropdown',
          description: 'Shows a selectable list of options next to a trigger.',
          keywords: 'dropdown select menu list choices options picker',
          preview: (
            <Card padding={4} style={{ width: '140px' }}>
              <Options
                values={['Apple', 'Banana', 'Cherry']}
                selected='Apple'
                size='s'
                style={{ height: '86px' }}
              />
            </Card>
          ),
        },
        {
          title: 'Message',
          href: '/ui/message',
          description: 'Shows a temporary notification with a semantic color.',
          keywords: 'message notification toast alert success error warning',
          preview: (
            <Flex vertical gap={4} align='start'>
              <Box view='filled' color='success' style={{ padding: '2px 8px', 'border-radius': '999px' }}>
                <Text size='xs'>Saved</Text>
              </Box>
              <Box view='filled' color='danger' style={{ padding: '2px 8px', 'border-radius': '999px' }}>
                <Text size='xs'>Failed</Text>
              </Box>
            </Flex>
          ),
        },
      ],
    },
    {
      title: 'Feedback',
      items: [
        {
          title: 'Spin',
          href: '/ui/spin',
          description: 'Shows that content is loading.',
          keywords: 'loading spinner progress wait indicator',
          preview: (
            <Flex gap={10} align='center'>
              <Spin />
              <Spin size={32} />
            </Flex>
          ),
        },
      ],
    },
    {
      title: 'Development',
      items: [
        {
          title: 'Devtools',
          href: '/ui/devtools',
          description: 'Inspects hubs, slots and their dependencies.',
          keywords: 'devtools debug inspect hub slot performance',
          preview: (
            <Flex align='center' justify='center' style={{ height: '100%' }}>
              <TerminalIcon size={32} />
            </Flex>
          ),
        },
      ],
    },
  ]

  const filteredGroups = new Slot(function filteredGroups () {
    const query = search.value.trim().toLowerCase()

    if (!query) return groups

    return groups.reduce<ComponentGroup[]>((result, group) => {
      const items = group.items.filter(item => {
        return `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(query)
      })

      if (items.length) {
        result.push({ ...group, items })
      }

      return result
    }, [])
  })

  const isEmpty = new Slot(() => !filteredGroups.value.length)

  return (
    <Page>
      <Typography>
        <Title title='Rundom UI | Components'>Components</Title>
        <p>
          Explore the components of Rundom UI. Use the search to quickly find the building block you need.
        </p>
      </Typography>
      <Flex reverse vertical gap={16}>
        <Flex vertical gap={16}>
          <For of={filteredGroups} key='title'>
            {group => (
              <Flex vertical gap={8}>
                <Title depth={2}>
                  {() => group.value.title}
                </Title>
                <div class={styles.grid}>
                  <For of={() => group.value.items} key='href'>
                    {item => (
                      <Card
                        element='a'
                        vertical
                        href={() => item.value.href}
                      >
                        <Preview height={140}>{() => item.value.preview}</Preview>
                        <Body vertical>
                          <CardTitle>{() => item.value.title}</CardTitle>
                          <Description>{() => item.value.description}</Description>
                        </Body>
                      </Card>
                    )}
                  </For>
                </div>
              </Flex>
            )}
          </For>
          <Show when={isEmpty}>
            <div class={styles.empty}>No components found</div>
          </Show>
        </Flex>
        <StickySearch size='l' value={search} placeholder='Search components' />
      </Flex>
    </Page>
  )
}
