import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        restaurants: resolve(__dirname, 'restaurants.html'),
        unsubscribe: resolve(__dirname, 'unsubscribe.html'),
        onboarding: resolve(__dirname, 'onboarding.html')
      }
    }
  }
})
