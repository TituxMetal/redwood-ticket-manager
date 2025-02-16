import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { Empty, Failure, Loading, Success } from './SingleTicketCell'
import { standard } from './SingleTicketCell.mock'

describe('SingleTicketCell', () => {
  describe('Loading', () => {
    it('displays loading message', () => {
      render(<Loading />)

      expect(screen.getByText('Loading ticket...')).toBeInTheDocument()
    })
  })

  describe('Empty', () => {
    it('displays empty message', () => {
      render(<Empty />)

      expect(screen.getByText('No ticket found')).toBeInTheDocument()
    })
  })

  describe('Failure', () => {
    it('displays error message', () => {
      const error = new Error('Oh no')
      render(<Failure error={error} />)

      expect(screen.getByText('Error loading ticket: Oh no')).toBeInTheDocument()
    })
  })

  describe('Success', () => {
    it('renders ticket details', async () => {
      const ticket = standard().ticket
      render(<Success ticket={ticket} />)

      await waitFor(() => {
        expect(screen.getByText(ticket.title)).toBeInTheDocument()
        expect(screen.getByText(ticket.description)).toBeInTheDocument()
        expect(screen.getByText(ticket.status)).toBeInTheDocument()
        expect(screen.getByText(ticket.priority)).toBeInTheDocument()
      })
    })

    it('displays user information', async () => {
      const ticket = {
        ...standard().ticket,
        user: { id: '1', name: 'John Doe' },
        assignedToUser: { id: '2', name: 'Jane Smith' }
      }
      render(<Success ticket={ticket} />)

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      })
    })
  })
})
