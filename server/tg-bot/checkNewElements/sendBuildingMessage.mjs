import btnOptions from '../btnOptions.mjs';
import handle403Error from '../handle403Error.mjs';

const sendBuildingMessage = async (bot, usersArr, item) => {
  for (const user of usersArr) {
    try {
      await bot.sendMessage(
        user.chatId,
        `Появилась новая застройка: \n${item.data.title}.\n${item.data.dateBuild} \nДля подробной информации кликнете по кнопке ниже:`,
        btnOptions('Отобразить информацию', 'newType', item.data.link)
      );
    } catch (err) {
      console.error('Error in sendBuildingMessage:', err.message);
      handle403Error(err, user.userId);
    }
  }
};

export default sendBuildingMessage;
