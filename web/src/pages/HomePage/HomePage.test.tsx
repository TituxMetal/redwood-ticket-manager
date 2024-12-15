import { render, screen } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  describe('page content', () => {
    beforeEach(() => {
      render(<HomePage />)
    })

    it('displays the welcome heading', () => {
      const heading = screen.getByRole('heading', {
        name: /Welcome to Your Task Manager/i,
        level: 1
      })
      expect(heading).toBeInTheDocument()
    })

    it('displays the description text', () => {
      const description = screen.getByText(/Manage your tasks efficiently and stay organized/i)
      expect(description).toBeInTheDocument()
    })

    it('displays the no tasks message', () => {
      const noTasksMessage = screen.getByText(
        /There is no tasks for the moment, you'll be able to create them soon/i
      )
      expect(noTasksMessage).toBeInTheDocument()
    })
  })
})
