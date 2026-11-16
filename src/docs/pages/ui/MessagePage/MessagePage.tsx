import type { HighlightExamples } from '@docs/ui'

import { message } from '../../../../helpers'
import { Button, Flex } from '../../../../ui'
import { MarkdownTemplate } from '../../../templates'
import description from './MessagePage.md'

const showMessage = () => message('Saved')
const showSuccess = () => message('Saved', { type: 'success' })
const showError = () => message('Something went wrong', { type: 'error' })
const showWarning = () => message('Check the form', { type: 'warning' })
const showInfo = () => message('Heads up', { type: 'info' })
const showTimed = () => message('Saved', { timeout: 2 })
const showSticky = () => message('Saved', { timeout: 0 })

export default function MessagePage () {
  const examples: HighlightExamples = {
    basic: (
      <Button onclick={showMessage}>Show message</Button>
    ),
    type: (
      <Flex gap={8} wrap>
        <Button onclick={showSuccess}>Success</Button>
        <Button onclick={showError}>Error</Button>
        <Button onclick={showWarning}>Warning</Button>
        <Button onclick={showInfo}>Info</Button>
      </Flex>
    ),
    timeout: (
      <Flex gap={8} wrap>
        <Button onclick={showTimed}>Show for 2 seconds</Button>
        <Button onclick={showSticky}>Show until clicked</Button>
      </Flex>
    ),
  }

  return (
    <MarkdownTemplate text={description} examples={examples} />
  )
}
