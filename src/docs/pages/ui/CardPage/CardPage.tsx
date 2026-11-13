import type { HighlightExamples } from '@docs/ui'

import {
  Card,
  CardContent,
  CardHeader,
  CardPreview,
  CardTitle,
  CopyIcon,
  Description,
  Flex,
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
        <CardContent>
          Card content goes here.
        </CardContent>
      </Card>
    ),
    preview: (
      <Card width={220}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent vertical>
          <CardTitle>Search</CardTitle>
          <Description>Find anything in the documentation.</Description>
        </CardContent>
      </Card>
    ),
    header: (
      <Card width={260}>
        <CardHeader>
          Card header
        </CardHeader>
        <CardContent vertical>
          <Description>Card content goes here.</Description>
        </CardContent>
      </Card>
    ),
    size: (
      <Flex gap={16} align='center' wrap>
        <Card size='s' width={180}>
          <CardPreview>
            <SunIcon size={20} />
          </CardPreview>
          <CardContent>
            <CardTitle>Small</CardTitle>
          </CardContent>
        </Card>
        <Card size='m' width={220}>
          <CardPreview>
            <CopyIcon size={24} />
          </CardPreview>
          <CardContent>
            <CardTitle>Medium</CardTitle>
          </CardContent>
        </Card>
        <Card size='l' width={260}>
          <CardPreview>
            <SearchIcon size={28} />
          </CardPreview>
          <CardContent>
            <CardTitle>Large</CardTitle>
          </CardContent>
        </Card>
      </Flex>
    ),
    clickable: (
      <Card width={220} onclick={handleOpen}>
        <CardContent vertical>
          <CardTitle>Open</CardTitle>
          <Description>Click the card to trigger the handler.</Description>
        </CardContent>
      </Card>
    ),
    hoverable: (
      <Card hoverable width={220}>
        <CardPreview>
          <SunIcon size={24} />
        </CardPreview>
        <CardContent vertical>
          <CardTitle>Hoverable</CardTitle>
          <Description>Hover the card to see the lift.</Description>
        </CardContent>
      </Card>
    ),
    width: (
      <Card width={120} height={120}>
        <CardContent>
          Card content goes here.
        </CardContent>
      </Card>
    ),
    link: (
      <Card element='a' href='/ui/components' hoverable width={220}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent vertical>
          <CardTitle>Components</CardTitle>
          <Description>Browse all components from a single page.</Description>
        </CardContent>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
