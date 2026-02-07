import { defineConfig } from 'vite'
<<<<<<< HEAD
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
=======
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/swiftgigs-frontend/"
>>>>>>> 7f5efd89eb1cca90a120b5a19d92fc0dc1a584ba
})
