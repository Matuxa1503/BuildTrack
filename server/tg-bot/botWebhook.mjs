import axios from 'axios';

const botWebhook = async (token) => {
  const WEBHOOK_URL = 'https://server-kappa-steel.vercel.app/webhook';

  const setWebhook = async () => {
    try {
      await axios.post(`https://api.telegram.org/bot${token}/setWebhook`, {
        url: WEBHOOK_URL,
      });
    } catch (error) {
      console.error('Error setting webhook:', error.response?.data || error.message);
    }
  };
  setWebhook();
};

export default botWebhook;
