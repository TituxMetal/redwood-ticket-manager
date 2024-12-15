import { render, screen, waitFor } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPage />)
    }).not.toThrow()
  })

  it('renders the login form', () => {
    render(<LoginPage />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('has link to signup page', () => {
    render(<LoginPage />)

    const signupLink = screen.getByRole('link', { name: /sign up/i })
    expect(signupLink).toBeInTheDocument()
    expect(signupLink).toHaveAttribute('href', '/signup')
  })

  it('shows validation errors for empty form submission', async () => {
    render(<LoginPage />)

    const submitButton = screen.getByRole('button', { name: /login/i })
    submitButton.click()

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
      expect(screen.getByText(/String must contain at least 6 character/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginPage />)

    const emailField = screen.getByLabelText(/email/i)
    emailField.focus()
    await waitFor(() => {
      emailField.blur()
    })

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    render(<LoginPage />)

    const passwordField = screen.getByLabelText(/password/i)
    passwordField.focus()
    await waitFor(() => {
      passwordField.blur()
    })

    await waitFor(() => {
      expect(screen.getByText(/String must contain at least 6 character/i)).toBeInTheDocument()
    })
  })
})
