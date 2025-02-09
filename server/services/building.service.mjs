import axios from 'axios';

export const getDataFromGrBuild = async () => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    return response;
  } catch (err) {
    console.error('Error getDataFromGrBuild:', err.message);
  }
};
