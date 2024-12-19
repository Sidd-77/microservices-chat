import axios from 'axios';
import {  User } from '../types/auth';
import { Chat } from '../types/chat';
const API_URL = typeof process !== 'undefined' && process.env.AUTH_URL ? process.env.AUTH_URL : 'http://localhost:5000';

export const searchUser = async (query:string): Promise<User[]> => {
    return axios.post(`${API_URL}/users/search`, {query}).then((res) => res.data);
}

export const createChat = async (userId1: string, userId2: string): Promise<Chat> => {
    return axios.post(`${API_URL}/chats/create`, {users:[userId1, userId2]}).then((res) => res.data);
}

export const getChats = async (userId: string): Promise<Chat[]> => {
    return axios.post(`${API_URL}/chats`, {id:userId}).then((res) => res.data);
}