import axios from 'axios';

export function getUser(userId) {
    return axios.get(`/api/users/${userId}`);
}

export function updateUser(userId, userData) {
    return axios.put(`/api/users/${userId}`, userData);
}
