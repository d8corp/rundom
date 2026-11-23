import type { FlexProps } from '../../../ui'
import { Body, Box, Card, Flex, Header, Markdown, Typography } from '../../../ui'
import { inject } from '../../../utils'

export type ViewProps = FlexProps

export function View ({ title, ...props }: ViewProps) {
  return (
    <Card vertical {...props}>
      <Header>
        <Flex gap={6}>
          <Box color='danger' view='filled' circle size='xs' />
          <Box color='warning' view='filled' circle size='xs' />
          <Box color='success' view='filled' circle size='xs' />
        </Flex>
        <Typography flex>
          <Markdown text={inject(title, (title = '') => title)} />
        </Typography>
      </Header>
      <Body>
        <div>
          {props.children}
        </div>
      </Body>
    </Card>
  )
}
