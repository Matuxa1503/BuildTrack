import axios from 'axios';

export const getDataFromGrBuildAPI = async () => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    return response;
  } catch (err) {
    console.error('Error getDataFromGrBuildAPI:', err.message);
  }
};
