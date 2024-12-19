import { render } from '@redwoodjs/testing/web'

import TicketLayout from './TicketLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TicketLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TicketLayout />)
    }).not.toThrow()
  })
})
