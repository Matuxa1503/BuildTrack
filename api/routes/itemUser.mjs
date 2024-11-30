import docUserDb from '../utils/docUserDb.mjs';

const itemUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    const link = req.body.itemLink;
    const el = await docUserDb(userIdTg, link);
    res.json({ message: el });
  } catch (err) {
    console.error('Error in itemUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default itemUser;
