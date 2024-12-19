import { nextTg } from '../tg-bot/tgBot.mjs';

const getWebhookTg = async (req, res) => {
  try {
    const body = req.body.message;
    if (body && body.text && body.chat && body.from) {
      await nextTg(body.text, body.chat.id, body.from.id);
    }
    res.status(200).send('ok');
  } catch (err) {
    console.error('Error in getWebhookTg:', err.message);
    res.status(400).send('An error occurred');
  }
};

export default getWebhookTg;
