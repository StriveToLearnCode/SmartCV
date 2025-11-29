import { createApp } from 'vue'
import App from './main.vue'
import router from './router'
// css
import 'normalize.css'
import './styles/tailwind.css'

createApp(App).use(router).mount('#app')
