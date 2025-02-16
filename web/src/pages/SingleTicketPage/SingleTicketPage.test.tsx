import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import SingleTicketPage from './SingleTicketPage'

const mockUser = {
  id: 'test-user',
  email: 'test@example.com',
  name: 'Test User'
}

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  useParams: () => ({
    id: 'test-ticket-id'
  })
}))

describe('SingleTicketPage', () => {
  describe('with valid ticket ID', () => {
    beforeEach(() => {
      jest.spyOn(require('@redwoodjs/router'), 'useParams').mockReturnValue({
        id: 'test-ticket-id'
      })
    })

    it('should render SingleTicketCell with the ID', () => {
      mockCurrentUser(mockUser)

      render(<SingleTicketPage />)

      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /back to tickets/i })).toBeInTheDocument()
    })
  })

  describe('without ticket ID', () => {
    beforeEach(() => {
      jest.spyOn(require('@redwoodjs/router'), 'useParams').mockReturnValue({})
    })

    it('should display error message when no ID provided', () => {
      mockCurrentUser(mockUser)

      render(<SingleTicketPage />)

      expect(screen.getByRole('alert')).toHaveTextContent('No ticket ID provided')
    })
  })

  describe('navigation', () => {
    beforeEach(() => {
      jest.spyOn(require('@redwoodjs/router'), 'useParams').mockReturnValue({
        id: 'test-ticket-id'
      })
    })

    it('should have working back button', () => {
      mockCurrentUser(mockUser)

      render(<SingleTicketPage />)
      const backButton = screen.getByRole('link', { name: /back to tickets/i })

      expect(backButton).toHaveAttribute('href', routes.tickets())
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
