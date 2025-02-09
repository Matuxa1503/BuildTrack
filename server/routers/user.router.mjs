import express from 'express';
import { deleteUser, createUser, verifyUser } from '../controllers/user.controller.mjs';

const router = express.Router();
router.get('/check', verifyUser);
router.post('/add', createUser);
router.delete('/delete', deleteUser);

export default router;
