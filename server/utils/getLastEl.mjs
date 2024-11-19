import { Buildings } from '../../models/Buildings.mjs';

const getLastEl = async (userId) => {
  try {
    return await Buildings.findOne({ userId }, { items: { $slice: -1 } });
  } catch (err) {
    console.error('Error getting last element:', err.message);
  }
};

export default getLastEl;
