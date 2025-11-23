import { createApp } from 'vue'
import App from './app/main.vue'
import router from './app/router'
// css
import 'normalize.css'
import './app/styles/tailwind.css'

createApp(App).use(router).mount('#app')
