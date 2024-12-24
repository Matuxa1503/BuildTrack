import { handleCronJob } from '../tg-bot/tgBot.mjs';

const cron = async () => {
  try {
    await handleCronJob();
  } catch (err) {
    console.error('Error executing Cron job:', err.message);
  }
};

export default cron;
