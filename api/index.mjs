import express from 'express';
import cors from 'cors';
import getUserDb from './utils/getUserDb.mjs';
import compareData from './utils/compareData.mjs';
import addElemDb from './utils/addElemDb.mjs';
import connectDb from './utils/connectDB.mjs';
import parser from '../src/services/parser/parser.mjs';
import lastEl from './routes/last.mjs';
import verifyOrCreateUser from './routes/addUser.mjs';
import itemUser from './routes/itemUser.mjs';
import deleteUser from './routes/deleteUser.mjs';

const app = express();
app.use(express.json());
app.use(cors());
connectDb();

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

app.get('/', processingData);
app.get('/last', lastEl);
app.post('/addUser', verifyOrCreateUser);
app.post('/itemUser', itemUser);
app.delete('/deleteUser', deleteUser);

app.listen(5000, () => console.log('Сервер работает'));
