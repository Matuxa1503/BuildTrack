const btnOptions = (text, typeBtn, link = '') => {
  if (typeBtn === 'startType') {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: 'Последняя застройка', callback_data: '/last' }]],
      }),
    };
  }

  if (typeBtn === 'newType' || typeBtn === 'lastType') {
    const linkItem = encodeURIComponent(link);
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: text, url: `https://client-liard-xi.vercel.app?link=${linkItem}` }]],
      }),
    };
  }

  return null;
};

export default btnOptions;
