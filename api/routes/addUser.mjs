import parser from '../../src/services/parser/parser.mjs';
import checkUserDb from '../utils/checkUserDb.mjs';
import createUserDb from '../utils/createUserDb.mjs';

const verifyOrCreateUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    const isExistsUser = await checkUserDb(userIdTg);
    if (!isExistsUser) {
      const parsedData = await parser();
      createUserDb(parsedData, userIdTg);
    }
  } catch (err) {
    console.error('Error in verifyOrCreateUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default verifyOrCreateUser;
