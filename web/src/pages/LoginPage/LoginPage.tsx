import { useEffect } from 'react'

import { loginUserSchema } from 'api/src/lib/shared/validationSchema'

import { UseFormSetError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from '~/auth'
import AuthForm, { AuthFormData } from '~/components/AuthForm/AuthForm'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data: AuthFormData, setError: UseFormSetError<AuthFormData>) => {
    const response = await logIn({
      username: data.email,
      password: data.password
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
  }

  return (
    <>
      <Metadata title='Login' />

      <main className='mx-4 pb-4'>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <AuthForm mode='login' onSubmit={onSubmit} validationSchema={loginUserSchema} />
      </main>
    </>
  )
}

export default LoginPage
