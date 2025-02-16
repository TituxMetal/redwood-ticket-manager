import { ZodValidationError } from 'src/lib/zodValidation'

import { createUser, deleteUser, updateUser, user, users } from './users'
import type { StandardScenario } from './users.scenarios'

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user(scenario.user.one.id)

    expect(result).toEqual(scenario.user.one)
  })

  describe('createUser', () => {
    scenario('creates a user with valid data', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Test User'
      }

      const result = await createUser(newUser)

      expect(result.email).toEqual(newUser.email)
      expect(result.name).toEqual(newUser.name)
    })

    scenario('fails to create a user with invalid email', async () => {
      const newUser = {
        email: 'invalid-email',
        name: 'Test User'
      }

      try {
        await createUser(newUser)
        fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(ZodValidationError)
        expect(error.extensions.properties.messages.email).toEqual(['Invalid email'])
      }
    })

    scenario('fails to create a user with short name', async () => {
      const newUser = {
        email: 'test@example.com',
        name: 'Te'
      }

      try {
        await createUser(newUser)
        fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(ZodValidationError)
        expect(error.extensions.properties.messages.name).toEqual([
          'String must contain at least 3 character(s)'
        ])
      }
    })
  })

  describe('updateUser', () => {
    scenario('updates a user', async (scenario: StandardScenario) => {
      const updatedEmail = 'updated@example.com'
      const original = await user(scenario.user.one.id)

      const result = await updateUser(scenario.user.one.id, {
        email: updatedEmail
      })

      expect(result.id).toEqual(original.id)
      expect(result.email).toEqual(updatedEmail)
    })

    scenario('updates a user name', async (scenario: StandardScenario) => {
      const updatedName = 'Updated Name'
      const original = await user(scenario.user.one.id)

      const result = await updateUser(scenario.user.one.id, {
        name: updatedName
      })

      expect(result.id).toEqual(original.id)
      expect(result.name).toEqual(updatedName)
    })
  })

  describe('deleteUser', () => {
    scenario('deletes a user', async (scenario: StandardScenario) => {
      const original = await deleteUser(scenario.user.one.id)
      const result = await user(original.id)

      expect(result).toEqual(null)
    })
  })
})
