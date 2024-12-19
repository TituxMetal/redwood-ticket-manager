// import { Link, routes } from '@redwoodjs/router'
import { createTicketSchema } from 'api/src/lib/shared/validationSchema'
import { CreateTicketInput } from 'types/graphql'

import { UseFormSetError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from '~/auth'
import TicketForm, { TicketFormData } from '~/components/TicketForm/TicketForm'

const CREATE_TICKET = gql`
  mutation CreateTicketMutation($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      priority
    }
  }
`

const NewTicketPage = () => {
  const { currentUser } = useAuth()
  const [createTicket] = useMutation(CREATE_TICKET, {
    onCompleted: () => {
      toast.success('Ticket created successfully')
      navigate(routes.home())
    }
  })

  const onSubmit = async (data: TicketFormData, setError: UseFormSetError<TicketFormData>) => {
    try {
      const input: CreateTicketInput = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        userId: currentUser.id
      }

      await createTicket({ variables: { input } })
    } catch (error) {
      setError('root', { message: error.message })
    }
  }

  return (
    <>
      <Metadata title='Create a new ticket' description='Create a new ticket page' />

      <TicketForm mode='create' onSubmit={onSubmit} validationSchema={createTicketSchema} />
    </>
  )
}

export default NewTicketPage
