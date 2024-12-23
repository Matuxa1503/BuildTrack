import { Users } from '../models/Buildings.mjs';

const deleteUserDb = async (userId) => {
  try {
    const result = await Users.findOneAndDelete({ userId });
    if (!result) {
      throw new Error("User doesn't deleted");
    }
  } catch (err) {
    console.error('Error delete user from DB:', err.message);
  }
};

export default deleteUserDb;
