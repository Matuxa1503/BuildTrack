import { checkNewEl } from '../../services/telegram.service';
import sendNewBuilding from './sendNewBuilding.mjs';

const checkNewElement = async (bot) => {
  try {
    // get users from DB and get new buildings
    const response = await checkNewEl();
    const elemsArr = response?.data?.message || '';
    const usersArr = response?.data?.users || '';

    if (elemsArr.length > 0 && usersArr.length > 0) {
      for (const item of elemsArr) {
        await sendNewBuilding(bot, usersArr, item);
      }
    }
  } catch (err) {
    console.error('Error in checkNewEl:', err.message);
  }
};

export default checkNewElement;
