import handle403Error from '../handle403Error.mjs';

const sendBuildingMessage = async (bot, chatId, userId, item) => {
  const linkItem = encodeURIComponent(item.data.link);
  const user = encodeURIComponent(userId);

  const btnOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: 'Отобразить в реакт', url: `http://localhost:3000?link=${linkItem}&user=${user}` }]],
    }),
  };

  return bot
    .sendMessage(
      chatId,
      `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
      btnOptions
    )
    .catch((err) => {
      console.log(err.message);
      handle403Error(err, userId);
    });
};

export default sendBuildingMessage;
