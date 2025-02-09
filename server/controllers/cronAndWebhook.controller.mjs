import { handleCronJob, handleCommandTg } from '../tg-bot/tgBot.mjs';

export const runCronJob = async () => {
  try {
    await handleCronJob();
  } catch (err) {
    console.error('Error executing Cron job:', err.message);
  }
};

export const handleWebhookTg = async (req, res) => {
  try {
    if (req.body.message && req.body.message.text && req.body.message.chat && req.body.message.from) {
      const body = req.body.message;
      await handleCommandTg(body.text, body.chat.id, body.from.id);
    }

    if (req.body.callback_query?.data && req.body.callback_query?.message?.chat?.id && req.body.callback_query?.from?.id) {
      const body = req.body.callback_query;
      await handleCommandTg(body.data, body.message.chat.id, body.from.id);
    }

    res.status(200).send('ok');
  } catch (err) {
    console.error('Error in handleWebhookTg:', err.message);
    res.status(400).send('An error occurred');
  }
};
