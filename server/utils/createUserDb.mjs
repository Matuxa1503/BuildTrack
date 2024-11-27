import { Buildings } from '../../models/Buildings.mjs';

const createUserDb = async (parsedData, userId) => {
  try {
    const user = { userId, items: parsedData };
    const building = new Buildings(user);
    await building.save();
  } catch (err) {
    console.error('Error adding user in Db:', err.message);
  }
};

export default createUserDb;
