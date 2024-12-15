import { useEffect } from 'react'

import { registerUserSchema } from 'api/src/lib/shared/validationSchema'

import { UseFormSetError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from '~/auth'
import AuthForm, { AuthFormData } from '~/components/AuthForm/AuthForm'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data: AuthFormData, setError: UseFormSetError<AuthFormData>) => {
    try {
      const response = await signUp({
        username: data.email,
        password: data.password,
        name: data.name
      })

      if (response.error) {
        setError('root', { message: response.error })
        toast.error(response.error)
        return
      }

      if (response.message) {
        toast(response.message)
        return
      }
    } catch (error) {
      console.log('error in catch', error)
      setError('root', { message: error.message })
    }
  }

  return (
    <>
      <Metadata title='Signup' />

      <main className='mx-4 pb-4'>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <AuthForm mode='signup' onSubmit={onSubmit} validationSchema={registerUserSchema} />
      </main>
    </>
  )
}

export default SignupPage
