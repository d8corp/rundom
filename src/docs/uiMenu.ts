import type { MenuItem } from './types'

export const uiMenu: MenuItem[] = [
  {
    title: 'Rundom UI',
    children: [
      {
        href: '/ui/introduction',
        children: 'Introduction',
      },
      {
        href: '/ui/components',
        children: 'Components',
      },
      {
        href: '/ui/icons',
        children: 'Icons',
      },
    ],
  },
  {
    title: 'Typography',
    children: [
      {
        href: '/ui/typography',
        children: '<Typography>',
      },
      {
        href: '/ui/markdown',
        children: '<Markdown>',
      },
      {
        href: '/ui/text',
        children: '<Text>',
      },
      {
        href: '/ui/eyebrow',
        children: '<Eyebrow>',
      },
      {
        href: '/ui/title',
        children: '<Title>',
      },
      {
        href: '/ui/description',
        children: '<Description>',
      },
    ],
  },
  {
    title: 'Layout',
    children: [
      {
        href: '/ui/divider',
        children: '<Divider>',
      },
      {
        href: '/ui/scrollbar',
        children: '<Scrollbar>',
      },
      {
        href: '/ui/card',
        children: '<Card>',
      },
      {
        href: '/ui/flex',
        children: '<Flex>',
      },
      {
        href: '/ui/box',
        children: '<Box>',
      },
    ],
  },
  {
    title: 'Inline',
    children: [
      {
        href: '/ui/code',
        children: '<Code>',
      },
      {
        href: '/ui/link',
        children: '<Link>',
      },
    ],
  },
  {
    title: 'Controls',
    children: [
      {
        href: '/ui/button',
        children: '<Button>',
      },
      {
        href: '/ui/field',
        children: '<Field>',
      },
      {
        href: '/ui/input',
        children: '<Input>',
      },
      {
        href: '/ui/check-box',
        children: '<CheckBox>',
      },
      {
        href: '/ui/radio-box',
        children: '<RadioBox>',
      },
      {
        href: '/ui/toggle',
        children: '<Toggle>',
      },
      {
        href: '/ui/options',
        children: '<Options>',
      },
      {
        href: '/ui/option',
        children: '<Option>',
      },
    ],
  },
  {
    title: 'Feedback',
    children: [
      {
        href: '/ui/message',
        children: '<Message>',
      },
      {
        href: '/ui/spin',
        children: '<Spin>',
      },
    ],
  },
  {
    title: 'Development',
    children: [
      {
        href: '/ui/devtools',
        children: '<Devtools>',
      },
    ],
  },
]
