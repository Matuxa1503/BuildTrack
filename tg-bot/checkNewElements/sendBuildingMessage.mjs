import handle403Error from '../handle403Error.mjs';

const sendBuildingMessage = (bot, chatId, userId, item) => {
  return bot
    .sendMessage(
      chatId,
      `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`
    )
    .catch((err) => {
      handle403Error(err, userId);
    });
};

export default sendBuildingMessage;
