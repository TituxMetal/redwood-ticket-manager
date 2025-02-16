import { TicketPriority, TicketStatus } from 'src/lib/constants/enums'
import { db } from 'src/lib/db'
import { ZodValidationError } from 'src/lib/zodValidation'

import { createTicket, deleteTicket, ticket, tickets, updateTicket } from './tickets'
import type { StandardScenario } from './tickets.scenarios'

describe('tickets', () => {
  beforeEach(async () => {
    await db.$transaction([db.ticket.deleteMany(), db.user.deleteMany()])
  })

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
    scenario('returns a single ticket with relations', async (scenario: StandardScenario) => {
      const expectedTicket = scenario.ticket.one

      const result = await ticket({ id: expectedTicket.id })

      expect(result).toMatchObject({
        id: expectedTicket.id,
        title: expectedTicket.title,
        description: expectedTicket.description,
        status: expectedTicket.status,
        priority: expectedTicket.priority,
        userId: expectedTicket.userId,
        assignedToUserId: expectedTicket.assignedToUserId,
        user: {
          id: expect.any(String),
          email: 'user1@example.com',
          name: null
        },
        assignedToUser: null
      })
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.updatedAt).toBeInstanceOf(Date)
    })

    scenario('returns null for non-existent ticket', async () => {
      const nonExistentId = 'non-existent-id'

      await expect(ticket({ id: nonExistentId })).rejects.toThrow(
        'Ticket not found: non-existent-id'
      )
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

      expect(result).toMatchObject({
        title: newTicket.title,
        description: newTicket.description,
        priority: newTicket.priority,
        userId: newTicket.userId,
        status: TicketStatus.OPEN
      })
      expect(result.id).toBeDefined()
      expect(result.createdAt).toBeInstanceOf(Date)
      expect(result.updatedAt).toBeInstanceOf(Date)
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
        fail('Should have thrown a validation error')
      } catch (error) {
        expect(error).toBeInstanceOf(ZodValidationError)
        expect(error.message).toContain('Validation failed')
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
        ...updateData,
        description: originalTicket.description,
        userId: originalTicket.userId
      })
      expect(result.updatedAt).toBeInstanceOf(Date)
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

      expect(deletedTicket.id).toEqual(ticketToDelete.id)
      await expect(ticket({ id: ticketToDelete.id })).rejects.toThrow(
        `Ticket not found: ${ticketToDelete.id}`
      )
    })

    scenario('fails with non-existent id', async () => {
      const nonExistentId = 'non-existent-id'

      await expect(deleteTicket({ id: nonExistentId })).rejects.toThrow()
    })
  })

  afterAll(async () => {
    await db.$disconnect()
  })
})
