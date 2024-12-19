import type { Prisma, Ticket } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { TicketPriority } from 'src/lib/constants/enums'

export const standard = defineScenario<Prisma.TicketCreateArgs>({
  ticket: {
    one: {
      data: {
        title: 'First Ticket',
        description: 'First ticket description',
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
        priority: TicketPriority.MEDIUM,
        user: {
          create: {
            email: 'user2@example.com',
            hash: 'dummy-hash',
            salt: 'dummy-salt'
          }
        }
      }
    }
  }
})

export type StandardScenario = ScenarioData<Ticket, 'ticket'>
