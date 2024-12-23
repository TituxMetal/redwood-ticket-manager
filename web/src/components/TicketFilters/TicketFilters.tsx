import {
  TicketPriority,
  TicketPriorityType,
  TicketStatus,
  TicketStatusType
} from 'api/src/lib/constants/enums'

interface TicketFiltersProps {
  status: TicketStatusType | ''
  priority: TicketPriorityType | ''
  onStatusChange: (status: string) => void
  onPriorityChange: (priority: string) => void
}

const TicketFilters = ({
  status,
  priority,
  onStatusChange,
  onPriorityChange
}: TicketFiltersProps) => {
  return (
    <div className='mb-6 flex w-full max-w-4xl gap-4'>
      <div className='flex-1'>
        <label htmlFor='status' className='block text-sm font-medium text-zinc-200'>
          Status
        </label>
        <select
          id='status'
          value={status}
          onChange={e => onStatusChange(e.target.value)}
          className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 text-zinc-200 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
        >
          <option value=''>All</option>
          {Object.values(TicketStatus).map(value => (
            <option key={value} value={value}>
              {value.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className='flex-1'>
        <label htmlFor='priority' className='block text-sm font-medium text-zinc-200'>
          Priority
        </label>
        <select
          id='priority'
          value={priority}
          onChange={e => onPriorityChange(e.target.value)}
          className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 text-zinc-200 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
        >
          <option value=''>All</option>
          {Object.values(TicketPriority).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TicketFilters
