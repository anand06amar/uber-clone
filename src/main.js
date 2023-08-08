import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import '../src/assets/main.css';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import './assets/tailwind.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';


const firebaseConfig = {
  // Add your Firebase project configuration here
  apiKey: "AIzaSyBkEXJiZehelraKDd10ddgQXuPW0hnL6IU",
  authDomain: "uberclone-f48fc.firebaseapp.com",
  projectId: "uberclone-f48fc",
  storageBucket: "uberclone-f48fc.appspot.com",
  messagingSenderId: "906017353127",
  appId: "1:906017353127:web:37e923eeeb2463f62e9a82"
};

const createMyApp = async () => {
  const app = createApp(App);
  const pinia = createPinia();

  const firebaseApp = await initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  app.use(router).use(pinia);
  app.config.productionTip = false;
  app.config.globalProperties.$db = db;

  return app;
};

createMyApp().then(app => {
  app.mount('#app');
});