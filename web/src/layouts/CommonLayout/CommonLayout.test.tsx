import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import CommonLayout from './CommonLayout'

const mockUseAuth = jest.fn()

jest.mock('~/auth', () => ({
  useAuth: () => mockUseAuth()
}))

describe('CommonLayout', () => {
  const mockLogOut = jest.fn()

  describe('unauthenticated user', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        currentUser: null,
        logOut: mockLogOut
      })
    })

    it('shows login and signup links', () => {
      render(<CommonLayout />)

      const loginLink = screen.getByRole('link', { name: 'Login' })
      const signupLink = screen.getByRole('link', { name: 'Signup' })

      expect(loginLink).toHaveAttribute('href', routes.login())
      expect(signupLink).toHaveAttribute('href', routes.signup())
    })

    it('does not show authenticated user elements', () => {
      render(<CommonLayout />)

      expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: 'Tickets' })).not.toBeInTheDocument()
    })
  })

  describe('authenticated user', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        currentUser: { name: 'John Doe' },
        logOut: mockLogOut
      })
    })

    it('shows user navigation elements', () => {
      render(<CommonLayout />)

      const userLink = screen.getByRole('link', { name: 'John Doe' })
      const ticketsLink = screen.getByRole('link', { name: 'Tickets' })
      const logoutButton = screen.getByRole('button', { name: 'Logout' })

      expect(userLink).toHaveAttribute('href', routes.home())
      expect(ticketsLink).toHaveAttribute('href', routes.tickets())
      expect(logoutButton).toBeInTheDocument()
    })

    it('handles logout click', () => {
      render(<CommonLayout />)

      screen.getByRole('button', { name: 'Logout' }).click()

      expect(mockLogOut).toHaveBeenCalledTimes(1)
    })

    it('does not show unauthenticated user elements', () => {
      render(<CommonLayout />)

      expect(screen.queryByRole('link', { name: 'Login' })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: 'Signup' })).not.toBeInTheDocument()
    })
  })

  describe('common elements', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        currentUser: null,
        logOut: mockLogOut
      })
    })

    it('renders header with site title', () => {
      render(<CommonLayout />)

      const titleLink = screen.getByRole('link', { name: 'Redwood Starter' })

      expect(titleLink).toHaveAttribute('href', '/')
    })

    it('renders main content', () => {
      const content = 'Main content'

      render(<CommonLayout>{content}</CommonLayout>)

      expect(screen.getByText(content)).toBeInTheDocument()
    })

    it('renders footer with github link', () => {
      render(<CommonLayout />)

      const githubLink = screen.getByRole('link', { name: 'TituxMetal' })

      expect(githubLink).toHaveAttribute('href', 'https://github.com/TituxMetal')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
