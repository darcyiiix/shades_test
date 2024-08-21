import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'https://shades-test-4.onrender.com',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
});