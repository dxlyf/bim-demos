import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{

  },
  plugins: [svelte()],
})
