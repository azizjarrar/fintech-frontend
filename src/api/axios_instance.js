import axios from 'axios';

const axios_instance = axios.create({
  baseURL: 'https://madad-5b344c205b0f.herokuapp.com/',
});

axios_instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios_instance;
