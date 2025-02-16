import { TicketPriority, TicketStatus } from 'api/src/lib/constants/enums'

import { render, screen } from '@redwoodjs/testing/web'

import type { TicketDetailProps } from './TicketDetail'
import TicketDetail from './TicketDetail'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TicketDetail', () => {
  const mockTicket: TicketDetailProps['ticket'] = {
    id: '1',
    title: 'Test Ticket',
    description: 'Test Description',
    status: TicketStatus.OPEN,
    priority: TicketPriority.MEDIUM,
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    user: {
      id: '1',
      name: 'Test User'
    },
    assignedToUser: null
  }

  describe('Content rendering', () => {
    it('displays all ticket information', () => {
      const currentUser = { id: '2', email: 'other@example.com', name: 'Other User' }
      mockCurrentUser(currentUser)

      render(<TicketDetail ticket={mockTicket} />)

      expect(screen.getByText('Test Ticket')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('OPEN')).toBeInTheDocument()
      expect(screen.getByText('MEDIUM')).toBeInTheDocument()
      expect(screen.getByText('Test User')).toBeInTheDocument()
    })
  })

  describe('Action buttons', () => {
    it('shows buttons when current user is the ticket creator', () => {
      const currentUser = { id: '1', email: 'test@example.com', name: 'Test User' }
      mockCurrentUser(currentUser)

      render(<TicketDetail ticket={mockTicket} />)

      const editButton = screen.getByRole('button', { name: 'Edit' })
      const deleteButton = screen.getByRole('button', { name: 'Delete' })
      expect(editButton).toBeInTheDocument()
      expect(deleteButton).toBeInTheDocument()
    })

    it('hides buttons when current user is not the creator', () => {
      const currentUser = { id: '2', email: 'other@example.com', name: 'Other User' }
      mockCurrentUser(currentUser)

      render(<TicketDetail ticket={mockTicket} />)

      const editButton = screen.queryByRole('button', { name: 'Edit' })
      const deleteButton = screen.queryByRole('button', { name: 'Delete' })
      expect(editButton).not.toBeInTheDocument()
      expect(deleteButton).not.toBeInTheDocument()
    })

    it('hides buttons when user is not authenticated', () => {
      mockCurrentUser(null)

      render(<TicketDetail ticket={mockTicket} />)

      const editButton = screen.queryByRole('button', { name: 'Edit' })
      const deleteButton = screen.queryByRole('button', { name: 'Delete' })
      expect(editButton).not.toBeInTheDocument()
      expect(deleteButton).not.toBeInTheDocument()
    })
  })
})
