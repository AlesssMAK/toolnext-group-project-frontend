import { Owner, OwnerResponse, User, UserResponse } from '@/types/user';
import nextServer from './api';
import { UserToolsResponse, Category } from '@/types/tool';
import { feedbacksProps, feedbacksRequestProps } from '@/types/feedback';
import axios from 'axios';
import apiClient from './apiClient';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthResponse {
  user: User;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<AuthResponse>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
  const res = await nextServer.post<AuthResponse>('/auth/login', data);
  return res.data.user;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.post<CheckSessionRequest>('/auth/refresh');
    return true;
  } catch {
    return false;
  }
}

interface MeResponse {
  success: boolean;
  data: User;
}

export async function getMe(): Promise<User | null> {
  try {
    const res = await nextServer.get<MeResponse>('/users/me');
    return res.data.data;
  } catch {
    return null;
  }
}

export async function getUserToolsClient(
  userId: string,
  page = 1,
  perPage = 8
) {
  const { data } = await nextServer.get<UserToolsResponse>(
    `/users/${userId}/tools`,
    { params: { page, perPage } }
  );

  return data.data; // { tools, pagination }
}

export async function fetchFeedbacks({
  page,
  toolId,
  userId,
}: feedbacksRequestProps): Promise<feedbacksProps> {
  const { data } = await nextServer.get<feedbacksProps>('/feedbacks', {
    params: {
      page,
      perPage: 10,
      ...(toolId && { toolId }),
      ...(userId && { userId }),
    },
  });

  return data;
}

export type CreateFeedbackRequest = {
  name: string;
  description: string;
  rate: number;
  toolId: string;
};

export const createFeedback = async (data: CreateFeedbackRequest) => {
  const res = await nextServer.post('/feedbacks', data);
  return res.data;
};

export const updateMyAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const res = await nextServer.patch('/users/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

interface deleteToolRequest {
  toolId: string;
}

export interface DeleteToolResponse {
  status: 'success';
}

export async function deleteTool({ toolId }: deleteToolRequest) {
  const { data } = await nextServer.delete<DeleteToolResponse>(
    `/tools/${toolId}`
  );
  return data;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await nextServer.get('/categories');

  return res.data.data ?? [];
};

interface CreateBookingRequest {
  toolId: string;
  startDate: string;
  endDate: string;
}

export const createBooking = async (data: CreateBookingRequest) => {
  const res = await nextServer.post('/bookings', data);
  return res.data;
};

export const getClientUserById = async (id: string) => {
  const { data } = await apiClient.get(`/users/${id}`);
  return data.data;
};
