import { useState } from 'react'

import { TicketPriorityType, TicketStatusType } from 'api/src/lib/constants/enums'

import { Metadata } from '@redwoodjs/web'

import TicketFilters from '~/components/TicketFilters'
import TicketsCell from '~/components/TicketsCell'

const TicketsPage = () => {
  const [status, setStatus] = useState<TicketStatusType | ''>('')
  const [priority, setPriority] = useState<TicketPriorityType | ''>('')

  return (
    <>
      <Metadata title='List of Tickets' description='List of Tickets page' />

      <div className='flex min-h-screen flex-col items-center px-4 py-16'>
        <h1 className='mb-6 text-3xl font-bold text-zinc-100'>List of Tickets</h1>

        <TicketFilters
          status={status}
          priority={priority}
          onStatusChange={value => setStatus(value as TicketStatusType | '')}
          onPriorityChange={value => setPriority(value as TicketPriorityType | '')}
        />

        <TicketsCell status={status || undefined} priority={priority || undefined} />
      </div>
    </>
  )
}

export default TicketsPage
