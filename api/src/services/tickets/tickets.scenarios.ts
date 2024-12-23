import type { Prisma, Ticket } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { TicketPriority, TicketStatus } from 'src/lib/constants/enums'

export const standard = defineScenario<Prisma.TicketCreateArgs>({
  ticket: {
    one: {
      data: {
        title: 'First Ticket',
        description: 'First ticket description',
        status: TicketStatus.OPEN,
        priority: TicketPriority.LOW,
        user: {
          create: {
            email: 'user1@example.com',
            hash: 'dummy-hash',
            salt: 'dummy-salt'
          }
        }
      }
    },
    two: {
      data: {
        title: 'Second Ticket',
        description: 'Second ticket description',
        status: TicketStatus.IN_PROGRESS,
        priority: TicketPriority.MEDIUM,
        user: {
          create: {
            email: 'user2@example.com',
            hash: 'dummy-hash',
            salt: 'dummy-salt'
          }
        }
      }
    },
    three: {
      data: {
        title: 'Third Ticket',
        description: 'Third ticket description',
        status: TicketStatus.CLOSED,
        priority: TicketPriority.HIGH,
        user: {
          create: {
            email: 'user3@example.com',
            hash: 'dummy-hash',
            salt: 'dummy-salt'
          }
        }
      }
    },
    four: {
      data: {
        title: 'Fourth Ticket',
        description: 'Fourth ticket description',
        status: TicketStatus.OPEN,
        priority: TicketPriority.LOW,
        user: {
          create: {
            email: 'user4@example.com',
            hash: 'dummy-hash',
            salt: 'dummy-salt'
          }
        }
      }
    }
  }
})

export type StandardScenario = ScenarioData<Ticket, 'ticket'>
