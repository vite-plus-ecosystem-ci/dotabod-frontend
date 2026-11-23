import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

vi.mock(import('@/pages/api/get-moderated-channels'), () => {
  throw new Error('Auth must not initialize the moderated-channels API route')
})

describe('auth configuration', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXTAUTH_SECRET', 'test-nextauth-secret')
    vi.stubEnv('TWITCH_CLIENT_ID', 'test-twitch-client-id')
    vi.stubEnv('TWITCH_CLIENT_SECRET', 'test-twitch-client-secret')
  })

  it('initializes without loading API routes that depend on auth', async () => {
    const { authOptions } = await import('@/lib/auth')

    expect(authOptions.providers).toHaveLength(2)
  })
})
