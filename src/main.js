import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "mapbox-gl/dist/mapbox-gl.css"
import './assets/tailwind.css'




createApp(App).use(store).use(router).mount('#app')
