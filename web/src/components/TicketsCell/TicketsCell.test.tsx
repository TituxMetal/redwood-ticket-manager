import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import { Empty, Failure, Loading, Success } from './TicketsCell'
import { standard } from './TicketsCell.mock'

describe('TicketsCell', () => {
  describe('Loading', () => {
    it('displays loading message', () => {
      render(<Loading />)

      const loadingElement = screen.getByText('Loading tickets...')

      expect(loadingElement).toBeInTheDocument()
    })
  })

  describe('Empty', () => {
    it('displays empty message', () => {
      render(<Empty />)

      expect(screen.getByText('No tickets found')).toBeInTheDocument()
    })
  })

  describe('Failure', () => {
    it('displays error message', () => {
      const error = new Error('Something went wrong')

      render(<Failure error={error} />)

      expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument()
    })
  })

  describe('Success', () => {
    it('renders all tickets from the response', () => {
      const mockData = standard()

      render(<Success tickets={mockData.tickets} />)

      mockData.tickets.forEach(ticket => {
        expect(screen.getByText(ticket.title)).toBeInTheDocument()
        expect(screen.getByText(ticket.description)).toBeInTheDocument()
        expect(screen.getByText(`by ${ticket.user.name}`)).toBeInTheDocument()
        expect(screen.getByText(`Assigned to: ${ticket.assignedToUser.name}`)).toBeInTheDocument()
      })
    })

    it('links each ticket to its detail page', () => {
      const mockData = standard()

      render(<Success tickets={mockData.tickets} />)

      mockData.tickets.forEach(ticket => {
        const ticketLink = screen.getByText(ticket.title).closest('a')
        expect(ticketLink).toHaveAttribute('href', routes.singleTicket({ id: ticket.id }))
      })
    })
  })
})
