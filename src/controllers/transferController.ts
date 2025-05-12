import { Request, Response } from 'express';
import { transferService } from '../services/transferService'; 
export const transfer = async (req: Request, res: Response) => {
  const { fromId } = req.params;
  const { toAccountId, amount } = req.body;

  const transferAmount = parseFloat(amount);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah transfer tidak boleh kosong' });
  }

  try {
    
    const result = await transferService(Number(fromId), Number(toAccountId), transferAmount);
    return res.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Akun Pengirim tidak ditemukan') {
      return res.status(404).json({ error: 'Akun Pengirim tidak ditemukan' }); 
    } else if (error instanceof Error && error.message === 'Akun Penerima tidak ditemukan') {
      return res.status(404).json({ error: 'Akun Penerima tidak ditemukan' }); 
    } else if (error instanceof Error && error.message === 'Saldo pengirim tidak cukup') {
      return res.status(400).json({ error: 'Saldo pengirim tidak cukup' }); 
    }
    return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan transfer' }); 
  }
};
