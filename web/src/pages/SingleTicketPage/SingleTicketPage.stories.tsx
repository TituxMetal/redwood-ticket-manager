import type { Meta, StoryObj } from '@storybook/react'

import SingleTicketPage from './SingleTicketPage'

const meta: Meta<typeof SingleTicketPage> = {
  component: SingleTicketPage
}

export default meta

type Story = StoryObj<typeof SingleTicketPage>

export const Primary: Story = {}
