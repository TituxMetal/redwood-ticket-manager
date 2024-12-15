// web/src/components/AuthForm/AuthForm.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  FieldError,
  Form,
  FormError,
  Label,
  PasswordField,
  RWGqlError,
  Submit,
  TextField,
  useForm,
  UseFormSetError
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

type AuthMode = 'login' | 'signup'

interface AuthFormProps {
  mode: AuthMode
  onSubmit: (data: AuthFormData, setError: UseFormSetError<AuthFormData>) => Promise<void>
  validationSchema: z.ZodSchema
}

export interface AuthFormData {
  email: string
  password: string
  name?: string
}

const AuthForm = ({ mode, onSubmit, validationSchema }: AuthFormProps) => {
  const {
    formState: { errors },
    setError
  } = useForm<AuthFormData>({
    mode: 'onBlur',
    resolver: zodResolver(validationSchema)
  })

  const isLogin = mode === 'login'
  const title = isLogin ? 'Login' : 'Signup'
  const submitLabel = isLogin ? 'Login' : 'Sign Up'
  const toggleText = isLogin ? 'Need an account?' : 'Already have an account?'
  const toggleLink = isLogin ? routes.signup() : routes.login()
  const toggleLabel = isLogin ? 'Sign up!' : 'Login!'

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <h1 className='mb-6 text-3xl font-bold text-zinc-100'>{title}</h1>
      <Form<AuthFormData>
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

        <div className='mb-4'>
          <Label
            name='email'
            className='block text-sm font-medium text-zinc-200'
            errorClassName='text-red-400 font-bold'
          >
            Email
          </Label>
          <TextField
            name='email'
            className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
            errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
          />
          <FieldError name='email' className='font-bold text-red-400' />
        </div>

        {!isLogin && (
          <div className='mb-4'>
            <Label
              name='name'
              className='block text-sm font-medium text-zinc-200'
              errorClassName='text-red-400 font-bold'
            >
              Name
            </Label>
            <TextField
              name='name'
              className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
              errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
            />
            <FieldError name='name' className='font-bold text-red-400' />
          </div>
        )}

        <div className='mb-6'>
          <Label
            name='password'
            className='block text-sm font-medium text-zinc-200'
            errorClassName='text-red-400 font-bold'
          >
            Password
          </Label>
          <PasswordField
            name='password'
            className='mt-1 block w-full rounded-md border border-zinc-400 bg-zinc-700 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring-blue-300'
            errorClassName='mt-1 block w-full rounded-md border border-red-400 bg-zinc-700 px-3 py-2 focus:border-red-300 focus:outline-none focus:ring-red-300'
          />
          <FieldError name='password' className='font-bold text-red-400' />
        </div>

        <Submit className='w-full rounded-md bg-blue-700 px-4 py-2 text-zinc-100 hover:bg-blue-800'>
          {submitLabel}
        </Submit>
      </Form>
      <span>{toggleText}</span>{' '}
      <Link to={toggleLink} className='text-blue-400 underline'>
        {toggleLabel}
      </Link>
    </div>
  )
}

export default AuthForm
