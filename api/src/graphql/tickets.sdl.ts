export const schema = gql`
  type Ticket {
    id: String!
    title: String!
    description: String!
    status: TicketStatus
    priority: TicketPriorityType!
    userId: String!
    user: User!
    assignedToUserId: String
    assignedToUser: User
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TicketStatus {
    OPEN
    IN_PROGRESS
    CLOSED
  }

  enum TicketPriorityType {
    LOW
    MEDIUM
    HIGH
  }

  type Query {
    tickets: [Ticket!]! @requireAuth
    ticket(id: String!): Ticket @requireAuth
  }

  input CreateTicketInput {
    title: String!
    description: String!
    priority: String!
    userId: String!
    assignedToUserId: String
  }

  input UpdateTicketInput {
    title: String
    description: String
    status: String
    priority: String
    userId: String
    assignedToUserId: String
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket! @requireAuth
    updateTicket(id: String!, input: UpdateTicketInput!): Ticket! @requireAuth
    deleteTicket(id: String!): Ticket! @requireAuth
  }
`
