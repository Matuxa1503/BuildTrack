import axios from 'axios';
import { config } from 'dotenv';
config();

export const httpService = axios.create({
  baseURL: process.env.SERVER_URL,
});

export const checkUser = async (userId) => {
  try {
    await httpService.get('/user/check', { userId });
  } catch (err) {
    console.error('Error checkUser:', err.message);
  }
};

export const addUser = async (userId, chatId) => {
  try {
    await httpService.post('/user/add', { userId, chatId });
  } catch (err) {
    console.error('Error addUser:', err.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    await httpService.delete('/user/delete', { data: { userId } });
  } catch (err) {
    console.error('Error deleteUser:', err.message);
  }
};

export const getLastEl = async () => {
  try {
    const response = await httpService.get('/building/last');
    return response;
  } catch (err) {
    console.error('Error getLastEl:', err.message);
  }
};

export const checkNewEl = async () => {
  try {
    const response = await httpService.get('/building/proc');
    return response;
  } catch (err) {
    console.error('Error checkNewEl:', err.message);
  }
};
