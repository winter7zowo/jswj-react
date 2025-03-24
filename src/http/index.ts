import axios from 'axios';
import requestInterceptor from './requestInterceptor';
import responseInterceptor from './responseInterceptor';

const http = axios.create({
  baseURL: 'http://localhost:8080',
});
requestInterceptor(http);
responseInterceptor(http);

export default http;