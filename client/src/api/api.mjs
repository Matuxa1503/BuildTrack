import axios from 'axios';

export const httpService = axios.create({
  baseURL: 'https://server-kappa-steel.vercel.app',
});

export const getElemFromDbAPI = async (itemLink) => {
  try {
    const response = await httpService.post('/itemUser', { itemLink }); // for security use POST instead GET
    return response;
  } catch (err) {
    console.error('Error getElemFromDbAPI:', err.message);
  }
};
