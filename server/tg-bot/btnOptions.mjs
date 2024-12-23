const btnOptions = (link) => {
  const linkItem = encodeURIComponent(link);

  const btnOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: 'Отобразить информацию', url: `https://client-liard-xi.vercel.app?link=${linkItem}` }]],
    }),
  };
  return btnOptions;
};

export default btnOptions;
