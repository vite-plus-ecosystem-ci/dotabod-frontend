import { defineConfig } from 'vite-plus'

import fmt from './oxfmt.config'

export default defineConfig({
  fmt,
  lint: {
    // The lint baseline checks Edge Functions with the separate Deno config.
    ignorePatterns: ['supabase/functions/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    options: { typeAware: true, typeCheck: true },
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
  },
  staged: {
    '*': 'vp check --fix',
  },
})
