import antiSlop from 'ultracite/oxlint/anti-slop'
import core from 'ultracite/oxlint/core'
import { jsPluginSettings, selectJsPlugins } from 'ultracite/oxlint/js-plugins'
import next from 'ultracite/oxlint/next'
import nextJsPlugins from 'ultracite/oxlint/next/js-plugins'
import react from 'ultracite/oxlint/react'
import vitest from 'ultracite/oxlint/vitest'
import type { OxlintConfig } from 'vite-plus/lint'

// eslint-plugin-github currently pulls typescript-eslint, whose parser crashes
// under TypeScript 7. Keep SonarJS and React Doctor active until that stack is
// TS7-compatible again.
const jsPlugins = selectJsPlugins(['sonarjs', 'react-doctor'])

const config: OxlintConfig = {
  extends: [core, react, next, vitest, antiSlop, jsPlugins, nextJsPlugins],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    '.agents/**',
    '.claude/**',
    '.cursor/**',
    '.impeccable/**',
    'supabase/.temp/**',
  ],
  jsPlugins: jsPlugins.jsPlugins ?? [],
  options: {
    reportUnusedDisableDirectives: 'error',
    respectEslintDisableDirectives: true,
    typeAware: true,
    typeCheck: true,
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'typescript/no-explicit-any': 'error',
  },
  settings: jsPluginSettings,
}

export default config
