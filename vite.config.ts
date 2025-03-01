import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vueDevTools from 'vite-plugin-vue-devtools';

import AutoImport from 'unplugin-auto-import/vite';

import Components from 'unplugin-vue-components/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'],
      dts: './src/types/auto-imports.d.ts',
      dirs: ['./src/composables', './src/views'],
    }),
    Components({
      dts: './src/types/components.d.ts',
      dirs: ['./src/components'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
