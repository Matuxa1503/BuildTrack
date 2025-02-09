import express from 'express';
import { deleteUser, verifyOrCreateUser } from '../controllers/user.controller.mjs';

const router = express.Router();
// разделить логику add and verify
router.post('/add', verifyOrCreateUser);
router.delete('/delete', deleteUser);

export default router;
