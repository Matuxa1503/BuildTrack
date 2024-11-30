import lastElemDb from '../utils/lastElemDb.mjs';

const lastEl = async (req, res) => {
  try {
    const userIdTg = req.query.userId;
    const el = await lastElemDb(userIdTg);
    res.json({ message: el });
  } catch (err) {
    console.error('Error in lastEl:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default lastEl;
