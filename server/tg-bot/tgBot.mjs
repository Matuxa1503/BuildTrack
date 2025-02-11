import TelegramApi from 'node-telegram-bot-api';
import getLastElement from './lastEl.mjs';
import botWebhook from './botWebhook.mjs';
import checkNewElement from './checkNewElements/checkNewEl.mjs';
import btnOptions from './btnOptions.mjs';
import { config } from 'dotenv';
import { addUser, checkUser } from '../services/telegram.service.mjs';
config();

const token = process.env.TG_TOKEN;
const bot = new TelegramApi(token, { polling: false });

export const start = async () => {
  await botWebhook(token); // connect tg bot and vercel
};

export const handleCommandTg = async (text, chatId, userId) => {
  await bot.setMyCommands([{ command: '/last', description: 'Информация о последней застройке' }]);

  if (text === '/start') {
    try {
      const userExists = (await checkUser(userId)).data.message;
      if (!userExists) await addUser(userId, chatId);

      return bot.sendMessage(
        chatId,
        `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
        btnOptions('Последняя застройка', 'startType')
      );
    } catch (err) {
      console.error('handleCommand start:', err.message);
    }
  }

  if (text === '/last') {
    try {
      await getLastElement(bot, chatId, userId);
    } catch (err) {
      console.error('handleCommand last:', err.message);
    }
  }
};

export const handleCronJob = async () => {
  try {
    await checkNewElement(bot);
  } catch (err) {
    console.error('handleCronJob', err.message);
  }
};
