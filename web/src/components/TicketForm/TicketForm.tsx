// web/src/components/TicketForm/TicketForm.tsx

import { zodResolver } from '@hookform/resolvers/zod'
import { TicketPriority, TicketPriorityType } from 'api/src/lib/constants/enums'
import { z } from 'zod'

import {
  FieldError,
  Form,
  FormError,
  Label,
  RWGqlError,
  SelectField,
  Submit,
  TextField,
  useForm,
  UseFormSetError
} from '@redwoodjs/forms'

import { useAuth } from '~/auth'

export type TicketFormMode = 'create' | 'edit'

interface TicketFormProps {
  mode: TicketFormMode
  onSubmit: (data: TicketFormData, setError: UseFormSetError<TicketFormData>) => Promise<void>
  validationSchema: z.ZodSchema
}

export interface TicketFormData {
  title: string
  description: string
  priority: TicketPriorityType
  status?: string
  userId: string
}

const TicketForm = ({ mode, onSubmit, validationSchema }: TicketFormProps) => {
  const { currentUser } = useAuth()
  const {
    formState: { errors },
    setError
  } = useForm<TicketFormData>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema)
  })
  const isCreate = mode === 'create'
  const title = isCreate ? 'Create a new ticket' : 'Edit a ticket'

  return (
    <div className='flex min-h-screen flex-col items-center px-4 py-16'>
      <h1 className='mb-6 text-3xl font-bold text-zinc-100'>{title}</h1>
      <Form<TicketFormData>
        onSubmit={data => onSubmit(data, setError)}
        config={{
          mode: 'onBlur',
          resolver: zodResolver(validationSchema)
        }}
        className='mb-6 w-full max-w-md space-y-4'
        role='form'
      >
        <FormError
          error={errors.root as unknown as RWGqlError}
          wrapperClassName='form-error'
          titleClassName='text-red-400 font-bold'
          listClassName='text-red-400 font-bold'
        />

        <input type='hidden' name='userId' value={currentUser.id} />
        <div className='mb-4'>
          <Label
            name='title'
            className='block text-sm font-medium text-zinc-200'
            errorClassName='text-red-400 font-bold'
          >
            Title
          </Label>
          <TextField
            name='title'
            className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
            errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
          />
          <FieldError name='title' className='font-bold text-red-400' />
        </div>

        <div className='mb-4'>
          <Label
            name='description'
            className='block text-sm font-medium text-zinc-200'
            errorClassName='text-red-400 font-bold'
          >
            Description
          </Label>
          <TextField
            name='description'
            className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
            errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
          />
          <FieldError name='description' className='font-bold text-red-400' />
        </div>

        <div className='mb-4'>
          <Label
            name='priority'
            className='block text-sm font-medium text-zinc-200'
            errorClassName='text-red-400 font-bold'
          >
            Priority
          </Label>
          <SelectField
            name='priority'
            className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
            errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
          >
            {Object.values(TicketPriority).map(priority => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </SelectField>

          <FieldError name='priority' className='font-bold text-red-400' />
        </div>

        <Submit className='w-full rounded-md bg-blue-700 px-4 py-2 text-zinc-100 hover:bg-blue-800'>
          {isCreate ? 'Create Ticket' : 'Update Ticket'}
        </Submit>
      </Form>
    </div>
  )
}

export default TicketForm
