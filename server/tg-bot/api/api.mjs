import axios from 'axios';

export const httpService = axios.create({
  baseURL: 'https://server-eight-sepia.vercel.app',
});

export const checkUserAPI = async (userId) => {
  try {
    await httpService.post('/addUser', { userId });
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

export const getLastElementAPI = async (userId) => {
  try {
    const response = await httpService.get('/last', { params: { userId } });
    return response;
  } catch (err) {
    console.error('Error getLastElementAPI:', err.message);
  }
};

export const checkNewElAPI = async (userId) => {
  try {
    const response = await httpService.get('/proc', { params: { userId } });
    return response;
  } catch (err) {
    console.error('Error checkNewElAPI:', err.message);
  }
};
