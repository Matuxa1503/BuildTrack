import axios from 'axios';
import sendBuildingMessage from './sendBuildingMessage.mjs';
import handle403Error from '../handle403Error.mjs';

const checkNewEl = async (bot, chat, userId) => {
  try {
    const chatId = chat;
    const response = await axios.get('http://localhost:5000/', { params: { userId } });
    const elemsArr = response.data.message;

    if (elemsArr.length === 0) {
      return bot.sendMessage(chatId, 'Новых застроек не появилось').catch((err) => {
        handle403Error(err, userId);
      });
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
