import { getDirectiveName } from '@redwoodjs/testing/api'

import skipAuth from './skipAuth'

describe('skipAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    const directiveName = getDirectiveName(skipAuth.schema)

    expect(skipAuth.schema).toBeTruthy()
    expect(directiveName).toBe('skipAuth')
  })

  it('has the correct directive definition', () => {
    const sdl = skipAuth.schema.loc?.source.body

    expect(sdl).toContain('directive @skipAuth on FIELD_DEFINITION')
  })
})
