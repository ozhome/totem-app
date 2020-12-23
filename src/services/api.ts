import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-home.ozcandy.com.br',
});

export default api;
