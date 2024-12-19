import { deleteUserAPI } from './api/api.mjs';
import { stopInterval } from './intervalManager.mjs';

const handle403Error = async (err, userId) => {
  if (err.response && err.response.statusCode === 403) {
    stopInterval();
    await deleteUserAPI(userId);
  }
};

export default handle403Error;
