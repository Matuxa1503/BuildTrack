import axios from 'axios';

export const httpService = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getElemFromDbAPI = async (userId, itemLink) => {
  try {
    const response = await httpService.post('/itemUser', { userId, itemLink }); // for security use POST instead GET
    return response;
  } catch (err) {
    console.error('Error getElemFromDbAPI:', err.message);
  }
};
