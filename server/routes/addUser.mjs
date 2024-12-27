import { checkUserDb, createUserDb } from '../utils/users.mjs';

const verifyOrCreateUser = async (req, res) => {
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

export default verifyOrCreateUser;
