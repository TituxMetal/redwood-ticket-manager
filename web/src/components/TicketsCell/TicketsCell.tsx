import { TicketPriorityType, TicketStatusType } from 'api/src/lib/constants/enums'
import type { TicketsQuery, TicketsQueryVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web'

import TicketCard from '~/components/TicketCard'

interface TicketsCellProps {
  status?: TicketStatusType
  priority?: TicketPriorityType
}

export const QUERY: TypedDocumentNode<TicketsQuery, TicketsQueryVariables> = gql`
  query TicketsQuery($status: TicketStatus, $priority: TicketPriorityType) {
    tickets(status: $status, priority: $priority) {
      id
      title
      description
      status
      priority
      createdAt
      user {
        name
      }
      assignedToUser {
        name
      }
    }
  }
`

export const Loading = () => (
  <div className='flex justify-center'>
    <div className='animate-pulse'>Loading tickets...</div>
  </div>
)

export const Empty = () => <div className='text-center text-zinc-200'>No tickets found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className='font-bold text-red-300'>Error: {error?.message}</div>
)

export const beforeQuery = (props: TicketsCellProps) => {
  return {
    variables: {
      status: props.status,
      priority: props.priority
    }
  }
}

export const Success = ({ tickets }: CellSuccessProps<TicketsQuery>) => {
  return (
    <div className='space-y-4 py-6'>
      <div className='grid grid-cols-1 items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {tickets.map(ticket => (
          <Link to={routes.singleTicket({ id: ticket.id })} key={ticket.id}>
            <TicketCard ticket={ticket} />
          </Link>
        ))}
      </div>
    </div>
  )
}
