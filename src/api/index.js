import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export default axiosInstance;
