import express from 'express';
import cors from 'cors';
import httpClient from './utils/httpClient.mjs';
import filterAndWriteJson from './utils/filterAndWriteJson.mjs';
import { htmlParser } from '../src/services/parser/htmlParser.mjs';
import getLastEl from './utils/getLastElement.mjs';
import checkUser from './utils/checkUser.mjs';
import mongoose from 'mongoose';
import createUser from './utils/createUser.mjs';

const app = express();
app.use(express.json());
app.use(cors());

const URL = 'mongodb://localhost:27017/BuildingsData';
mongoose
  .connect(URL)
  .then(console.log('Connect to MongoDB'))
  .catch((err) => console.log(err));

const processingData = async (req, res) => {
  // const savedData = db.save(parsedData);

  try {
    // parsing
    const dataFromGrB = await httpClient.get('ru/construction/price_apartments/');
    const parsedData = htmlParser(dataFromGrB.data);

    // check user in DB

    // check JSON file
    // const newEl = await filterAndWriteJson(parsedData);
    // res.json({ message: newEl });
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Not Found');
  }
};

const lastEl = async (req, res) => {
  try {
    const el = await getLastEl();
    res.json({ message: el });
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Not Found');
  }
};

const verifyOrCreateUser = async (req, res) => {
  const userId = req.body.userId;

  try {
    const isExistsUser = await checkUser(userId);
    if (!isExistsUser) {
      const dataFromGrB = await httpClient.get('ru/construction/price_apartments/');
      const parsedData = htmlParser(dataFromGrB.data);
      createUser(parsedData, userId);
    }
  } catch (err) {
    console.error('Error verify user:', err.message);
    res.status(404).send('Not Found');
  }
};

app.get('/', processingData);
app.get('/last', lastEl);
app.post('/addUser', verifyOrCreateUser);

app.listen(5000, () => console.log('Сервер работает'));

// todo
// 1. Modularization
// 2. Save data to JSON
// 3. Replace JSON with DataBase(MongoDB, ODB use Moongoose)
