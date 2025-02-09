import express from 'express';
import cors from 'cors';
import mongoConnect from './db/mongoConnect.mjs';
import { start } from './tg-bot/tgBot.mjs';
import routers from './routers/index.mjs';

const app = express();
app.use(express.json());
app.use(cors());
mongoConnect();

app.get('/', (req, res) => {
  res.status(200).send('Hello from Express after deploy!');
});

app.use('/', routers);

app.listen(5000, () => {
  console.log('Сервер работает');
  start();
});

export default app;
