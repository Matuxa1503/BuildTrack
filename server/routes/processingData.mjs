import { addBuildingsDb, getBuildingsDb } from '../db/buildingsDB.mjs';
import { getUsersDb } from '../db/usersDB.mjs';
import compareData from '../parser/compareData.mjs';
import getDataForParsing from '../parser/dataForParsing.mjs';

const processNewBuildings = async (req, res) => {
  try {
    const usersDb = await getUsersDb();
    const buildingsDb = await getBuildingsDb();
    const parsedData = await getDataForParsing();
    const elemsArr = compareData(parsedData, buildingsDb.items); // compare parsedData and buildingsDb. Return new data if there are any

    if (elemsArr.length > 0) {
      await addBuildingsDb(elemsArr, buildingsDb._id); // add new buildings in DB
    }

    res.status(200).json({ message: elemsArr, users: usersDb }); // return data and users in tg
  } catch (err) {
    console.error('Error in processNewBuildingsData:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default processNewBuildings;
