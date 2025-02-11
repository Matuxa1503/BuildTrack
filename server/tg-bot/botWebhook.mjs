import axios from 'axios';
import { config } from 'dotenv';
config();

const botWebhook = async (token) => {
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  const setWebhook = async () => {
    try {
      await axios.post(`https://api.telegram.org/bot${token}/setWebhook`, {
        url: WEBHOOK_URL,
      });
      console.log('webhook was set!');
    } catch (error) {
      console.error('Error setting webhook:', error.response?.data || error.message);
    }
  };
  setWebhook();
};

export default botWebhook;
