import type { Meta, StoryObj } from '@storybook/react'

import NewTicketPage from './NewTicketPage'

const meta: Meta<typeof NewTicketPage> = {
  component: NewTicketPage
}

export default meta

type Story = StoryObj<typeof NewTicketPage>

export const Primary: Story = {}
