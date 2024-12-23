import type { TicketPriorityType, TicketStatus } from 'types/graphql'

// Define your own mock data here:
export const standard = () => ({
  tickets: [
    {
      __typename: 'Ticket' as const,
      id: '42',
      title: 'Fix Navigation Bug',
      description: 'Users are experiencing issues with the navigation menu',
      status: 'OPEN' as TicketStatus,
      priority: 'HIGH' as TicketPriorityType,
      createdAt: '2023-12-15T10:00:00Z',
      user: {
        __typename: 'User' as const,
        name: 'John Doe'
      },
      assignedToUser: {
        __typename: 'User' as const,
        name: 'Jane Smith'
      }
    },
    {
      __typename: 'Ticket' as const,
      id: '43',
      title: 'Update Documentation',
      description: 'Documentation needs to be updated for new features',
      status: 'IN_PROGRESS' as TicketStatus,
      priority: 'MEDIUM' as TicketPriorityType,
      createdAt: '2023-12-14T15:30:00Z',
      user: {
        __typename: 'User' as const,
        name: 'Alice Johnson'
      },
      assignedToUser: {
        __typename: 'User' as const,
        name: 'Bob Wilson'
      }
    }
  ]
})
