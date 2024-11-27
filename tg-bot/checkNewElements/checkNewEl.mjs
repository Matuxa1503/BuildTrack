import sendBuildingMessage from './sendBuildingMessage.mjs';
import handle403Error from '../handle403Error.mjs';
import { checkNewElAPI } from '../../src/api/api.mjs';

const checkNewEl = async (bot, chat, userId) => {
  try {
    const chatId = chat;
    const response = await checkNewElAPI(userId);
    const elemsArr = response?.data?.message || '';

    if (elemsArr.length > 0) {
      elemsArr.forEach(async (item) => {
        await sendBuildingMessage(bot, chatId, userId, item);
      });
    } else {
      return bot.sendMessage(chatId, 'Новых застроек не появилось').catch((err) => {
        handle403Error(err, userId);
      });
    }
  } catch (err) {
    console.error('Error in checkNewEl:', err.message);
  }
};

export default checkNewEl;
