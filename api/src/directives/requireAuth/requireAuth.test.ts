import { getDirectiveName, mockRedwoodDirective } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    const directiveName = getDirectiveName(requireAuth.schema)

    expect(requireAuth.schema).toBeTruthy()
    expect(directiveName).toBe('requireAuth')
  })

  it('has the correct directive definition', () => {
    const sdl = requireAuth.schema.loc?.source.body

    expect(sdl).toContain('directive @requireAuth(roles: [String]) on FIELD_DEFINITION')
  })

  it('allows execution when current user exists', () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@doe.com' }

    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: { currentUser: mockUser }
    })

    expect(mockExecution).not.toThrow()
  })
})
