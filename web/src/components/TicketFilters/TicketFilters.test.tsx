import {
  TicketPriority,
  TicketPriorityType,
  TicketStatus,
  TicketStatusType
} from 'api/src/lib/constants/enums'

import { fireEvent, render, screen, within } from '@redwoodjs/testing/web'

import TicketFilters from './TicketFilters'

describe('TicketFilters', () => {
  const defaultProps = {
    status: '' as TicketStatusType | '',
    priority: '' as TicketPriorityType | '',
    onStatusChange: jest.fn(),
    onPriorityChange: jest.fn()
  }

  beforeEach(() => {
    defaultProps.onStatusChange.mockClear()
    defaultProps.onPriorityChange.mockClear()
  })

  it('renders status and priority filters', () => {
    render(<TicketFilters {...defaultProps} />)

    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
  })

  it('renders all status options', () => {
    render(<TicketFilters {...defaultProps} />)

    const statusSelect = screen.getByLabelText(/status/i)
    const options = Array.from(statusSelect.getElementsByTagName('option'))
    const optionValues = options.map(option => option.value)

    expect(optionValues).toEqual(['', ...Object.values(TicketStatus)])

    const statusOptions = within(statusSelect)
    expect(statusOptions.getByText('All')).toBeInTheDocument()
    expect(statusOptions.getByText('OPEN')).toBeInTheDocument()
    expect(statusOptions.getByText('IN PROGRESS')).toBeInTheDocument()
    expect(statusOptions.getByText('CLOSED')).toBeInTheDocument()
  })

  it('renders all priority options', () => {
    render(<TicketFilters {...defaultProps} />)

    const prioritySelect = screen.getByLabelText(/priority/i)
    const options = Array.from(prioritySelect.getElementsByTagName('option'))
    const optionValues = options.map(option => option.value)

    expect(optionValues).toEqual(['', ...Object.values(TicketPriority)])

    const priorityOptions = within(prioritySelect)
    expect(priorityOptions.getByText('All')).toBeInTheDocument()
    expect(priorityOptions.getByText('LOW')).toBeInTheDocument()
    expect(priorityOptions.getByText('MEDIUM')).toBeInTheDocument()
    expect(priorityOptions.getByText('HIGH')).toBeInTheDocument()
  })

  it('calls onStatusChange when status is changed', () => {
    render(<TicketFilters {...defaultProps} />)

    const statusSelect = screen.getByLabelText(/status/i)
    fireEvent.change(statusSelect, { target: { value: TicketStatus.OPEN } })

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(TicketStatus.OPEN)
  })

  it('calls onPriorityChange when priority is changed', () => {
    render(<TicketFilters {...defaultProps} />)

    const prioritySelect = screen.getByLabelText(/priority/i)
    fireEvent.change(prioritySelect, { target: { value: TicketPriority.HIGH } })

    expect(defaultProps.onPriorityChange).toHaveBeenCalledWith(TicketPriority.HIGH)
  })

  it('displays current filter values', () => {
    render(
      <TicketFilters
        {...defaultProps}
        status={TicketStatus.IN_PROGRESS}
        priority={TicketPriority.HIGH}
      />
    )

    const statusSelect = screen.getByLabelText(/status/i) as HTMLSelectElement
    const prioritySelect = screen.getByLabelText(/priority/i) as HTMLSelectElement

    expect(statusSelect.value).toBe(TicketStatus.IN_PROGRESS)
    expect(prioritySelect.value).toBe(TicketPriority.HIGH)
  })

  it('allows resetting filters to All', () => {
    render(
      <TicketFilters {...defaultProps} status={TicketStatus.OPEN} priority={TicketPriority.LOW} />
    )

    const statusSelect = screen.getByLabelText(/status/i)
    const prioritySelect = screen.getByLabelText(/priority/i)

    fireEvent.change(statusSelect, { target: { value: '' } })
    fireEvent.change(prioritySelect, { target: { value: '' } })

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith('')
    expect(defaultProps.onPriorityChange).toHaveBeenCalledWith('')
  })
})
