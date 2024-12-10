import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000,
  maxRedirects: 10
});

export const addAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
