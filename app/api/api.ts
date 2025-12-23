import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ message: string }>;

export const api = axios.create({
  baseURL: 'https://toolnext-group-project-backend.onrender.com',
  withCredentials: true,
});
