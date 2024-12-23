import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import SingleTicketCell from '~/components/SingleTicketCell'

const SingleTicketPage = () => {
  const { id } = useParams()

  return (
    <>
      <Metadata title='Ticket Details' description='Ticket details page' />

      <div className='flex min-h-screen flex-col items-center px-4 py-16'>
        <div className='w-full max-w-4xl'>
          <SingleTicketCell id={id} />
        </div>
      </div>
    </>
  )
}

export default SingleTicketPage
