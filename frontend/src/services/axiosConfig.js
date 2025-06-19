import axios from 'axios';

const BASE_URL = 'http://localhost:4959';

export const RegisterUser = async (formData) => {
    return axios.post(`${BASE_URL}/add_admin`, formData);
};

export const LoginUser = async (credentials) => {
    return axios.post(`${BASE_URL}/login`, credentials);
};

