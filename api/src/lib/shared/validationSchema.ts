import z from 'zod'

const required = (field: string) => z.string({ required_error: `${field} is required` })

export const registerUserSchema = z.object({
  name: required('Name').min(3).max(20),
  email: required('Email').email(),
  password: required('Password').min(6)
})

export const loginUserSchema = z.object({
  email: required('Email').email(),
  password: required('Password').min(6)
})

export const createUserSchema = z.object({
  name: required('Name').min(3).max(20),
  email: required('Email').email()
})
