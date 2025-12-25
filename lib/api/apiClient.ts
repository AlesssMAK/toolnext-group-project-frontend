import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL + '/api';

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
