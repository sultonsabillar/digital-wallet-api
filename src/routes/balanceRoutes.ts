import express from 'express';
import { balance } from '../controllers/balanceController';

const router = express.Router();

router.get('/:id/balance', balance);

export default router;
