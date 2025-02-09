import { checkUserDb, createUserDb, deleteUserDb } from '../db/usersDB.mjs';

export const verifyOrCreateUser = async (req, res) => {
  try {
    const { userId, chatId } = req.body;
    const isExistsUser = await checkUserDb(userId);

    if (!isExistsUser) {
      await createUserDb(userId, chatId);
    }
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
