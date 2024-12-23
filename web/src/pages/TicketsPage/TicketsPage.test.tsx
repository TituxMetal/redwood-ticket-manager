import { render, screen } from '@redwoodjs/testing/web'

import TicketsPage from './TicketsPage'

jest.mock('~/components/TicketsCell/TicketsCell', () => ({
  __esModule: true,
  default: () => <div data-testid='mock-tickets-cell'>Mocked TicketsCell</div>
}))

describe('TicketsPage', () => {
  it('renders the page title', () => {
    render(<TicketsPage />)

    const heading = screen.getByRole('heading', { name: 'List of Tickets' })

    expect(heading).toBeInTheDocument()
  })

  it('renders the TicketsCell component', () => {
    render(<TicketsPage />)

    expect(screen.getByTestId('mock-tickets-cell')).toBeInTheDocument()
  })
})
