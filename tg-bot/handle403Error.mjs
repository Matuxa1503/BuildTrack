import { deleteUserAPI } from '../src/api/api.mjs';
import { stopInterval } from './intervalManager.mjs';

const handle403Error = (err, userId) => {
  if (err.response && err.response.statusCode === 403) {
    stopInterval();
    deleteUserAPI(userId);
  }
};

export default handle403Error;
