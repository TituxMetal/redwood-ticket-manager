import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'
import { createUserSchema } from 'src/lib/shared/validationSchema'
import { validateWithZod } from 'src/lib/zodValidation'

export const users = () => {
  return db.user.findMany()
}

export const user = (id: string) => {
  return db.user.findUnique({ where: { id } })
}

export const createUser = (data: Prisma.UserCreateInput) => {
  validateWithZod(data, createUserSchema)

  return db.user.create({ data })
}

export const updateUser = (id: string, data: Prisma.UserUpdateInput) => {
  return db.user.update({ where: { id }, data })
}

export const deleteUser = (id: string) => {
  return db.user.delete({ where: { id } })
}
