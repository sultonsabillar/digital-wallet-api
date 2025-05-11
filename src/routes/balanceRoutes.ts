// src/routes/depositRoutes.ts
import express from 'express';
import { balance } from '../controllers/balanceController';

const router = express.Router();

// Mendapatkan informasi akun berdasarkan ID
router.get('/:id/balance', balance);

export default router;
