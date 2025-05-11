import express from 'express';
import { registerAccount } from '../controllers/accountController';

const router = express.Router();

router.post('/', registerAccount);

export default router;
