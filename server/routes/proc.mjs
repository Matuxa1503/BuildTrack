import parser from '../parser/parser.mjs';
import addElemDb from '../utils/addElemDb.mjs';
import compareData from '../utils/compareData.mjs';
import getBuildingsDb from '../utils/getBuildingsDb.mjs';
import getUsersDb from '../utils/getUsersDb.mjs';

const processingData = async (req, res) => {
  try {
    const usersDb = await getUsersDb();
    const buildingsDb = await getBuildingsDb();
    const parsedData = await parser();

    const elemsArr = compareData(parsedData, buildingsDb.items); // compare parsedData and buildingsDb. Return new data if there are any
    if (elemsArr.length > 0) {
      await addElemDb(elemsArr, buildingsDb._id); // add new user in DB
    }

    res.status(200).json({ message: elemsArr, users: usersDb }); // return data in tg
  } catch (err) {
    console.error('Error in processingData:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default processingData;
