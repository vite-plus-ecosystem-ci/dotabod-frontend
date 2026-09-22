import { defineConfig } from 'vite-plus'

export default defineConfig({
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-0-0-rc-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
  },
  fmt: {
    // supabase/functions are Deno (npm: imports, Deno globals) — not part of the Next app.
    ignorePatterns: ['supabase/**'],
    jsxSingleQuote: true,
    printWidth: 100,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    useTabs: false,
  },
  lint: {
    ignorePatterns: ['supabase/**'],
    categories: {
      correctness: 'error',
    },
    env: {
      builtin: true,
      browser: true,
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    options: {
      maxWarnings: 2,
      typeAware: true,
      typeCheck: true,
      respectEslintDisableDirectives: true,
      reportUnusedDisableDirectives: 'error',
    },
    plugins: ['typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'react-perf', 'nextjs'],
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
      'jsx-a11y/prefer-tag-over-role': 'off',
      'nextjs/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      // These React Compiler rules reject established project patterns. Keep the
      // existing compiler as the source of truth for these cases in smoke CI.
      'react/immutability': 'off',
      'react/purity': 'off',
      'react/refs': 'off',
      'react/set-state-in-effect': 'off',
      'react/static-components': 'off',
      'typescript/no-explicit-any': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    overrides: [
      {
        files: ['src/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
        rules: {
          'typescript/unbound-method': 'off',
          'typescript/no-floating-promises': 'off',
          'typescript/no-base-to-string': 'off',
          'typescript/restrict-template-expressions': 'off',
          'typescript/no-misused-spread': 'off',
          'typescript/no-explicit-any': 'off',
        },
      },
      {
        files: ['scripts/**'],
        rules: {
          'typescript/no-floating-promises': 'off',
          'typescript/restrict-template-expressions': 'off',
          'typescript/no-base-to-string': 'off',
        },
      },
    ],
  },
})
