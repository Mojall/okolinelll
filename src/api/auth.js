import axios from 'axios';
import { ElNotification } from 'element-plus';
import { refreshAxios } from './api.js';
import { reactive } from 'vue';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const refreshAccessToken = async (refreshToken) => {
    try {
        if (!refreshToken) {
            throw new Error('Invalid refresh token');
        }
        const response = await refreshAxios.post('/auth/refresh', {
            refreshToken: refreshToken,
        });

        if (response.data && response.data.token && response.data.refreshToken) {
            const jwtToken = response.data.token;
            const newRefreshToken = response.data.refreshToken;

            setTokens(jwtToken, newRefreshToken);

            return jwtToken;
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Failed to refresh access token');
    }
};

const loginForm = async () => {
    try {
        const loginData = {
            login: form.login,
            password: form.password,
        };
        const response = await refreshAxios.post(
            '/auth/login',
            loginData,
        );

        const jwtToken = response.data.token;
        const refreshToken = response.data.refreshToken;

        setTokens(jwtToken, refreshToken);

        ElNotification({
            title: 'Успех',
            message: 'Вход выполнен успешно',
            type: 'success',
        });

        return true;
    } catch (error) {
        const errorMessage = error.response.data.title;
        ElNotification({
            title: 'Ошибка',
            message: errorMessage,
            type: 'error',
        });

        throw error;
    }
};

const form = reactive({
    login: '',
    password: '',
});

const resetForm = () => {
    form.login = '';
    form.password = '';
};

const setTokens = (jwtToken, refreshToken) => {
    const decodedToken = jwtDecode(jwtToken);
    const expirationTime = new Date(decodedToken.exp * 1000);

    Cookies.set('jwtToken', jwtToken, { expires: expirationTime });
    Cookies.set('refreshToken', refreshToken, {
        secure: true,
        sameSite: 'strict',
    });
};

refreshAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');
                const response = await refreshAxios.post('/auth/refresh', { refreshToken });
                const newToken = response.data.token;
                setTokens(newToken, refreshToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axios(originalRequest);
            } catch (error) {
                throw error;
            }
        }
        return Promise.reject(error);
    },
);

export { resetForm, loginForm, refreshAccessToken, form, setTokens };
