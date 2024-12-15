import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'user1@example.com',
        name: 'User One'
      }
    },
    two: {
      data: {
        email: 'user2@example.com',
        name: 'User Two'
      }
    }
  }
})

export type StandardScenario = ScenarioData<User, 'user'>
