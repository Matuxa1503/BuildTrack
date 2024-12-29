import { getLastBuildingDb } from '../db/buildingsDB.mjs';

const getLastBuilding = async (req, res) => {
  try {
    const el = await getLastBuildingDb();
    res.status(200).json({ message: el });
  } catch (err) {
    console.error('Error in lastEl:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default getLastBuilding;
