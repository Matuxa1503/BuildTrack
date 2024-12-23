import { Buildings } from '../models/Buildings.mjs';

const lastElemDb = async () => {
  try {
    return await Buildings.findOne({}, { items: { $slice: -1 } });
  } catch (err) {
    console.error('Error getting last element from Db:', err.message);
  }
};

export default lastElemDb;
