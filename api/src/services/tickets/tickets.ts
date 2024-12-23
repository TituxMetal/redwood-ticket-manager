import { TicketPriorityType, TicketStatusType } from 'src/lib/constants/enums'
import { db } from 'src/lib/db'
import { createTicketSchema } from 'src/lib/shared/validationSchema'
import { validateWithZod } from 'src/lib/zodValidation'

interface TicketsArgs {
  status?: TicketStatusType
  priority?: TicketPriorityType
}

export const tickets = ({ status, priority }: TicketsArgs = {}) => {
  const where = {
    ...(status && { status }),
    ...(priority && { priority })
  }

  return db.ticket.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const ticket = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      userId: true,
      assignedToUserId: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      assignedToUser: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  })
}

export const createTicket = ({ input }) => {
  const { title, description, priority, userId, assignedToUserId } = input

  validateWithZod(input, createTicketSchema)

  return db.ticket.create({
    data: {
      title,
      description,
      priority,
      userId,
      assignedToUserId
    }
  })
}

export const updateTicket = ({ id, input }) => {
  return db.ticket.update({
    data: input,
    where: { id }
  })
}

export const deleteTicket = ({ id }) => {
  return db.ticket.delete({
    where: { id }
  })
}

export const Ticket = {
  user: (_obj, { root }) => {
    return db.ticket.findUnique({ where: { id: root?.id } }).user()
  },
  assignedToUser: (_obj, { root }) => {
    return db.ticket.findUnique({ where: { id: root?.id } }).assignedToUser()
  }
}
