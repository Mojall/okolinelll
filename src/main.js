import { createApp } from 'vue';
import store from './store/store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router/router.js';

const app = createApp(App)

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD4DsbCBvHdzHj_pE1B6x-AE8G9VxeLO5c",
    authDomain: "hosting-7c244.firebaseapp.com",
    projectId: "hosting-7c244",
    storageBucket: "hosting-7c244.appspot.com",
    messagingSenderId: "947331217322",
    appId: "1:947331217322:web:837ca6a77b56ff933e1dd3",
    measurementId: "G-HESTG1H7TT"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
































