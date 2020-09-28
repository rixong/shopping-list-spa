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
  
  // Automatically sets the authorization header because
  // of the request interceptor
  // const res = await axios.get('https://httpbin.org/get');
        // axios.interceptors.request.use(req => {
        //   // `req` is the Axios request config, so you can modify
        //   // the `headers`.
        //   req.headers.authorization = `Bearer ${jwt};`
        //   return req;
        // });