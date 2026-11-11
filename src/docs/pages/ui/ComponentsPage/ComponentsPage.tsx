import { Slot } from 'rune-hub'

import { For, Show } from '../../../../components'
import type { JSXElement } from '../../../../types'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardPreview,
  CardTitle,
  CheckBox,
  Code,
  Description,
  Divider,
  Eyebrow,
  Flex,
  Input,
  Markdown,
  RadioBox,
  Scrollbar,
  SearchIcon,
  Text,
  Title,
  Toggle,
  Typography,
} from '../../../../ui'
import { Page } from '../../../ui'
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
            <Scrollbar size='s' vertical gap={4} style={{ height: '72px', width: '140px' }}>
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
            <Card size='s' style={{ width: '130px' }}>
              <CardContent vertical gap={4}>
                <CardTitle>Card</CardTitle>
                <Description>Preview and body</Description>
              </CardContent>
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
          title: 'Box',
          href: '/ui/box',
          description: 'A flexible container with colors, views and sizes.',
          keywords: 'container block card color view size square circle',
          preview: (
            <Flex gap={6} align='center'>
              <Box view='filled' />
              <Box view='bordered' />
              <Box view='dashed' />
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
      title: 'Block',
      items: [
        {
          title: 'Button',
          href: '/ui/button',
          description: 'Triggers an action, submits a form or follows a link.',
          keywords: 'action click submit form cta',
          preview: (
            <Flex gap={6} align='center' wrap>
              <Button size='s' view='filled' color='accent'>Save</Button>
              <Button size='s' view='bordered'>Cancel</Button>
            </Flex>
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
                      href={() => item.value.href}
                      size='m'
                      clickable
                    >
                      <CardPreview>{() => item.value.preview}</CardPreview>
                      <CardContent vertical>
                        <Title depth={3}>{() => item.value.title}</Title>
                        <Description>{() => item.value.description}</Description>
                      </CardContent>
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
        <div class={styles.search}>
          <Input
            size='l'
            circle
            clearable
            debounce
            value={search}
            placeholder='Search components'
            before={<SearchIcon />}
          />
        </div>
      </Flex>
    </Page>
  )
}
