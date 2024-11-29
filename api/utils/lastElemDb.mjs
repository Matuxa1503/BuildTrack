import { Buildings } from '../../models/Buildings.mjs';

const lastElemDb = async (userId) => {
  try {
    return await Buildings.findOne({ userId }, { items: { $slice: -1 } });
  } catch (err) {
    console.error('Error getting last element from Db:', err.message);
  }
};

export default lastElemDb;
