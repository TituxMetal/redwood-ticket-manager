import { render, screen } from '@redwoodjs/testing/web'

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
    it('displays not found message', () => {
      render(<Empty />)

      expect(screen.getByText('Ticket not found')).toBeInTheDocument()
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
    it('displays ticket information using TicketCard', () => {
      const mockTicket = standard().ticket

      render(<Success ticket={mockTicket} />)

      expect(
        screen.getByRole('heading', { name: `${mockTicket.title} by ${mockTicket.user.name}` })
      ).toBeInTheDocument()
      expect(screen.getByText(mockTicket.description)).toBeInTheDocument()
      expect(screen.getByText(`Status: ${mockTicket.status.toLowerCase()}`)).toBeInTheDocument()
      expect(screen.getByText(`Priority: ${mockTicket.priority.toLowerCase()}`)).toBeInTheDocument()
      expect(
        screen.getByText(`Created at: ${new Date(mockTicket.createdAt).toLocaleDateString()}`)
      ).toBeInTheDocument()
      expect(screen.getByText(`Assigned to: ${mockTicket.assignedToUser.name}`)).toBeInTheDocument()
    })

    it('handles ticket without assigned user', () => {
      const mockTicket = {
        ...standard().ticket,
        assignedToUser: null
      }

      render(<Success ticket={mockTicket} />)

      expect(screen.getByText('Not assigned')).toBeInTheDocument()
    })
  })
})
