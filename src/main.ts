import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { inject } from '@vercel/analytics'

inject()
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)

app.mount('#app')
