import checkUserDb from '../utils/checkUserDb.mjs';
import createUserDb from '../utils/createUserDb.mjs';

const verifyOrCreateUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    const chatIdTg = req.body.chatId;
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
