import axios from 'axios';

export function getUser(userId) {
    return axios.get(`/api/users/${userId}`);
}

export function updateUser(userId, userData) {
    return axios.put(`/api/users/${userId}`, userData);
}

export async function fetchData() {
    const response = await fetch('../data.json');
    if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
    }
    const data = await response.json();
    return data;
}
