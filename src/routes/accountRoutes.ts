import { Router } from 'express';
import { registerAccount } from '../controllers/accountController';

const router = Router();

router.post('/', registerAccount);

export default router;
