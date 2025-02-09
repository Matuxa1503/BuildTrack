import { checkUserDb, createUserDb, deleteUserDb } from '../db/usersDB.mjs';

export const verifyUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const isExistsUser = await checkUserDb(userId);
    res.status(200).json({ message: isExistsUser });
  } catch (err) {
    console.error('Error in verifyUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export const createUser = async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    await createUserDb(userId, chatId);
    res.status(200).send('successful');
  } catch (err) {
    console.error('Error in verifyOrCreateUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    await deleteUserDb(userIdTg);
    res.status(200).send('successful');
  } catch (err) {
    console.error('Error in deleteUser:', err.message);
    res.status(400).send('An error occurred');
  }
};
