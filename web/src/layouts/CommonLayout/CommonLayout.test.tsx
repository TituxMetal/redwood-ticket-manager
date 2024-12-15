import { routes } from '@redwoodjs/router'
import { render, screen } from '@redwoodjs/testing/web'

import CommonLayout from './CommonLayout'

const mockUseAuth = jest.fn()

jest.mock('~/auth', () => ({
  useAuth: () => mockUseAuth()
}))

describe('CommonLayout', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      currentUser: null,
      logOut: jest.fn()
    })
  })

  it('renders successfully', () => {
    expect(() => render(<CommonLayout />)).not.toThrow()
  })

  describe('when user is not authenticated', () => {
    it('displays login and signup links', () => {
      render(<CommonLayout />)

      expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', routes.login())
      expect(screen.getByRole('link', { name: /signup/i })).toHaveAttribute('href', routes.signup())
    })
  })

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        currentUser: { name: 'John Doe' },
        logOut: jest.fn()
      })
    })

    it('displays user name and logout button', () => {
      render(<CommonLayout />)

      expect(screen.getByRole('link', { name: 'John Doe' })).toHaveAttribute('href', routes.home())
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
    })

    it('does not display login and signup links', () => {
      render(<CommonLayout />)

      expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /signup/i })).not.toBeInTheDocument()
    })
  })

  describe('layout structure', () => {
    it('renders header with navigation and site title', () => {
      render(<CommonLayout />)

      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /redwood starter/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /redwood starter/i })).toHaveAttribute('href', '/')
    })

    it('renders main content', () => {
      const testContent = 'Test Content'

      render(<CommonLayout>{testContent}</CommonLayout>)

      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByText(testContent)).toBeInTheDocument()
    })

    it('renders footer with attribution', () => {
      render(<CommonLayout />)

      const footer = screen.getByRole('contentinfo')
      const githubLink = screen.getByRole('link', { name: /TituxMetal/i })

      expect(footer).toBeInTheDocument()
      expect(screen.getByText(/Built with ❤️ and lots of coffee by/i)).toBeInTheDocument()
      expect(githubLink).toHaveAttribute('href', 'https://github.com/TituxMetal')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
