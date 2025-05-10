import { Router } from 'express';
import { registerAccount } from '../controllers/accountControllers';

const router = Router();

router.post('/', registerAccount);

export default router;
