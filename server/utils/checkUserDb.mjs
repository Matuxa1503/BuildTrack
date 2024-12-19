import { Buildings } from '../models/Buildings.mjs';

const checkUserDb = async (userId) => {
  try {
    const isExists = await Buildings.findOne({ userId }); // Verify exists user in DB
    return isExists ? true : false;
  } catch (err) {
    console.error('Error getting user from Db:', err.message);
  }
};

export default checkUserDb;
