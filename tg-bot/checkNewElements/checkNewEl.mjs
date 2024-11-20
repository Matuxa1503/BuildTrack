import axios from 'axios';
import sendBuildingMessage from './sendBuildingMessage.mjs';

const checkNewEl = async (bot, chat, userId) => {
  try {
    const chatId = chat;
    const response = await axios.get('http://localhost:5000/', { params: { userId } });
    const elemsArr = response.data.message;

    if (elemsArr.length === 0) {
      // Здесь потом будет пустота
      console.log('нет новых элементов');
      return bot.sendMessage(chatId, `Новых застроек не появилось`);
    }

    if (elemsArr.length > 0) {
      elemsArr.forEach((item) => {
        sendBuildingMessage(bot, chatId, userId, item);
      });
    }
  } catch (err) {
    console.error('Error tgBot checkNewEl:', err.message);
  }
};

export default checkNewEl;
