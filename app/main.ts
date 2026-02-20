import { createApp } from 'vue'
import App from './main.vue'
import router from '../router'
// css
import 'normalize.css'
import '../styles/tailwind.css'
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
