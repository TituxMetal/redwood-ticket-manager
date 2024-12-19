import { render, screen, waitFor } from '@redwoodjs/testing/web'

import NewTicketPage from './NewTicketPage'

// Mock the auth context
const mockCurrentUser = {
  id: '123',
  email: 'test@test.com'
}

jest.mock('src/auth', () => ({
  useAuth: () => ({
    currentUser: mockCurrentUser
  })
}))

describe('NewTicketPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTicketPage />)
    }).not.toThrow()
  })

  it('renders the ticket form', () => {
    render(<NewTicketPage />)

    expect(screen.getByRole('heading', { name: /create a new ticket/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create ticket/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty form submission', async () => {
    render(<NewTicketPage />)

    const submitButton = screen.getByRole('button', { name: /create ticket/i })
    submitButton.click()

    await waitFor(() => {
      const errors = screen.getAllByText('String must contain at least 3 character(s)')
      expect(errors).toHaveLength(2)
    })
  })

  it('shows validation error for short title', async () => {
    render(<NewTicketPage />)

    const titleField = screen.getByLabelText(/title/i)
    titleField.focus()
    await waitFor(() => {
      titleField.blur()
    })

    await waitFor(() => {
      const errors = screen.getByText('String must contain at least 3 character(s)')
      expect(errors).toBeInTheDocument()
    })
  })

  it('shows validation error for short description', async () => {
    render(<NewTicketPage />)

    const descriptionField = screen.getByLabelText(/description/i)
    descriptionField.focus()
    await waitFor(() => {
      descriptionField.blur()
    })

    await waitFor(() => {
      const errors = screen.getByText('String must contain at least 3 character(s)')
      expect(errors).toBeInTheDocument()
    })
  })
})
