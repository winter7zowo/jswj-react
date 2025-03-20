import axios from 'axios';

export const SERVER_URL: string = 'http://localhost:8080';

export const api = axios.create({
    baseURL: SERVER_URL,
});