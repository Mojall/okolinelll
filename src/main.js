import './assets/styles/main.sass'
import { createApp } from 'vue';
import store from './store/store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router/router.js';

const app = createApp(App)
router.beforeEach((to, from, next) => {
    to.meta.showNavBar = to.meta.showNavBar !== false;
    to.meta.showSideBar = to.meta.showSideBar !== false;

    next();
});

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')

import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
































