import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL_LINK;

const refreshAxios = axios.create({
    baseURL: baseURL,
});


export { refreshAxios };

