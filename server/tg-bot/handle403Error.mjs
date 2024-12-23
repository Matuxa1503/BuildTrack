import { deleteUserAPI } from './api/api.mjs';

const handle403Error = async (err, userId) => {
  if (err.response && err.response.statusCode === 403) {
    await deleteUserAPI(userId);
  }
};

export default handle403Error;
