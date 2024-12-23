import { Buildings } from '../models/Buildings.mjs';

const getBuildingsDb = async () => {
  try {
    return await Buildings.findOne();
  } catch (err) {
    console.error('Error getBuildingsDb:', err.message);
  }
};

export default getBuildingsDb;
