import { deleteUser } from '../services/telegram.service';

const handle403Error = async (err, userId) => {
  if (err.response && err.response.statusCode === 403) {
    await deleteUser(userId);
  }
};

export default handle403Error;
