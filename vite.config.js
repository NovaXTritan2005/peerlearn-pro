import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Change base if your repo name is different
export default defineConfig({
  base: '/peerlearn-pro/',
  plugins: [react()],
})
