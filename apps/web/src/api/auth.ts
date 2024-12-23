import axios from 'axios';
import { LoginData, SignupData, User } from '../types/auth';
import { AUTH_URL } from '../config/env';

export const login = async (data: LoginData): Promise<User> => {
  return axios.post(`${AUTH_URL}/api/auth/login`, data).then((res) => res.data);
};

export const signup = async (data: SignupData): Promise<User> => {
  return axios.post(`${AUTH_URL}/api/auth/register`, data).then((res) => res.data);
};