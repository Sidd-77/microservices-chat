import axios from 'axios';
import {  User } from '../types/auth';
import { Chat } from '../types/chat';
import { DB_URL } from '../config/env';

export const searchUser = async (query:string): Promise<User[]> => {
    return axios.post(`${DB_URL}/api/users/search`, {query}).then((res) => res.data);
}

export const createChat = async (userId1: string, userId2: string): Promise<Chat> => {
    return axios.post(`${DB_URL}/api/chats/create`, {users:[userId1, userId2]}).then((res) => res.data);
}

export const getChats = async (userId: string): Promise<Chat[]> => {
    return axios.post(`${DB_URL}/api/chats`, {id:userId}).then((res) => res.data);
}