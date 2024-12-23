import { Users } from '../models/Buildings.mjs';

const createUserDb = async (userId, chatId) => {
  try {
    const user = { userId, chatId };
    const building = new Users(user);
    await building.save();
  } catch (err) {
    console.error('Error adding user in Db:', err.message);
  }
};

export default createUserDb;
