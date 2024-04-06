import './assets/styles/main.sass';
import { computed, createApp } from 'vue';
import store from './store/store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Cookies from 'js-cookie';

import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';
import { refreshAxios } from './api/api.js';
import { refreshAccessToken } from './api/auth.js';


const app = createApp(App);

const jwtToken = Cookies.get('jwtToken');
const refreshTokenValue = Cookies.get('refreshToken');
if (jwtToken && refreshTokenValue) {
    refreshAxios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    store.commit('setLoggedIn', true);
}

axios.interceptors.request.use(
    async (config) => {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    async (error) => {
        if (error.response.status === 401) {
            const refreshTokenValue = Cookies.get('refreshToken');

            if (refreshTokenValue) {
                try {
                    const newToken = await refreshAccessToken(refreshTokenValue);
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return axios.request(error.config);
                } catch (error) {
                    logout();
                    return Promise.reject(error);
                }
            } else {
                logout();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const refreshTokenValue = Cookies.get('refreshToken');

            if (refreshTokenValue) {
                try {
                    const newToken = await refreshAccessToken(refreshTokenValue);
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    return axios.request(error.config);
                } catch (error) {
                }
            } else {
            }
        }

        return Promise.reject(error);
    },
);

const checkAuthentication = () => {
    router.beforeEach((to, from, next) => {
        to.meta.showNavBar = to.meta.showNavBar !== false;
        to.meta.showSideBar = to.meta.showSideBar !== false;

        if (to.meta.requiresAuth && !isLoggedIn.value) {
            next('/my-login');
        } else {
            next();
        }
    });
};

checkAuthentication();

const isLoggedIn = computed(() => store.state.isLoggedIn);

app.use(store).use(router).use(ElementPlus).mount('#app');

export { isLoggedIn };
