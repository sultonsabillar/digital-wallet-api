import express from 'express';
import { withdraw } from '../controllers/withdrawController';

const router = express.Router();

router.post('/:id/withdraw', withdraw);

export default router;
