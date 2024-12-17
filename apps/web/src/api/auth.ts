import axios from 'axios';
import { LoginData, SignupData, User } from '../types/auth';

const API_URL = typeof process !== 'undefined' && process.env.AUTH_URL ? process.env.AUTH_URL : 'http://localhost:4000';

export const login = async (data: LoginData): Promise<User> => {
  return axios.post(`${API_URL}/auth/login`, data).then((res) => res.data);
};

export const signup = async (data: SignupData): Promise<User> => {
  return axios.post(`${API_URL}/auth/register`, data).then((res) => res.data);
};