import express from 'express';
import cors from 'cors';
import httpClient from './utils/httpClient.mjs';
import filterAndWriteJson from './utils/filterAndWriteJson.mjs';
import { htmlParser } from '../src/services/parser/htmlParser.mjs';

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
    console.log(err);
    res.status(400).send('Not Found');
  }
};

app.get('/', processingData);

// app.get('/last-element', async (req, res) => {
//   try {
//     let lastElementData;
//     const getData = await readFile(path.join(__dirname, 'src', 'data.txt'));

//     lastElementData = getData ? JSON.parse(getData)[0] : '';
//     res.json({ message: lastElementData });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.listen(5000, () => console.log('Сервер работает'));
