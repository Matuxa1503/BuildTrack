import express from 'express';
import userRouter from './user.router.mjs';
import buildingRouter from './building.router.mjs';
import cronAndWebhookRouter from './cronAndWebhook.router.mjs';

const router = express.Router();

router.use('/', cronAndWebhookRouter);
router.use('/user', userRouter);
router.use('/building', buildingRouter);

export default router;
