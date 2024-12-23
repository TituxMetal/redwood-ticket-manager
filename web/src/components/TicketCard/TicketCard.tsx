interface TicketCardProps {
  ticket: {
    id: string
    title: string
    description: string
    status?: string
    priority: string
    createdAt: string
    user: {
      name?: string
    }
    assignedToUser?: {
      name?: string
    }
  }
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <section className='rounded-lg bg-zinc-700 p-4 hover:bg-zinc-600'>
      <h3 className='text-lg font-semibold text-zinc-200'>
        {ticket.title}
        <span className='block text-xs text-zinc-300'>by {ticket.user.name}</span>
      </h3>
      <p className='mt-2 text-zinc-200'>{ticket.description}</p>
      <section className='flex justify-between gap-2'>
        <p className='mt-2 text-zinc-100'>
          Status: {ticket.status.replace('_', ' ').toLowerCase()}
        </p>
        <p className='mt-2 text-zinc-100'>Priority: {ticket.priority.toLowerCase()}</p>
      </section>
      <p className='mt-2 text-xs text-zinc-100'>
        Created at: {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
      {ticket.assignedToUser ? (
        <p className='mt-2 text-zinc-100'>Assigned to: {ticket.assignedToUser.name}</p>
      ) : (
        <p className='mt-2 text-zinc-100'>Not assigned</p>
      )}
    </section>
  )
}

export default TicketCard
