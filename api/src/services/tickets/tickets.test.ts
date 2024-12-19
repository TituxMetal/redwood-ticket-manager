import { TicketPriority } from 'src/lib/constants/enums'
import { ZodValidationError } from 'src/lib/zodValidation'

import { createTicket, deleteTicket, ticket, tickets, updateTicket } from './tickets'
import type { StandardScenario } from './tickets.scenarios'

describe('tickets', () => {
  describe('tickets query', () => {
    scenario('returns all tickets', async (scenario: StandardScenario) => {
      // Arrange
      const expectedLength = Object.keys(scenario.ticket).length

      // Act
      const result = await tickets()

      // Assert
      expect(result.length).toEqual(expectedLength)
    })
  })

  describe('ticket query', () => {
    scenario('returns a single ticket', async (scenario: StandardScenario) => {
      // Arrange
      const expectedTicket = scenario.ticket.one

      // Act
      const result = await ticket({ id: expectedTicket.id })

      // Assert
      expect(result).toEqual(expectedTicket)
    })

    scenario('returns null for non-existent ticket', async () => {
      // Arrange
      const nonExistentId = 'non-existent-id'

      // Act
      const result = await ticket({ id: nonExistentId })

      // Assert
      expect(result).toBeNull()
    })
  })

  describe('createTicket mutation', () => {
    scenario('creates a ticket with valid data', async (scenario: StandardScenario) => {
      // Arrange
      const newTicket = {
        title: 'New Ticket',
        description: 'Ticket Description',
        priority: TicketPriority.LOW,
        userId: scenario.ticket.one.userId
      }

      // Act
      const result = await createTicket({ input: newTicket })

      // Assert
      expect(result).toEqual(
        expect.objectContaining({
          title: newTicket.title,
          description: newTicket.description,
          priority: newTicket.priority,
          userId: newTicket.userId
        })
      )
    })

    scenario('fails with invalid data', async (scenario: StandardScenario) => {
      // Arrange
      const invalidTicket = {
        title: '', // Invalid: empty title
        description: 'Description',
        priority: TicketPriority.LOW,
        userId: scenario.ticket.one.userId
      }

      // Act & Assert
      try {
        await createTicket({ input: invalidTicket })
        fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(ZodValidationError)
        expect(error.extensions.properties.messages.title).toEqual([
          'String must contain at least 3 character(s)'
        ])
      }
    })
  })

  describe('updateTicket mutation', () => {
    scenario('updates a ticket', async (scenario: StandardScenario) => {
      // Arrange
      const originalTicket = scenario.ticket.one
      const updateData = {
        title: 'Updated Title',
        priority: TicketPriority.HIGH
      }

      // Act
      const result = await updateTicket({
        id: originalTicket.id,
        input: updateData
      })

      // Assert
      expect(result).toMatchObject({
        id: originalTicket.id,
        title: updateData.title,
        priority: updateData.priority,
        description: originalTicket.description,
        userId: originalTicket.userId
      })
    })

    scenario('fails with non-existent id', async () => {
      // Arrange
      const nonExistentId = 'non-existent-id'
      const updateData = { title: 'Updated Title' }

      // Act & Assert
      await expect(
        updateTicket({
          id: nonExistentId,
          input: updateData
        })
      ).rejects.toThrow()
    })
  })

  describe('deleteTicket mutation', () => {
    scenario('deletes a ticket', async (scenario: StandardScenario) => {
      // Arrange
      const ticketToDelete = scenario.ticket.one

      // Act
      const deletedTicket = await deleteTicket({ id: ticketToDelete.id })
      const checkTicket = await ticket({ id: ticketToDelete.id })

      // Assert
      expect(deletedTicket.id).toEqual(ticketToDelete.id)
      expect(checkTicket).toBeNull()
    })

    scenario('fails with non-existent id', async () => {
      // Arrange
      const nonExistentId = 'non-existent-id'

      // Act & Assert
      await expect(deleteTicket({ id: nonExistentId })).rejects.toThrow()
    })
  })
})
