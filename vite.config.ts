import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**.*{js,css,html,ico,png,svg,json,vue,txt,woff2}']
      },
      includeAssets: ['/favicon.svg'],
      manifest: {
        theme_color: "#2e3a65",
        background_color: "#ffff",
        display: "fullscreen",
        scope: "/",
        start_url: "/",
        name: "Tracka",
        short_name: "Tracka",
        description: "Avoid sapa with this budgeting application",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
})
