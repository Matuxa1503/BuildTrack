import express from 'express';
import cors from 'cors';
import lastEl from './routes/last.mjs';
import verifyOrCreateUser from './routes/addUser.mjs';
import itemUser from './routes/itemUser.mjs';
import deleteUser from './routes/deleteUser.mjs';
import processingData from './routes/proc.mjs';
import mongoConnect from './utils/mongoConnect.mjs';
import { start } from './tg-bot/tgBot.mjs';
import getWebhookTg from './routes/getWebhookTg.mjs';
import cron from './routes/cron.mjs';

const app = express();
app.use(express.json());
app.use(cors());
mongoConnect();

app.get('/', (req, res) => {
  res.status(200).send('Hello from Express!');
});

app.get('/proc', processingData);
app.get('/last', lastEl);
app.get('/cron', cron);
app.post('/webhook', getWebhookTg);
app.post('/addUser', verifyOrCreateUser);
app.get('/itemUser', itemUser);
app.delete('/deleteUser', deleteUser);

app.listen(5000, () => {
  console.log('Сервер работает');
  start();
});

export default app;
