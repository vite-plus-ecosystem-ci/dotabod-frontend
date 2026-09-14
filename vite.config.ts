import { defineConfig } from 'vite-plus'

import fmt from './oxfmt.config'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt,
  lint: {
    // The lint baseline checks Edge Functions with the separate Deno config.
    ignorePatterns: ['supabase/functions/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
})
