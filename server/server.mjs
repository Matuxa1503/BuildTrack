import express from 'express';
import cors from 'cors';
import lastElemDb from './utils/lastElemDb.mjs';
import createUserDb from './utils/createUserDb.mjs';
import getUserDb from './utils/getUserDb.mjs';
import compareData from './utils/compareData.mjs';
import addElemDb from './utils/addElemDb.mjs';
import deleteUserDb from './utils/deleteUserDb.mjs';
import connectDb from './utils/connectDB.mjs';
import parser from '../src/services/parser/parser.mjs';
import checkUserDb from './utils/checkUserDb.mjs';
import docUserDb from './utils/docUserDb.mjs';

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

const verifyOrCreateUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    const isExistsUser = await checkUserDb(userIdTg);
    if (!isExistsUser) {
      const parsedData = await parser();
      createUserDb(parsedData, userIdTg);
    }
  } catch (err) {
    console.error('Error in verifyOrCreateUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdTg = req.body.userId;
    await deleteUserDb(userIdTg);
  } catch (err) {
    console.error('Error in deleteUser:', err.message);
    res.status(400).send('An error occurred');
  }
};

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

app.get('/', processingData);
app.get('/last', lastEl);
app.post('/addUser', verifyOrCreateUser);
app.post('/itemUser', itemUser);
app.delete('/deleteUser', deleteUser);

app.listen(5000, () => console.log('Сервер работает'));
