import axios from 'axios';

// export const httpClient = axios.create({
// });

export const getElemFromDbAPI = async (userId, itemLink) => {
  try {
    const response = await axios.post('http://localhost:5000/itemUser', { userId, itemLink }); // for security use POST instead GET
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getDataFromGrBuildAPI = async () => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
