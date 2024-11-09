import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js"
import store from "./js/store.js";


const app = createApp(App).use(router).use(store).mount('#app')

// const app = new Vue({router}).$mount('#app')
