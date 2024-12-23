import sendBuildingMessage from './sendBuildingMessage.mjs';
import handle403Error from '../handle403Error.mjs';
import { checkNewElAPI } from '../api/api.mjs';

const checkNewEl = async (bot) => {
  try {
    // get users and new buildings
    const response = await checkNewElAPI();
    const elemsArr = response?.data?.message || '';
    const usersArr = response?.data?.users || '';

    if (elemsArr.length > 0) {
      for (const item of elemsArr) {
        await sendBuildingMessage(bot, usersArr, item);
      }
    }
  } catch (err) {
    console.error('Error in checkNewEl:', err.message);
  }
};

export default checkNewEl;
