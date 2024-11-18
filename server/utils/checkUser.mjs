import { Buildings } from '../../models/Buildings.mjs';

const checkUser = async (userId) => {
  try {
    // Проверка существования юзера в БД
    const isExists = await Buildings.findOne({ userId });
    return isExists ? true : false;
  } catch (err) {
    console.error('Error adding user:', err.message);
  }
};

export default checkUser;
