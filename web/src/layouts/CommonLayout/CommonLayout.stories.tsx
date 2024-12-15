import type { Meta, StoryObj } from '@storybook/react'

import CommonLayout from './CommonLayout'

const meta: Meta<typeof CommonLayout> = {
  component: CommonLayout
}

export default meta

type Story = StoryObj<typeof CommonLayout>

export const Primary: Story = {}
