import { render } from '@redwoodjs/testing/web'

import SingleTicketPage from './SingleTicketPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SingleTicketPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SingleTicketPage />)
    }).not.toThrow()
  })
})
