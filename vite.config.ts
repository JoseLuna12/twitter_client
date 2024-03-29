import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['twitter.ico', 'twitter.png'],
    manifest: {
      name: 'Twitter Client pp',
      short_name: 'TwT pp',
      description: 'Twitter client for movies',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'twitter.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'twitter.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      cleanupOutdatedCaches: false
    }
  }
  )]
})
