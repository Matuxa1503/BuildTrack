import deleteUserDb from '../utils/deleteUserDb.mjs';

const deleteUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    await deleteUserDb(userIdTg);
  } catch (err) {
    console.error('Error in deleteUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default deleteUser;
