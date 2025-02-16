import { TicketPriority, TicketStatus } from 'api/src/lib/constants/enums'

export const standard = () => ({
  ticket: {
    id: '1',
    title: 'Test Ticket',
    description: 'This is a test ticket description',
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    userId: 'user-1',
    assignedToUserId: 'user-2',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    user: {
      id: 'user-1',
      name: 'John Doe'
    },
    assignedToUser: {
      id: 'user-2',
      name: 'Jane Smith'
    }
  }
})
