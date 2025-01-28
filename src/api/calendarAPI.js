import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const {VITE_API_URL} = getEnvVariables();


export const calendarApi = axios.create({
  baseURL: VITE_API_URL
});


calendarApi.interceptors.request.use(config =>{
  config.headers = {
    ...config.headers,
    'x-tonken' : localStorage.getItem('token')
  }
  
  
  return config;
})

