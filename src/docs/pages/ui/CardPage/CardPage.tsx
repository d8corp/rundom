import type { HighlightExamples } from '@docs/ui'

import {
  Body,
  Card,
  CardTitle,
  CopyIcon,
  Description,
  Flex,
  Header,
  Preview,
  SearchIcon,
  SunIcon,
} from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './CardPage.md'

export default function CardPage () {
  const handleOpen = () => alert('Card clicked')

  const examples: HighlightExamples = {
    children: (
      <Card>
        Card content goes here.
      </Card>
    ),
    content: (
      <Card>
        <Body>
          Card content goes here.
        </Body>
      </Card>
    ),
    preview: (
      <Card vertical width={220}>
        <Preview>
          <SearchIcon size={24} />
        </Preview>
        <Body vertical>
          <CardTitle>Search</CardTitle>
          <Description>Find anything in the documentation.</Description>
        </Body>
      </Card>
    ),
    header: (
      <Card vertical width={260}>
        <Header>
          Card header
        </Header>
        <Body vertical>
          <Description>Card content goes here.</Description>
        </Body>
      </Card>
    ),
    size: (
      <Flex gap={16} align='center' wrap>
        <Card vertical size='s' width={180}>
          <Preview>
            <SunIcon size={20} />
          </Preview>
          <Body>
            <CardTitle>Small</CardTitle>
          </Body>
        </Card>
        <Card vertical size='m' width={220}>
          <Preview>
            <CopyIcon size={24} />
          </Preview>
          <Body>
            <CardTitle>Medium</CardTitle>
          </Body>
        </Card>
        <Card vertical size='l' width={260}>
          <Preview>
            <SearchIcon size={28} />
          </Preview>
          <Body>
            <CardTitle>Large</CardTitle>
          </Body>
        </Card>
      </Flex>
    ),
    clickable: (
      <Card width={220} onclick={handleOpen}>
        <Body vertical>
          <CardTitle>Open</CardTitle>
          <Description>Click the card to trigger the handler.</Description>
        </Body>
      </Card>
    ),
    hoverable: (
      <Card interact='hoverable' width={220}>
        <Preview>
          <SunIcon size={24} />
        </Preview>
        <Body vertical>
          <CardTitle>Hoverable</CardTitle>
          <Description>Hover the card to see the lift.</Description>
        </Body>
      </Card>
    ),
    width: (
      <Card width={120} height={120}>
        <Body>
          Card content goes here.
        </Body>
      </Card>
    ),
    link: (
      <Card element='a' href='/ui/components' interact='clickable' width={220}>
        <Preview>
          <SearchIcon size={24} />
        </Preview>
        <Body vertical>
          <CardTitle>Components</CardTitle>
          <Description>Browse all components from a single page.</Description>
        </Body>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
