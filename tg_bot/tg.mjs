import axios from 'axios';
import TelegramApi from 'node-telegram-bot-api';

const token = '7244567882:AAHgGVxxk8Z2eosdLBJP44ja73UCMLhCXIY';
const bot = new TelegramApi(token, { polling: true });

const btnOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Получить информацию о последней добавленной застройке', callback_data: 'prev-buildings' }],
      [{ text: 'Получить информацию о новых застройках', callback_data: 'last-buildings' }],
    ],
  }),
};

const btnOptions2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Отобразить информацию в React приложении', url: 'https://a9f1-37-214-59-176.ngrok-free.app' }]],
  }),
};

const start = () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.setMyCommands([{ command: '/new', description: 'Информация о новых застройках' }]);
    bot.setMyCommands([{ command: '/last', description: 'Информация о последней добавленной застройке' }]);

    if (text === '/start') {
      return bot.sendMessage(
        chatId,
        'Добро пожаловать в бота. Для получения информации о новых застройках или старой добавленной нажмите кнопки ниже или введите команду /new или /last',
        btnOptions
      );
    }

    if (text === '/new') {
      getNewElem(chatId);
    }

    if (text === '/last') {
      getLastElem(chatId);
    }
  });
};

bot.on('callback_query', async (msg) => {
  if (msg.data === 'last-buildings') {
    getNewElem(msg.message.chat.id);
  }

  if (msg.data === 'prev-buildings') {
    getLastElem(msg.message.chat.id);
  }
});

const getLastElem = async (chat) => {
  const chatId = chat;
  let lastEl = '';

  try {
    const response = await axios.get('http://localhost:5000/last-element');
    lastEl = response.data.message;
  } catch (err) {
    console.log(err);
  }

  return bot.sendMessage(
    chatId,
    `Последняя добавленная застройка: \n${lastEl.title}.\n${lastEl.dateBuildText} \nДля подробной информации кликнете по кнопке ниже:`,
    btnOptions2
  );
};

const getNewElem = async (chat) => {
  const chatId = chat;
  // массив новых застроек
  let newElementsArr = '';

  try {
    const response = await axios.get('http://localhost:5000');
    newElementsArr = response.data.message;
  } catch (err) {
    console.log(err);
  }

  if (newElementsArr.length === 0) {
    return bot.sendMessage(chatId, `Новых застроек не появилось`);
  } else {
    newElementsArr.forEach((item) => {
      return bot.sendMessage(
        chatId,
        `Появилась новая застройка: \n${item.title}.\n${item.dateBuildText} \nДля подробной информации кликнете по кнопке ниже:`,
        btnOptions2
      );
    });
  }
};

start();
