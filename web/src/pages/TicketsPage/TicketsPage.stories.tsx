import type { Meta, StoryObj } from '@storybook/react'

import TicketsPage from './TicketsPage'

const meta: Meta<typeof TicketsPage> = {
  component: TicketsPage
}

export default meta

type Story = StoryObj<typeof TicketsPage>

export const Primary: Story = {}
