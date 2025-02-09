import axios from 'axios';
import { config } from 'dotenv';
config();

export const httpService = axios.create({
  baseURL: process.env.SERVER_URL,
});

export const checkUserAPI = async (userId) => {
  try {
    await httpService.get('/user/check', { userId });
  } catch (err) {
    console.error('Error checkUserAPI:', err.message);
  }
};

export const addUserAPI = async (userId, chatId) => {
  try {
    await httpService.post('/user/add', { userId, chatId });
  } catch (err) {
    console.error('Error addUserAPI:', err.message);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    await httpService.delete('/user/delete', { data: { userId } });
  } catch (err) {
    console.error('Error deleteUserAPI:', err.message);
  }
};

export const getLastElementAPI = async () => {
  try {
    const response = await httpService.get('/building/last');
    return response;
  } catch (err) {
    console.error('Error getLastElementAPI:', err.message);
  }
};

export const checkNewElAPI = async () => {
  try {
    const response = await httpService.get('/building/proc');
    return response;
  } catch (err) {
    console.error('Error checkNewElAPI:', err.message);
  }
};
