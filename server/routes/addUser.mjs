import { checkUserDb, createUserDb } from '../utils/users.mjs';

const verifyOrCreateUser = async (req, res) => {
  try {
    const { userIdTg, chatIdTg } = req.body;
    const isExistsUser = await checkUserDb(userIdTg);

    if (!isExistsUser) {
      await createUserDb(userIdTg, chatIdTg);
    }
    res.status(200).send('successful');
  } catch (err) {
    console.error('Error in verifyOrCreateUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default verifyOrCreateUser;
