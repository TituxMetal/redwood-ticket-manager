import type { SingleTicketQuery, SingleTicketQueryVariables } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web'

import TicketDetail from '~/components/TicketDetail'

export const QUERY: TypedDocumentNode<SingleTicketQuery, SingleTicketQueryVariables> = gql`
  query SingleTicketQuery($id: String!) {
    ticket(id: $id) {
      id
      title
      description
      status
      priority
      userId
      assignedToUserId
      createdAt
      updatedAt
      user {
        id
        name
      }
      assignedToUser {
        id
        name
      }
    }
  }
`

export const Loading = () => (
  <div className='flex justify-center'>
    <div className='animate-pulse' role='status' aria-label='Loading ticket'>
      Loading ticket...
    </div>
  </div>
)

export const Empty = () => (
  <div className='text-center text-zinc-200' role='alert'>
    No ticket found
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className='flex h-64 items-center justify-center'>
    <div className='text-center font-bold text-red-400' role='alert'>
      Error loading ticket: {error?.message || 'Unknown error'}
      {error?.stack && <pre className='mt-2 text-xs text-zinc-400'>{error.stack}</pre>}
    </div>
  </div>
)

export const beforeQuery = (props: { id: string }) => {
  return { variables: { id: props.id } }
}

export const Success = ({ ticket }: CellSuccessProps<SingleTicketQuery>) => {
  return <TicketDetail ticket={ticket} />
}
