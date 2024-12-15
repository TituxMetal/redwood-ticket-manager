import { render, screen, waitFor } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupPage />)
    }).not.toThrow()
  })

  it('renders the signup form', () => {
    render(<SignupPage />)

    expect(screen.getByRole('heading', { name: /signup/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('has link to login page', () => {
    render(<SignupPage />)

    const loginLink = screen.getByRole('link', { name: /login/i })
    expect(loginLink).toBeInTheDocument()
    expect(loginLink).toHaveAttribute('href', '/login')
  })

  it('shows validation errors for empty form submission', async () => {
    render(<SignupPage />)

    const submitButton = screen.getByRole('button', { name: /sign up/i })
    submitButton.click()

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument()
      expect(screen.getByText(/String must contain at least 6 character/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email', async () => {
    render(<SignupPage />)

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
    render(<SignupPage />)

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
