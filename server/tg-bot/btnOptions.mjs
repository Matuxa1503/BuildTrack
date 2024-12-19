const btnOptions = (link, userId) => {
  const linkItem = encodeURIComponent(link);
  const user = encodeURIComponent(userId);

  const btnOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: 'Отобразить информацию в React', url: `http://192.168.100.97:3000?link=${linkItem}&user=${user}` }]],
    }),
  };
  return btnOptions;
};

export default btnOptions;
