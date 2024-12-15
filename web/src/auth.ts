import { createAuth, createDbAuthClient } from '@redwoodjs/auth-dbauth-web'

const dbAuthClient = createDbAuthClient({ fetchConfig: { credentials: 'include' } })

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
