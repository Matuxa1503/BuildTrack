import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://www.ghb.by/',
});

export const getElemFromDbAPI = async (userId, itemLink) => {
  try {
    const response = await axios.post('http://localhost:5000/itemUser', { userId, itemLink }); // for security use POST instead GET
    return response;
  } catch (err) {
    console.log(err);
  }
};
