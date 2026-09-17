import ultracite from 'ultracite/oxfmt'
import type { FormatConfig } from 'vite-plus/fmt'

const config: FormatConfig = {
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    '.agents/**',
    '.claude/**',
    '.cursor/**',
    '.impeccable/**',
    'supabase/.temp/**',
  ],
  jsxSingleQuote: true,
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

export default config
