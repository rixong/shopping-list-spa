import axios from 'axios';
import { config } from '../const';

const baseURL = config.url.API_URL

export const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("jwt"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);