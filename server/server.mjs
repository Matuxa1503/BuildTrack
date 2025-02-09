import express from 'express';
import cors from 'cors';
import verifyOrCreateUser from './routes/userVerification.mjs';
import getLastBuilding from './routes/lastBuilding.mjs';
import getItemUser from './routes/itemUser.mjs';
import deleteUser from './routes/deleteUser.mjs';
import processNewBuildings from './routes/processingData.mjs';
import runCronJob from './routes/cronJob.mjs';
import handleWebhookTg from './routes/webhookTg.mjs';
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

app.use('/', routers); // all routes

// app.get('/proc', processNewBuildings);/
// app.get('/itemUser', getItemUser);/
// app.get('/last', getLastBuilding);/
// app.get('/cron', runCronJob);/
// app.post('/webhook', handleWebhookTg);/
// app.post('/addUser', verifyOrCreateUser);/
// app.delete('/deleteUser', deleteUser);/

app.listen(5000, () => {
  console.log('Сервер работает');
  start();
});

export default app;
