import axios from 'axios';
import {url} from './index';

const api = axios.create({
  baseURL: url,
});

export default api;
