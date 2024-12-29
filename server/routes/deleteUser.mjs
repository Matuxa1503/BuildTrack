import { deleteUserDb } from '../db/usersDB.mjs';

const deleteUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    await deleteUserDb(userIdTg);
    res.status(200).send('successful');
  } catch (err) {
    console.error('Error in deleteUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default deleteUser;
