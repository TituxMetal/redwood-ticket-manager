import type { Meta, StoryObj } from '@storybook/react'
import { loginUserSchema, registerUserSchema } from 'api/src/lib/shared/validationSchema'

import AuthForm from './AuthForm'

const meta: Meta<typeof AuthForm> = {
  component: AuthForm,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof AuthForm>

export const Login: Story = {
  args: {
    mode: 'login',
    onSubmit: async data => {
      console.log('Login form submitted with:', data)
    },
    validationSchema: loginUserSchema
  }
}

export const Signup: Story = {
  args: {
    mode: 'signup',
    onSubmit: async data => {
      console.log('Signup form submitted with:', data)
    },
    validationSchema: registerUserSchema
  }
}
