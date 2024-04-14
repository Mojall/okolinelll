import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL_LINK;

const refreshAxios = axios.create({
    baseURL: baseURL,
});


const fetchData = async () => {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
    }
    const data = await response.json();
    return data;
};

export { refreshAxios, fetchData };

