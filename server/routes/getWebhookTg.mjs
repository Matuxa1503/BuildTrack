import { handleCommandTg } from '../tg-bot/tgBot.mjs';

const getWebhookTg = async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.message && req.body.message.text && req.body.message.chat && req.body.message.from) {
      const body = req.body.message;
      await handleCommandTg(body.text, body.chat.id, body.from.id);
    }

    if (req.body.callback_query) {
      const body = req.body.callback_query;
      await handleCommandTg(body.data, body.message.chat.id, body.from.id);
    }

    res.status(200).send('ok');
  } catch (err) {
    console.error('Error in getWebhookTg:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default getWebhookTg;
