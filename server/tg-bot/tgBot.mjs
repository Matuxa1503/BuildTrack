import TelegramApi from 'node-telegram-bot-api';
import getLastElement from './getLastElement.mjs';
import { checkUserAPI } from './api/api.mjs';
import botWebhook from './botWebhook.mjs';
import checkNewEl from './checkNewElements/checkNewEl.mjs';
import btnOptions from './btnOptions.mjs';

const token = '7244567882:AAHgGVxxk8Z2eosdLBJP44ja73UCMLhCXIY'; // в env файл!!!!!!!!!!!
const bot = new TelegramApi(token, { polling: false });

export const start = async () => {
  await botWebhook(token); // connect tg bot and vercel
};

export const nextTg = async (text, chatId, userId) => {
  bot.setMyCommands([{ command: '/last', description: 'Информация о последней застройке' }]);

  if (text === '/start') {
    await checkUserAPI(userId, chatId);

    return bot.sendMessage(
      chatId,
      `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
      btnOptions('Последняя застройка', 'startType')
    );
  }

  if (text === '/last') {
    await getLastElement(bot, chatId, userId);
  }

  if (text === '/time') {
    await handleCronJob();
  }
};

export const handleCronJob = async () => {
  await checkNewEl(bot);
};
