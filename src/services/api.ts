import axios from 'axios';
import {url, version} from './index';

const api = axios.create({
  baseURL: url,
});

api.defaults.headers['x-version-tablet'] = version;

export default api;
