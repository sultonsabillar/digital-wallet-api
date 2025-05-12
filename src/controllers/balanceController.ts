import { Request, Response } from 'express';
import { balanceService } from '../services/balanceService';

export const balance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const accountInfo = await balanceService(Number(id));
    res.json(accountInfo);
  } catch (error) {
    res.status(500).json({ error: `Terjadi kesalahan saat mengambil informasi akun` });
  }
};
