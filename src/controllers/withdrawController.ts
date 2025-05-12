import { Request, Response } from 'express';
import { withdrawService } from '../services/withdrawService'; 

export const withdraw = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount } = req.body;

  const withdrawAmount = parseFloat(amount);
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah penarikan tidak boleh kosong' });
  }

  try {
    
    const balance = await withdrawService(Number(id), withdrawAmount);
    return res.json({ balance });
  } catch (error) {
    if (error instanceof Error && error.message === 'Akun tidak ditemukan') {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    } else if (error instanceof Error && error.message === 'Saldo tidak cukup') {
      return res.status(400).json({ error: 'Saldo tidak cukup' });
    }
    return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan penarikan' });
  }
};
