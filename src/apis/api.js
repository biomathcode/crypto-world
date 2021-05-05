import axios from "axios";

const baseURL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
})

export default axiosInstance

