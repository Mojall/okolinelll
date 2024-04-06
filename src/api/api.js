import axios from 'axios';

const refreshAxios = axios.create({
    baseURL: 'https://api.okoline.ru',
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
