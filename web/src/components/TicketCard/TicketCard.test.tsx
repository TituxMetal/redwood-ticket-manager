import { render, screen } from '@redwoodjs/testing/web'

import TicketCard from './TicketCard'

describe('TicketCard', () => {
  const defaultTicket = {
    id: '1',
    title: 'Fix Navigation Bug',
    description: 'Users are experiencing issues with the navigation menu',
    status: 'OPEN',
    priority: 'HIGH',
    createdAt: '2023-12-15T10:00:00Z',
    user: {
      name: 'John Doe'
    }
  }

  it('displays ticket information', () => {
    render(<TicketCard ticket={defaultTicket} />)

    expect(screen.getByText('Fix Navigation Bug')).toBeInTheDocument()
    expect(screen.getByText('by John Doe')).toBeInTheDocument()
    expect(
      screen.getByText('Users are experiencing issues with the navigation menu')
    ).toBeInTheDocument()
    expect(screen.getByText('Status: open')).toBeInTheDocument()
    expect(screen.getByText('Priority: high')).toBeInTheDocument()
    expect(screen.getByText('Created at: 12/15/2023')).toBeInTheDocument()
  })

  it('shows assigned user when present', () => {
    const ticketWithAssignee = {
      ...defaultTicket,
      assignedToUser: {
        name: 'Jane Smith'
      }
    }

    render(<TicketCard ticket={ticketWithAssignee} />)

    expect(screen.getByText('Assigned to: Jane Smith')).toBeInTheDocument()
  })

  it('shows not assigned message when no assignee', () => {
    render(<TicketCard ticket={defaultTicket} />)

    expect(screen.getByText('Not assigned')).toBeInTheDocument()
  })
})
