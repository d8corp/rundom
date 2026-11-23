import { Body } from '../Body'
import { CardTitle } from '../CardTitle'
import { Preview } from '../Preview'
import { Card } from './Card'

import { rundom } from '../../../rundom'
import { Description } from '../../typography/Description'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Card', () => {
  it('should render content', () => {
    rundom(<Card>Card content</Card>)

    expect(document.body.innerHTML).toBe('<div style="flex-direction: column;">Card content</div>')
  })

  it('should compose with card parts', () => {
    rundom(
      <Card>
        <Preview>
          <span>Preview</span>
        </Preview>
        <Body>
          <CardTitle>Title</CardTitle>
          <Description>Description</Description>
        </Body>
      </Card>,
    )

    expect(document.body.innerHTML)
      .toBe('<div style="flex-direction: column;"><div><span>Preview</span></div><div><div>Title</div><span>Description</span></div></div>')
  })
})
