import { cloudflare } from '@cloudflare/vite-plugin'
import vinext from 'vinext'
import { defineConfig, lazyPlugins } from 'vite-plus'

import oxfmtConfig from './oxfmt.config.ts'

export default defineConfig({
  fmt: oxfmtConfig,
  legacy: {
    inconsistentCjsInterop: true,
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    options: { typeAware: true, typeCheck: true },
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
  },
  plugins: lazyPlugins(() => [vinext(), cloudflare()]),
  resolve: {
    alias: {
      '@ant-design/cssinjs': '@ant-design/cssinjs/lib',
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
})
