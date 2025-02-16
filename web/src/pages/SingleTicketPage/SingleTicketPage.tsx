import { Link, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import SingleTicketCell from '~/components/SingleTicketCell'

const SingleTicketPage = () => {
  const { id } = useParams()

  if (!id) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-center text-zinc-400' role='alert'>
          No ticket ID provided
        </div>
      </div>
    )
  }

  return (
    <>
      <Metadata title='Ticket Details' description='Ticket details page' />

      <main className='flex min-h-screen flex-col px-4 py-8'>
        <div className='mx-auto w-full max-w-4xl space-y-6'>
          <header className='flex items-center justify-between'>
            <Link
              to={routes.tickets()}
              className='rounded-lg bg-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:bg-zinc-600'
            >
              ← Back to Tickets
            </Link>
          </header>

          <SingleTicketCell id={id} />
        </div>
      </main>
    </>
  )
}

export default SingleTicketPage
