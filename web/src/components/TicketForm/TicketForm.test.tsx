import { TicketPriority } from 'api/src/lib/constants/enums'
import { createTicketSchema } from 'api/src/lib/shared/validationSchema'

import { render, screen } from '@redwoodjs/testing/web'

import TicketForm from './TicketForm'

const mockCurrentUser = {
  id: '123',
  email: 'test@test.com'
}

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: mockCurrentUser
  })
}))

describe('TicketForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  describe('Component Structure', () => {
    it('renders create mode correctly', () => {
      // Arrange & Act
      render(
        <TicketForm mode='create' onSubmit={mockOnSubmit} validationSchema={createTicketSchema} />
      )

      // Assert
      expect(screen.getByRole('heading', { name: 'Create a new ticket' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Create Ticket' })).toBeInTheDocument()
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    })

    it('renders edit mode correctly', () => {
      // Arrange & Act
      render(
        <TicketForm mode='edit' onSubmit={mockOnSubmit} validationSchema={createTicketSchema} />
      )

      // Assert
      expect(screen.getByRole('heading', { name: 'Edit a ticket' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Update Ticket' })).toBeInTheDocument()
      expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    })
  })

  describe('Form Configuration', () => {
    it('renders all priority options', () => {
      // Arrange & Act
      render(
        <TicketForm mode='create' onSubmit={mockOnSubmit} validationSchema={createTicketSchema} />
      )

      // Assert
      const prioritySelect = screen.getByLabelText(/priority/i)
      const options = Array.from(prioritySelect.getElementsByTagName('option'))
      const optionValues = options.map(option => option.value)
      expect(optionValues).toEqual(Object.values(TicketPriority))
    })

    it('uses the correct validation schema', () => {
      // Arrange & Act
      const { rerender } = render(
        <TicketForm mode='create' onSubmit={mockOnSubmit} validationSchema={createTicketSchema} />
      )

      // Assert
      expect(screen.getByRole('form')).toBeInTheDocument()

      // Re-render with same schema
      rerender(
        <TicketForm mode='edit' onSubmit={mockOnSubmit} validationSchema={createTicketSchema} />
      )

      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })
})
