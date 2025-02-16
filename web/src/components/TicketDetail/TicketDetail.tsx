import {
  TicketPriority,
  TicketPriorityType,
  TicketStatus,
  TicketStatusType
} from 'api/src/lib/constants/enums'

import { useAuth } from '~/auth'

export interface TicketDetailProps {
  ticket: {
    id: string
    title: string
    description: string
    status: TicketStatusType
    priority: TicketPriorityType
    createdAt: string
    updatedAt: string
    user: {
      id: string
      name?: string | null
    }
    assignedToUser?: {
      id: string
      name?: string | null
    } | null
  }
}

const TicketDetail = ({ ticket }: TicketDetailProps) => {
  const { currentUser } = useAuth()
  const isCreator = currentUser?.id === ticket.user.id

  const getStatusColor = (status: TicketStatusType) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'bg-emerald-300/20 text-emerald-200'
      case TicketStatus.IN_PROGRESS:
        return 'bg-yellow-300/20 text-yellow-200'
      case TicketStatus.CLOSED:
        return 'bg-zinc-300/20 text-zinc-200'
    }
  }

  const getPriorityColor = (priority: TicketPriorityType) => {
    switch (priority) {
      case TicketPriority.HIGH:
        return 'bg-red-300/20 text-red-200'
      case TicketPriority.MEDIUM:
        return 'bg-yellow-300/20 text-yellow-200'
      case TicketPriority.LOW:
        return 'bg-blue-300/20 text-blue-200'
    }
  }

  return (
    <article className='space-y-8 rounded-xl bg-zinc-700 p-6'>
      <header className='space-y-4'>
        <div className='flex items-start justify-between'>
          <h1 className='text-2xl font-bold text-zinc-100'>{ticket.title}</h1>
          {isCreator && (
            <div className='flex gap-2'>
              <button className='rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium text-zinc-200'>
                Edit
              </button>
              <button className='rounded-lg bg-red-900/50 px-4 py-2 text-sm font-medium text-red-200'>
                Delete
              </button>
            </div>
          )}
        </div>
        <div className='flex flex-wrap gap-3'>
          <span
            className={`rounded-full px-3 py-1 text-sm ${getStatusColor(ticket.status)}`}
            role='status'
          >
            {ticket.status.replace('_', ' ')}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm ${getPriorityColor(ticket.priority)}`}
            role='status'
          >
            {ticket.priority}
          </span>
        </div>
      </header>

      <section className='space-y-4'>
        <div className='rounded-lg bg-zinc-700/50 p-4'>
          <p className='whitespace-pre-wrap text-zinc-200'>{ticket.description}</p>
        </div>

        <dl className='grid gap-4 text-sm text-zinc-300 sm:grid-cols-2'>
          <div>
            <dt className='font-medium'>Created by</dt>
            <dd>{ticket.user.name || 'Unknown User'}</dd>
            <dt className='mt-2 font-medium'>Created</dt>
            <dd>{new Date(ticket.createdAt).toLocaleString()}</dd>
          </div>
          <div>
            <dt className='font-medium'>Assigned to</dt>
            <dd>{ticket.assignedToUser?.name || 'Not assigned'}</dd>
            <dt className='mt-2 font-medium'>Last updated</dt>
            <dd>{new Date(ticket.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
      </section>
    </article>
  )
}

export default TicketDetail
