import { getLastEl } from '../services/telegram.service.mjs';
import btnOptions from './btnOptions.mjs';

const getLastElement = async (bot, chat) => {
  try {
    const chatId = chat;
    const response = await getLastEl();
    const el = response?.data?.message?.items?.[0]?.data || null;

    if (el) {
      return bot.sendMessage(
        chatId,
        `Последняя застройка: \n${el.title}.\n${el.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
        btnOptions('Отобразить информацию', 'lastType', el.link)
      );
    } else {
      return bot.sendMessage(chatId, `Ошибка при выполнении команды. Попробуйте позже`);
    }
  } catch (err) {
    console.error('Error tgBot getLastElem:', err.message);
  }
};

export default getLastElement;
