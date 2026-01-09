
import axios from "axios"
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const DB_URL = isDev ? "http://localhost:5000/api/v1" : import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
   baseURL: DB_URL,
   withCredentials: true,

   headers: {
      "Content-Type": "application/json",
   }
});

