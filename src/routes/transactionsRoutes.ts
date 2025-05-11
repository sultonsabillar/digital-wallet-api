import express from 'express';
import { transaction } from '../controllers/transactionsController';

const router = express.Router();

router.get('/:id/transactions', transaction);

export default router;
