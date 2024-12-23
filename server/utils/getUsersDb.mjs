import { Users } from '../models/Buildings.mjs';

const getUsersDb = async () => {
  try {
    return await Users.find();
  } catch (err) {
    console.error('Error getting users getUsersDb:', err.message);
  }
};

export default getUsersDb;
