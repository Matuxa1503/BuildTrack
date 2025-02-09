import express from 'express';
import { handleWebhookTg, runCronJob } from '../controllers/cronAndWebhook.controller.mjs';

const router = express.Router();

router.post('/webhook', handleWebhookTg);
router.get('/cron', runCronJob);

export default router;
