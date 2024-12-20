import axios from 'axios';
import { ChatMessage } from '../types/chat';
const API_URL = typeof process !== 'undefined' && process.env.AUTH_URL ? process.env.AUTH_URL : 'http://localhost:5000';

export const getMessages = async (chatId: string): Promise<ChatMessage[]> => {
    return axios.post(`${API_URL}/messages`, {chatId}).then((res) => res.data);
}