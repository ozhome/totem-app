import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-test.ozcandy.com.br',
});

export default api;
