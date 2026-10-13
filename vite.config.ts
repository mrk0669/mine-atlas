import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the same build works on GitHub Pages (/mine-atlas/) and in the Android app.
  base: './',
})
