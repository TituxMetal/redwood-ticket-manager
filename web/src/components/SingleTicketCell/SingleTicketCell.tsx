import type { SingleTicketQuery, SingleTicketQueryVariables } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web'

import TicketCard from '~/components/TicketCard'

export const QUERY: TypedDocumentNode<SingleTicketQuery, SingleTicketQueryVariables> = gql`
  query SingleTicketQuery($id: String!) {
    ticket(id: $id) {
      id
      title
      description
      status
      priority
      createdAt
      updatedAt
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
    <div className='animate-pulse'>Loading ticket...</div>
  </div>
)

export const Empty = () => <div className='text-center text-zinc-200'>Ticket not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className='font-bold text-red-300'>Error: {error?.message}</div>
)

export const Success = ({ ticket }: CellSuccessProps<SingleTicketQuery>) => {
  return <TicketCard ticket={ticket} />
}
