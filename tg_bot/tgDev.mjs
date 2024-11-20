import axios from 'axios';
import TelegramApi from 'node-telegram-bot-api';

const token = '7040303091:AAHK8jESpMxqrKnkyhGSrZVGGJWwL5IMSjE';
const bot = new TelegramApi(token, { polling: true });
let intervalStarted = false;
let ourInterval;

const btnOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: 'Получить информацию о последней застройке', callback_data: 'last-buildings' }]],
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
    const userId = msg.from.id;
    bot.setMyCommands([{ command: '/last', description: 'Информация о последней добавленной застройке' }]);

    if (!intervalStarted) {
      intervalStarted = true;
      ourInterval = setInterval(() => {
        checkNewEl(chatId, userId);
      }, 10000);
    }

    if (text === '/start') {
      checkUserDb(userId);
      return bot.sendMessage(
        chatId,
        `Добро пожаловать. Для получения информации о последней застройке нажмите кнопку ниже или введите команду /last. При появлении новой застройки бот присылает её автоматически`,
        btnOptions
      );
    }

    if (text === '/last') {
      getLastEl(chatId, userId);
    }

    if (text === '/time') {
      checkNewEl(chatId, userId);
    }
  });
};

bot.on('callback_query', async (msg) => {
  if (msg.data === 'last-buildings') {
    getLastEl(msg.message.chat.id, msg.from.id);
  }
});

const checkUserDb = async (userId) => {
  try {
    await axios.post('http://localhost:5000/addUser', { userId });
  } catch (err) {
    console.error('Error tgBot checkUserDb:', err.message);
  }
};

const checkNewEl = async (chat, userId) => {
  try {
    const chatId = chat;
    let elmsArr = '';
    const response = await axios.get('http://localhost:5000/', { params: { userId } });
    elmsArr = response.data.message;

    if (elmsArr.length === 0) {
      // Здесь потом будет пустота
      console.log('da');
      return bot.sendMessage(chatId, `Новых застроек не появилось`);
    } else {
      elmsArr.forEach((item) => {
        return bot
          .sendMessage(
            chatId,
            `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`
          )
          .catch(async (err) => {
            if (err.response && err.response.statusCode === 403) {
              clearInterval(ourInterval);
              intervalStarted = false;
              ourInterval = null;
              console.log('interval was stoped');

              try {
                const response = await axios.delete('http://localhost:5000/deleteUser', { data: { userId } });
                console.log(response.data);
              } catch (err) {
                console.error('Error delete user tgBot:', err.message);
              }
            }
          });
      });
    }
  } catch (err) {
    console.error('Error tgBot checkNewEl:', err.message);
  }
};

const getLastEl = async (chat, userId) => {
  try {
    const response = await axios.get('http://localhost:5000/last', { params: { userId } });
    const chatId = chat;
    // если response.data.message пустой записать в el = null, в противном случае записать элемент
    const el = response.data.message ? response.data.message.items[0].data : null;

    if (el) {
      return bot.sendMessage(
        chatId,
        `Последняя застройка: \n${el.title}.\n${el.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
        btnOptions2
      );
    } else {
      return bot.sendMessage(chatId, `Ошибка при выполнении команды. Попробуйте позже`);
    }
  } catch (err) {
    console.error('Error tgBot getLastElem:', err.message);
  }
};

start();
