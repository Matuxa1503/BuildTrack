import express from 'express';
import cors from 'cors';
import httpClient from './utils/httpClient.mjs';
import filterAndWriteJson from './utils/filterAndWriteJson.mjs';
import { htmlParser } from '../src/services/parser/htmlParser.mjs';
import getLastEl from './utils/getLastElement.mjs';

const app = express();
app.use(express.json());
app.use(cors());

const processingData = async (req, res) => {
  // const savedData = db.save(parsedData);

  try {
    // parsing
    const dataFromGrB = await httpClient.get('ru/construction/price_apartments/');
    const parsedData = htmlParser(dataFromGrB.data);

    // check JSON file
    const newEl = await filterAndWriteJson(parsedData);
    res.json({ message: newEl });
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

app.get('/', processingData);
app.get('/last', lastEl);

app.listen(5000, () => console.log('Сервер работает'));

// todo
// 1. Modularization
// 2. Save data to JSON
// 3. Replace JSON with DataBase(MongoDB, ODB use Moongoose)
