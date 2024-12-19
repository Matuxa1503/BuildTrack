import parser from '../parser/parser.mjs';
import addElemDb from '../utils/addElemDb.mjs';
import compareData from '../utils/compareData.mjs';
import getUserDb from '../utils/getUserDb.mjs';

const processingData = async (req, res) => {
  try {
    const userIdTg = req.query.userId;
    const userDataDb = await getUserDb(userIdTg);
    const parsedData = await parser();
    const elemsArr = compareData(parsedData, userDataDb.items); // compare parsedData and userDataDb. Return new data if there are any
    if (elemsArr.length > 0) {
      await addElemDb(elemsArr, userDataDb._id); // add new user in DB
    }
    res.status(200).json({ message: elemsArr }); // return data in tg
  } catch (err) {
    console.error('Error in processingData:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default processingData;
