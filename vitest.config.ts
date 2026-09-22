import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite-plus'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '.prisma-mongo/client': path.resolve(__dirname, './node_modules/.prisma-mongo/client'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-0-0-rc-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Automatically restore mocks between tests
    mockReset: true,
    // Automatically restore stubbed environment variables between tests
    unstubEnvs: true,
    // Load environment variables from .env files
    env: loadEnv('', process.cwd(), ''),
    exclude: ['.next/', 'node_modules/', '.api/', 'vitest.setup.ts', '**/*.d.ts', '**/*.config.*'],
    coverage: {
      exclude: [
        '.next/',
        'node_modules/',
        '.api/',
        'vitest.setup.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        '**/__tests__/**',
      ],
      include: ['src/components/Overlay/GiftAlert/GiftSubscriptionAlert.tsx'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
