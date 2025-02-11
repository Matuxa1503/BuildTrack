import { config } from 'dotenv';

const btnOptions = (text, typeBtn, link = '') => {
  config();

  if (typeBtn === 'startType') {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: 'Последняя застройка', callback_data: '/last' }]],
      }),
    };
  }

  if (typeBtn === 'newType' || typeBtn === 'lastType') {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: text, url: `${process.env.CLIENT_URL}?link=${encodeURIComponent(link)}` }]],
      }),
    };
  }

  return null;
};

export default btnOptions;
