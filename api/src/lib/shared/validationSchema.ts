import z from 'zod'

import { TicketPriority } from '../constants/enums'
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

export const createTicketSchema = z.object({
  title: required('Title').min(3).max(20),
  description: required('Description').min(3).max(200),
  priority: z.nativeEnum(TicketPriority)
})
