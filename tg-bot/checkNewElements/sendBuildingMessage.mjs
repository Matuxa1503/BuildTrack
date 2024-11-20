import deleteUser from '../deleteUser.mjs';
import { stopInterval } from '../intervalManager.mjs';

const sendBuildingMessage = (bot, chatId, userId, item) => {
  return bot
    .sendMessage(
      chatId,
      `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`
    )
    .catch(async (err) => {
      if (err.response && err.response.statusCode === 403) {
        stopInterval();
        deleteUser(userId);
      }
    });
};

export default sendBuildingMessage;
