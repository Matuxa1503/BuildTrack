import axios from 'axios';

export const httpService = axios.create({
  baseURL: 'https://server-six-kohl.vercel.app',
});

export const getElemFromDbAPI = async (link) => {
  try {
    return await httpService.get(`/building/item?link=${link}`);
  } catch (err) {
    console.error('Error getElemFromDbAPI:', err.message);
  }
};
