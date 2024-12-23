import { TicketPriority, TicketStatus } from 'api/src/lib/constants/enums'

export const standard = () => ({
  ticket: {
    id: '1',
    title: 'Test Ticket',
    description: 'This is a test ticket description',
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    user: {
      name: 'John Doe'
    },
    assignedToUser: {
      name: 'Jane Smith'
    }
  }
})
