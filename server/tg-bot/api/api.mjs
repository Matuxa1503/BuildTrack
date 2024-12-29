import axios from 'axios';
import { config } from 'dotenv';
config();

export const httpService = axios.create({
  baseURL: process.env.SERVER_URL,
});

export const checkUserAPI = async (userId, chatId) => {
  try {
    await httpService.post('/addUser', { userId, chatId });
  } catch (err) {
    console.error('Error checkUserAPI:', err.message);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    await httpService.delete('/deleteUser', { data: { userId } });
  } catch (err) {
    console.error('Error deleteUserAPI:', err.message);
  }
};

export const getLastElementAPI = async () => {
  try {
    const response = await httpService.get('/last');
    return response;
  } catch (err) {
    console.error('Error getLastElementAPI:', err.message);
  }
};

export const checkNewElAPI = async () => {
  try {
    const response = await httpService.get('/proc');
    return response;
  } catch (err) {
    console.error('Error checkNewElAPI:', err.message);
  }
};
