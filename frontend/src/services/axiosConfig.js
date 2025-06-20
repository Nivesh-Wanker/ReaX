import axios from 'axios';
const BASE_URL = 'http://localhost:4959';

export const RegisterUser = async (formData) => {
    return axios.post(`${BASE_URL}/register`, formData);
};

export const LoginUser = async (formData) => {
    return axios.post(`${BASE_URL}/login`, formData);
};

export const ChangeUserDetails = async (formData, token) => {
    ////need to change the below API after backend work
    console.log("Deprecated API, needs work from backend to integrate");
    return axios.put(`${BASE_URL}/user/changeUserDetails`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

