import { loginUserSchema, registerUserSchema } from 'api/src/lib/shared/validationSchema'

import { render, screen } from '@redwoodjs/testing/web'

import AuthForm from './AuthForm'

describe('AuthForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  describe('Component Structure', () => {
    it('renders login mode correctly', () => {
      render(<AuthForm mode='login' onSubmit={mockOnSubmit} validationSchema={loginUserSchema} />)

      // Verify login-specific elements
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
      expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument() // Name field should not exist
      expect(screen.getByText('Need an account?')).toBeInTheDocument()
    })

    it('renders signup mode correctly', () => {
      render(
        <AuthForm mode='signup' onSubmit={mockOnSubmit} validationSchema={registerUserSchema} />
      )

      // Verify signup-specific elements
      expect(screen.getByRole('heading', { name: 'Signup' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument() // Name field should exist
      expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    })
  })

  describe('Props and Configuration', () => {
    it('passes the correct validation schema', () => {
      const { rerender } = render(
        <AuthForm mode='login' onSubmit={mockOnSubmit} validationSchema={loginUserSchema} />
      )

      // Re-render with signup schema
      rerender(
        <AuthForm mode='signup' onSubmit={mockOnSubmit} validationSchema={registerUserSchema} />
      )

      // No errors should be thrown during re-render
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })
})
