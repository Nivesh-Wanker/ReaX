import axios from 'axios';

const BASE_URL = 'http://localhost:4959';

export const RegisterUser = async (formData) => {
    return axios.post(`${BASE_URL}/register`, formData);
};

export const LoginUser = async (formData) => {
    return axios.post(`${BASE_URL}/login`, formData);
};

