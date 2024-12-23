// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import TicketCard from './TicketCard'

const meta: Meta<typeof TicketCard> = {
  component: TicketCard,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof TicketCard>

export const Primary: Story = {}
