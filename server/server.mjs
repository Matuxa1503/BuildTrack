import express from 'express';
import cors from 'cors';
import httpClient from './utils/httpClient.mjs';
import { htmlParser } from '../src/services/parser/htmlParser.mjs';
import getLastEl from './utils/getLastElement.mjs';
import checkUser from './utils/checkUser.mjs';
import mongoose from 'mongoose';
import createUser from './utils/createUser.mjs';
import getUserDb from './utils/getUserDb.mjs';
import compareData from './utils/compareData.mjs';
import addElemDb from './utils/addElemDb.mjs';

const app = express();
app.use(express.json());
app.use(cors());

const URL = 'mongodb://localhost:27017/BuildingsData';
mongoose
  .connect(URL)
  .then(console.log('Connect to MongoDB'))
  .catch((err) => console.log(err));

const processingData = async (req, res) => {
  try {
    const userIdTg = req.query.userId;
    const userDataDb = await getUserDb(userIdTg);

    // parsing
    const dataFromGrB = await httpClient.get('ru/construction/price_apartments/');
    const parsedData = htmlParser(dataFromGrB.data);

    // сравнение данных из БД, распарсенные данные. Возвр нового элемента если он есть
    const elemsArr = compareData(parsedData, userDataDb.items);

    // добавление нового элемента юзеру в БД и возврат его в тг бот
    if (elemsArr.length > 0) {
      addElemDb(elemsArr, userDataDb._id);
    }

    res.json({ message: elemsArr });
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
  try {
    const userIdTg = req.body.userId;
    const isExistsUser = await checkUser(userIdTg);
    if (!isExistsUser) {
      const dataFromGrB = await httpClient.get('ru/construction/price_apartments/');
      const parsedData = htmlParser(dataFromGrB.data);
      createUser(parsedData, userIdTg);
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
