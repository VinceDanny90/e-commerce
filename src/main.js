import { createApp } from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './routes'
import './style.css'
import App from './App.vue'
import "./assets/scss/global.scss"

createApp(App)
.use(createPinia().use(piniaPluginPersistedstate))
.use(router)
.mount('#app')
