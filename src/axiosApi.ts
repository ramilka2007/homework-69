import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://api.tvmaze.com/',
});

export default axiosApi;
