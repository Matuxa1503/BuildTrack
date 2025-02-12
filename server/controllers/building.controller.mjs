import { addBuildingsDb, getBuildingsDb, getLastBuildingDb, getBuildingDb } from '../db/buildingsDB.mjs';
import { getUsersDb } from '../db/usersDB.mjs';
import compareData from '../parser/compareData.mjs';
import getDataForParsing from '../parser/dataForParsing.mjs';

export const processNewBuildings = async (req, res) => {
  try {
    const usersDb = await getUsersDb();
    const buildingsDb = await getBuildingsDb();
    const parsedData = await getDataForParsing();

    // compare parsedData and buildingsDb. Return new data if there are any
    const elemsArr = compareData(parsedData, buildingsDb.items);

    // add new buildings in DB
    if (elemsArr.length > 0) {
      await addBuildingsDb(elemsArr, buildingsDb._id);
    }

    // return data and users in tg
    res.status(200).json({ message: elemsArr, users: usersDb });
  } catch (err) {
    console.error('Error in processNewBuildings:', err.message);
    res.status(400).send('An error occurred');
  }
};

export const getBuildingByLink = async (req, res) => {
  try {
    const { link } = req.query;
    const el = await getBuildingDb(link);
    res.status(200).json({ message: el });
  } catch (err) {
    console.error('Error in getBuildingByLink:', err.message);
    res.status(400).send('An error occurred');
  }
};

export const getLastBuilding = async (req, res) => {
  try {
    const el = await getLastBuildingDb();
    res.status(200).json({ message: el });
  } catch (err) {
    console.error('Error in lastEl:', err.message);
    res.status(400).send('An error occurred');
  }
};
