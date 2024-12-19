export const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
} as const

export type TicketPriorityType = keyof typeof TicketPriority
