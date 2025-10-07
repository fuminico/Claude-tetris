import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginCsp from 'vite-plugin-csp'

const isVercel = !!process.env.VERCEL

export default defineConfig({
  plugins: [
    react(),
    vitePluginCsp(),
  ],
  base: isVercel ? '/' : '/Claude-tetris/',
})
