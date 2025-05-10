import express from 'express';
import { deposit } from '../controllers/depositController';  

const router = express.Router();

router.post('/:id/deposit', deposit);  

export default router; 
