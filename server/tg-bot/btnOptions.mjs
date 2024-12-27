const btnOptions = (link = '', text, typeBtn) => {
  if (typeBtn === 'startType') {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: text, callback_data: 'last-buildings' }]],
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
