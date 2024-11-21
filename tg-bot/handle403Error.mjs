import deleteUser from './deleteUser.mjs';
import { stopInterval } from './intervalManager.mjs';

const handle403Error = (err, userId) => {
  if (err.response && err.response.statusCode === 403) {
    stopInterval();
    deleteUser(userId);
  }
};

export default handle403Error;
