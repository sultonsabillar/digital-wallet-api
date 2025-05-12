import { Request, Response } from 'express';
import { depositService } from '../services/depositService';

export const deposit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount } = req.body;

  const depositAmount = parseFloat(amount);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah deposit tidak boleh kosong' });
  }

  try {
    const balance = await depositService(Number(id), depositAmount);
    return res.json({ balance });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Akun tidak ditemukan') {
        return res.status(404).json({ error: 'Akun tidak ditemukan' });
      }
      return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan deposit' });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan yang tidak terduga' });
  }
};
