import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginCsp from 'vite-plugin-csp'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginCsp(),
  ],
  base: '/Claude-tetris/',
})