import express from 'express';
import { handleWebhookTg, runCronJob } from '../controllers/cronAndWebhook.controller.mjs';

const router = express.Router();

router.get('/webhook', handleWebhookTg);
router.get('/cron', runCronJob);

export default router;
