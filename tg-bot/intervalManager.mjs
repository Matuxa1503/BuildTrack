import checkNewEl from './checkNewElements/checkNewEl.mjs';

let intervalStarted = false;
let interval;

const startInterval = (bot, chatId, userId) => {
  if (!intervalStarted) {
    intervalStarted = true;

    interval = setInterval(() => {
      console.log('interval was started');
      checkNewEl(bot, chatId, userId);
    }, 10000);
  }
};

const stopInterval = () => {
  clearInterval(interval);
  intervalStarted = false;
  interval = null;
  console.log('interval was stoped');
};

export { startInterval, stopInterval };
