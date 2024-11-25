import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getDataFromGrBuildAPI = async () => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    return response;
  } catch (err) {
    console.error('Error getDataFromGrBuildAPI:', err.message);
  }
};

export const getLastElementAPI = async (userId) => {
  try {
    const response = await httpClient.get('/last', { params: { userId } });
    return response;
  } catch (err) {
    console.error('Error getLastElementAPI:', err.message);
  }
};

export const checkNewElAPI = async (userId) => {
  try {
    const response = await httpClient.get('/', { params: { userId } });
    return response;
  } catch (err) {
    console.error('Error checkNewElAPI:', err.message);
  }
};

export const checkUserAPI = async (userId) => {
  try {
    await httpClient.post('/addUser', { userId });
  } catch (err) {
    console.error('Error checkUserAPI:', err.message);
  }
};

export const getElemFromDbAPI = async (userId, itemLink) => {
  try {
    const response = await httpClient.post('/itemUser', { userId, itemLink }); // for security use POST instead GET
    return response;
  } catch (err) {
    console.error('Error getElemFromDbAPI:', err.message);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    await httpClient.delete('/deleteUser', { data: { userId } });
  } catch (err) {
    console.error('Error deleteUserAPI:', err.message);
  }
};
