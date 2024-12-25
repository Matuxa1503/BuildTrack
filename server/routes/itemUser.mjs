import docUserDb from '../utils/docUserDb.mjs';

const itemUser = async (req, res) => {
  try {
    const link = req.query.itemLink;
    const el = await docUserDb(link);
    res.status(200).json({ message: el });
  } catch (err) {
    console.error('Error in itemUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default itemUser;
