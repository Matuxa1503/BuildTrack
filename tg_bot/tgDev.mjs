import axios from 'axios';
import TelegramApi from 'node-telegram-bot-api';

const token = '7040303091:AAHK8jESpMxqrKnkyhGSrZVGGJWwL5IMSjE';
const bot = new TelegramApi(token, { polling: true });
let intervalStarted = false;

const btnOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Получить информацию о последней добавленной застройке', callback_data: 'prev-buildings' }]],
  }),
};

const btnOptions2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Отобразить информацию в React приложении', url: 'https://8bcd-37-214-69-1.ngrok-free.app' }]],
  }),
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const id = msg.from.id;
    bot.setMyCommands([{ command: '/last', description: 'Информация о последней добавленной застройке' }]);

    // if (!intervalStarted) {
    //   intervalStarted = true;
    //   setInterval(async () => {
    //     checkNewEl(chatId);
    //   }, 5000);
    // }

    if (text === '/start') {
      return bot.sendMessage(
        chatId,
        `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
        btnOptions
      );
    }

    if (text === '/last') {
      getLastElem(chatId);
    }

    if (text === '/time') {
      checkNewEl(chatId);
    }
  });
};

bot.on('callback_query', async (msg) => {
  if (msg.data === 'prev-buildings') {
    getLastElem(msg.message.chat.id);
  }
});

const checkNewEl = async (chat) => {
  const chatId = chat;
  let elmsArr = '';

  try {
    const response = await axios.get('http://localhost:5000/');
    elmsArr = response.data.message;
  } catch (err) {
    console.log(err);
  }

  if (elmsArr.length === 0) {
    bot.sendMessage(chatId, `Новых застроек не появилось`);
  } else {
    elmsArr.forEach((item) => {
      return bot.sendMessage(
        chatId,
        `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`
      );
    });
  }
};

const getLastElem = async (chat) => {
  const chatId = chat;
  let el = '';

  try {
    const response = await axios.get('http://localhost:5000/last');
    el = response.data.message.data;
  } catch (err) {
    console.log(err);
  }

  return bot.sendMessage(
    chatId,
    `Последняя добавленная застройка: \n${el.title}.\n${el.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
    btnOptions2
  );
};

start();
