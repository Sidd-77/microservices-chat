import axios from 'axios';
import { ChatMessage } from '../types/chat';
import { DB_URL } from '../config/env';

export const getMessages = async (chatId: string): Promise<ChatMessage[]> => {
    return axios.post(`${DB_URL}/api/db/messages`, {chatId}).then((res) => res.data);
}