import express from 'express';
import { transfer } from '../controllers/transferController';

const router = express.Router();

router.post('/:fromId/transfer', transfer);

export default router;

