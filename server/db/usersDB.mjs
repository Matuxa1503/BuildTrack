import { Users } from '../models/Buildings.mjs';

export const checkUserDb = async (userId) => {
  try {
    const isExists = await Users.findOne({ userId }); // Verify exists user in DB
    return isExists ? true : false;
  } catch (err) {
    console.error('Error getting user from Db:', err.message);
  }
};

export const createUserDb = async (userId, chatId) => {
  try {
    const user = { userId, chatId };
    const building = new Users(user);
    await building.save();
    return true;
  } catch (err) {
    console.error('Error adding user in Db:', err.message);
  }
};

export const deleteUserDb = async (userId) => {
  try {
    const result = await Users.findOneAndDelete({ userId });
    if (!result) {
      throw new Error("User doesn't deleted");
    }
    return true;
  } catch (err) {
    console.error('Error delete user from DB:', err.message);
  }
};

export const getUsersDb = async () => {
  try {
    return await Users.find();
  } catch (err) {
    console.error('Error getting users getUsersDb:', err.message);
  }
};
