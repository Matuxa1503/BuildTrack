import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://www.ghb.by/',
});

export default httpClient;
