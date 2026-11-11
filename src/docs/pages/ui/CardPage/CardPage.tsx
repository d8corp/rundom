import type { HighlightExamples } from '@docs/ui'

import {
  Card,
  CardContent,
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
  const examples: HighlightExamples = {
    basic: (
      <Card style={{ width: '220px' }}>
        <CardContent>
          <CardTitle>Card title</CardTitle>
          <Description>Card content goes here.</Description>
        </CardContent>
      </Card>
    ),
    preview: (
      <Card style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Search</CardTitle>
          <Description>Find anything in the documentation.</Description>
        </CardContent>
      </Card>
    ),
    sizes: (
      <Flex gap={16} wrap>
        <Card size='s' style={{ width: '180px' }}>
          <CardPreview>
            <SunIcon size={20} />
          </CardPreview>
          <CardContent>
            <CardTitle>Small</CardTitle>
          </CardContent>
        </Card>
        <Card size='m' style={{ width: '220px' }}>
          <CardPreview>
            <CopyIcon size={24} />
          </CardPreview>
          <CardContent>
            <CardTitle>Medium</CardTitle>
          </CardContent>
        </Card>
        <Card size='l' style={{ width: '260px' }}>
          <CardPreview>
            <SearchIcon size={28} />
          </CardPreview>
          <CardContent>
            <CardTitle>Large</CardTitle>
          </CardContent>
        </Card>
      </Flex>
    ),
    interactive: (
      <Card hoverable clickable style={{ width: '220px' }}>
        <CardPreview>
          <SunIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Interactive</CardTitle>
          <Description>Hover or focus the card to see the state.</Description>
        </CardContent>
      </Card>
    ),
    link: (
      <Card element='a' href='/ui/overview' hoverable style={{ width: '220px' }}>
        <CardPreview>
          <SearchIcon size={24} />
        </CardPreview>
        <CardContent>
          <CardTitle>Overview</CardTitle>
          <Description>Browse all components from a single page.</Description>
        </CardContent>
      </Card>
    ),
  }

  return <MarkdownTemplate text={description} examples={examples} />
}
