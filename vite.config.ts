import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  legacy: {
    inconsistentCjsInterop: true,
  },
  plugins: lazyPlugins(() => [vinext(), cloudflare()]),
  resolve: {
    alias: {
      "@ant-design/cssinjs": "@ant-design/cssinjs/lib",
    },
  },
});
