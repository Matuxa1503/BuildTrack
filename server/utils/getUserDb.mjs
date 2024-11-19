import { Buildings } from '../../models/Buildings.mjs';

const getUserDb = async (userId) => {
  try {
    return await Buildings.findOne({ userId });
  } catch (err) {
    console.error('Error getting user:', err.message);
  }
};

export default getUserDb;
