import { TicketPriority, TicketStatus } from 'src/lib/constants/enums'
import { ZodValidationError } from 'src/lib/zodValidation'

import { createTicket, deleteTicket, ticket, tickets, updateTicket } from './tickets'
import type { StandardScenario } from './tickets.scenarios'

describe('tickets', () => {
  describe('tickets query', () => {
    scenario('returns all tickets', async (scenario: StandardScenario) => {
      const expectedLength = Object.keys(scenario.ticket).length

      const result = await tickets()

      expect(result.length).toEqual(expectedLength)
    })

    scenario('filters tickets by status', async (_scenario: StandardScenario) => {
      const status = TicketStatus.OPEN

      const result = await tickets({ status })

      expect(result.length).toBeGreaterThan(0)
      result.forEach(ticket => {
        expect(ticket.status).toBe(status)
      })
    })

    scenario('filters tickets by priority', async (_scenario: StandardScenario) => {
      const priority = TicketPriority.LOW

      const result = await tickets({ priority })

      expect(result.length).toBeGreaterThan(0)
      result.forEach(ticket => {
        expect(ticket.priority).toBe(priority)
      })
    })

    scenario('filters tickets by both status and priority', async (_scenario: StandardScenario) => {
      const status = TicketStatus.OPEN
      const priority = TicketPriority.LOW

      const result = await tickets({ status, priority })

      result.forEach(ticket => {
        expect(ticket.status).toBe(status)
        expect(ticket.priority).toBe(priority)
      })
    })
  })

  describe('ticket query', () => {
    scenario('returns a single ticket', async (scenario: StandardScenario) => {
      const expectedTicket = scenario.ticket.one

      const result = await ticket({ id: expectedTicket.id })

      expect(result).toEqual(expectedTicket)
    })

    scenario('returns null for non-existent ticket', async () => {
      const nonExistentId = 'non-existent-id'

      const result = await ticket({ id: nonExistentId })

      expect(result).toBeNull()
    })
  })

  describe('createTicket mutation', () => {
    scenario('creates a ticket with valid data', async (scenario: StandardScenario) => {
      const newTicket = {
        title: 'New Ticket',
        description: 'Ticket Description',
        priority: TicketPriority.LOW,
        userId: scenario.ticket.one.userId
      }

      const result = await createTicket({ input: newTicket })

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
      const invalidTicket = {
        title: '',
        description: 'Description',
        priority: TicketPriority.LOW,
        userId: scenario.ticket.one.userId
      }

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
      const originalTicket = scenario.ticket.one
      const updateData = {
        title: 'Updated Title',
        priority: TicketPriority.HIGH,
        status: TicketStatus.IN_PROGRESS
      }

      const result = await updateTicket({
        id: originalTicket.id,
        input: updateData
      })

      expect(result).toMatchObject({
        id: originalTicket.id,
        title: updateData.title,
        priority: updateData.priority,
        status: updateData.status,
        description: originalTicket.description,
        userId: originalTicket.userId
      })
    })

    scenario('fails with non-existent id', async () => {
      const nonExistentId = 'non-existent-id'
      const updateData = { title: 'Updated Title' }

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
      const ticketToDelete = scenario.ticket.one

      const deletedTicket = await deleteTicket({ id: ticketToDelete.id })
      const checkTicket = await ticket({ id: ticketToDelete.id })

      expect(deletedTicket.id).toEqual(ticketToDelete.id)
      expect(checkTicket).toBeNull()
    })

    scenario('fails with non-existent id', async () => {
      const nonExistentId = 'non-existent-id'

      await expect(deleteTicket({ id: nonExistentId })).rejects.toThrow()
    })
  })
})
